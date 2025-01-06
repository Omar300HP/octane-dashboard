import { appConfig } from "@/config";
import { Order } from "@/services/api";
import { padLeft } from "@/utils";
import { delay, http, HttpResponse } from "msw";

// In-memory store to hold order data
const orderStore: Record<string, Order> = {};

// Helper to resolve path
const resolvePath = (path: string): string => `${appConfig.baseUrl}${path}`;

// Helper to generate random full names
const genRandomFullName = (): string => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "David"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Williams"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const handlers = [
  http.all("*", async () => {
    await delay(100);
  }),

  http.get(
    resolvePath(appConfig.restApiPaths.orders.list`${":limit"}${":page"}`),
    async ({ request }) => {
      try {
        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get("limit") as string);
        const page = parseInt(url.searchParams.get("page") as string);

        const orders: Order[] = new Array(limit).fill(null).map((_, index) => {
          const id = padLeft(page + index + 1);
          if (!orderStore[id]) {
            orderStore[id] = {
              id,
              customerName: genRandomFullName(),
              date: new Date().toISOString(),
              status: "Pending",
              totalAmount: 100 * Math.random() * (index + page + 1),
            };
          }
          return orderStore[id];
        });

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

        if (orderStore[id]) {
          orderStore[id] = { id, ...order };
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
        if (id && orderStore[id]) {
          delete orderStore[id];
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
