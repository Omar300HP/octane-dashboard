import { delay, http } from "msw";
import { ordersHandlers } from "./orders";
import { usersHandlers } from "./users";

export const handlers = [
  http.all("*", async () => {
    await delay(1000);
  }),
  ...ordersHandlers,
  ...usersHandlers,
];
