import "@testing-library/jest-dom";

import { server } from "@/lib/msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
