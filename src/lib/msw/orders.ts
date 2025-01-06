import { http, HttpResponse } from "msw";
import { appConfig } from "@/config";
import { Order } from "@/services/api";
import { genOrders, getStore, resolvePath, updateStorage } from "./utils";

const STORE_NAME = "orderStore";

export const ordersHandlers = [
  http.get(
    resolvePath(appConfig.restApiPaths.orders.list`${":limit"}${":page"}`),
    async ({ request }) => {
      try {
        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get("limit") as string);
        const page = parseInt(url.searchParams.get("page") as string);

        const orderStore = getStore<Order>(STORE_NAME);
        const storedOrders = Object.values(orderStore);

        let orders: Order[] = [];

        if (storedOrders.length > 0) {
          orders = storedOrders;
        } else {
          orders = genOrders(limit, page);

          updateStorage(
            STORE_NAME,
            orders.reduce<Record<string, Order>>((acc, order) => {
              acc[order.id] = order;
              return acc;
            }, {})
          );
        }

        return HttpResponse.json({
          orders,
          total: Object.keys(orderStore).length,
        });
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),

  http.get(
    resolvePath(appConfig.restApiPaths.orders.getById`${":id"}`),
    async ({ params }) => {
      try {
        const id = params.id as string;
        const orderStore = getStore(STORE_NAME);
        const order = orderStore[id];
        if (!order) {
          return new HttpResponse(
            JSON.stringify({ error: "Order not found" }),
            {
              status: 404,
            }
          );
        }
        return HttpResponse.json(order);
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),

  http.put(
    resolvePath(appConfig.restApiPaths.orders.update`${":id"}`),
    async ({ request }) => {
      try {
        const body = await request.json();
        const { id, ...order } = body as Order;
        const orderStore = getStore<Order>(STORE_NAME);

        if (orderStore[id]) {
          orderStore[id] = { id, ...order };
          updateStorage(STORE_NAME, orderStore);
        } else {
          return new HttpResponse(
            JSON.stringify({ error: "Order not found" }),
            {
              status: 404,
            }
          );
        }

        return HttpResponse.json(orderStore[id]);
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),

  http.delete(
    resolvePath(appConfig.restApiPaths.orders.update`${":id"}`),
    async ({ params }) => {
      try {
        const id = params.id as string;
        const orderStore = getStore(STORE_NAME);
        if (id && orderStore[id]) {
          delete orderStore[id];
          updateStorage(STORE_NAME, orderStore);
          return HttpResponse.json({ id });
        }
        return new HttpResponse(JSON.stringify({ error: "Order not found" }), {
          status: 404,
        });
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),
];
