const restApiPaths = {
  users: {
    list: (_: TemplateStringsArray) => "/users",
    getById: (_: TemplateStringsArray, id: string) => `/users/${id}`,
    create: (_: TemplateStringsArray) => "/users",
    update: (_: TemplateStringsArray, id: string) => `/users/${id}`,
    delete: (_: TemplateStringsArray, id: string) => `/users/${id}`,
  },

  orders: {
    list: (_: TemplateStringsArray) => "/orders",
    getById: (_: TemplateStringsArray, id: string) => `/orders/${id}`,
    create: (_: TemplateStringsArray) => "/orders",
    update: (_: TemplateStringsArray, id: string) => `/orders/${id}`,
    delete: (_: TemplateStringsArray, id: string) => `/orders/${id}`,
  },
} as const;

type AppConfigType = {
  baseUrl: string;
  restApiPaths: typeof restApiPaths;
};

export const appConfig: AppConfigType = {
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  restApiPaths,
};
