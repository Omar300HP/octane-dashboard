import { http, HttpResponse } from "msw";
import { appConfig } from "@/config";
import { User } from "@/services/api";
import { genUsers, getStore, resolvePath, updateStorage } from "./utils";

const STORE_NAME = "userStore";

export const usersHandlers = [
  http.get(
    resolvePath(appConfig.restApiPaths.users.list`${":limit"}${":page"}`),
    async ({ request }) => {
      try {
        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get("limit") as string);
        const page = parseInt(url.searchParams.get("page") as string);

        const userStore = getStore<User>(STORE_NAME);
        const storedUsers = Object.values(userStore);

        let users: User[] = [];

        if (storedUsers.length > 0) {
          users = storedUsers;
        } else {
          users = genUsers(limit, page);

          updateStorage(
            STORE_NAME,
            users.reduce<Record<string, User>>((acc, user) => {
              acc[user.id] = user;
              return acc;
            }, {})
          );
        }

        return HttpResponse.json({
          users,
          total: Object.keys(userStore).length,
        });
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),

  http.get(
    resolvePath(appConfig.restApiPaths.users.getById`${":id"}`),
    async ({ params }) => {
      try {
        const id = params.id as string;
        const userStore = getStore(STORE_NAME);
        const user = userStore[id];
        if (!user) {
          return new HttpResponse(JSON.stringify({ error: "User not found" }), {
            status: 404,
          });
        }
        return HttpResponse.json(user);
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),

  http.put(
    resolvePath(appConfig.restApiPaths.users.update`${":id"}`),
    async ({ request }) => {
      try {
        const body = await request.json();
        const { id, ...user } = body as User;
        const userStore = getStore<User>(STORE_NAME);

        if (userStore[id]) {
          userStore[id] = { id, ...user };
          updateStorage(STORE_NAME, userStore);
        } else {
          return new HttpResponse(JSON.stringify({ error: "User not found" }), {
            status: 404,
          });
        }

        return HttpResponse.json(userStore[id]);
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),

  http.delete(
    resolvePath(appConfig.restApiPaths.users.update`${":id"}`),
    async ({ params }) => {
      try {
        const id = params.id as string;
        const userStore = getStore(STORE_NAME);
        if (id && userStore[id]) {
          delete userStore[id];
          updateStorage(STORE_NAME, userStore);
          return HttpResponse.json({ id });
        }
        return new HttpResponse(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),
];
