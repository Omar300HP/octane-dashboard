import { appConfig } from "@/config";
import { Order } from "@/services/api";
import { padLeft } from "@/utils";
import { delay, http, HttpResponse } from "msw";

const resolvePath = (path: string): string => `${appConfig.baseUrl}${path}`;

const genRandomFullName = (): string => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "David"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Williams"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-var
var allOrders: Order[] = [];

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

        const orders: Order[] = new Array(limit).fill(null).map((_, index) => ({
          id: padLeft(page + index + 1),
          customerName: genRandomFullName(),
          date: new Date().toISOString(),
          status: "Pending",
          totalAmount: 100 * Math.random() * (index + page + 1),
        }));
        allOrders = orders;
        return HttpResponse.json({ orders, total: orders.length });
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
        const index = allOrders.findIndex((o) => o.id === id);
        allOrders[index] = { id, ...order };
        return HttpResponse.json({ id, ...order });
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),
];
