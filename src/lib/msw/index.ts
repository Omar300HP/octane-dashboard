import { appConfig } from "@/config";

const setupApiMock = async () => {
  if (typeof window !== "undefined" && appConfig.useMockData) {
    const { worker } = await import("./browser");

    return worker.start({
      onUnhandledRequest: "warn",
    });
  }
};

export { setupApiMock };
