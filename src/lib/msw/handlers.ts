import { delay, http } from "msw";
import { ordersHandlers } from "./orders";

export const handlers = [
  http.all("*", async () => {
    await delay(100);
  }),
  ...ordersHandlers,
];
