const restApiPaths = {
  users: {
    list: (_: TemplateStringsArray) => "/users",
    getById: (_: TemplateStringsArray, id: string) => `/users/${id}`,
    create: (_: TemplateStringsArray) => "/users",
    update: (_: TemplateStringsArray, id: string) => `/users/${id}`,
    delete: (_: TemplateStringsArray, id: string) => `/users/${id}`,
  },

  orders: {
    list: (_: TemplateStringsArray, limit: string, page: string) =>
      `/orders${page || limit ? "?" : ""}${
        limit ? "limit=" + limit + "&" : ""
      }${page ? "page=" + page : ""}`,
    getById: (_: TemplateStringsArray, id: string) => `/orders/${id}`,
    create: (_: TemplateStringsArray) => "/orders",
    update: (_: TemplateStringsArray, id: string) => `/orders/${id}`,
    delete: (_: TemplateStringsArray, id: string) => `/orders/${id}`,
  },
} as const;

type AppConfigType = {
  baseUrl: string;
  restApiPaths: typeof restApiPaths;
  useMockData: boolean;
};

export const appConfig: AppConfigType = {
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  restApiPaths,
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === "true",
};
