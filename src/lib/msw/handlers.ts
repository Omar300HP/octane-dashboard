import { delay, http } from "msw";
import { ordersHandlers } from "./orders";

export const handlers = [
  http.all("*", async () => {
    await delay(3000);
  }),
  ...ordersHandlers,
];
