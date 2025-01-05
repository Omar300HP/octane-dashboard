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

export const handlers = [
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

        await delay(2000);
        return HttpResponse.json({ orders, total: orders.length });
      } catch (error) {
        return new HttpResponse(JSON.stringify(error), { status: 500 });
      }
    }
  ),
];
