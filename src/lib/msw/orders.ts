import { http, HttpResponse } from "msw";
import { appConfig } from "@/config";
import { Order } from "@/services/api";
import { padLeft } from "@/utils";

// Persistent store using localStorage
const getOrderStore = (): Record<string, Order> => {
  const storedData = localStorage.getItem("orderStore") || null;
  return storedData ? JSON.parse(storedData) : {};
};

// Update localStorage whenever orderStore changes
const updateStorage = (
  newOrderStore: Record<string, Order> = getOrderStore()
) => {
  localStorage.setItem("orderStore", JSON.stringify(newOrderStore));
};

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

const genOrders = (limit: number, page: number): Order[] => {
  return new Array(limit).fill(null).map((_, index) => {
    const id = padLeft(page + index + 1);

    return {
      id,
      customerName: genRandomFullName(),
      date: new Date().toISOString(),
      status: "Pending",
      totalAmount: 100 * Math.random() * (index + page + 1),
    };
  });
};

export const ordersHandlers = [
  http.get(
    resolvePath(appConfig.restApiPaths.orders.list`${":limit"}${":page"}`),
    async ({ request }) => {
      try {
        const url = new URL(request.url);
        const limit = parseInt(url.searchParams.get("limit") as string);
        const page = parseInt(url.searchParams.get("page") as string);

        const orderStore = getOrderStore();
        const storedOrders = Object.values(orderStore);

        let orders: Order[] = [];

        if (storedOrders.length > 0) {
          orders = storedOrders;
        } else {
          orders = genOrders(limit, page);

          updateStorage(
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
        const orderStore = getOrderStore();
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
        const orderStore = getOrderStore();

        if (orderStore[id]) {
          orderStore[id] = { id, ...order };
          updateStorage(orderStore);
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
        const orderStore = getOrderStore();
        if (id && orderStore[id]) {
          delete orderStore[id];
          updateStorage(orderStore);
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
