const routes = {
  notFound: (_: TemplateStringsArray) => "/404",
  home: (_: TemplateStringsArray) => "/",
  orders: (_: TemplateStringsArray) => "/orders",
  users: (_: TemplateStringsArray) => "/users",
  userPage: (_: TemplateStringsArray, userId = ":userId") => `/users/${userId}`,
  orderPage: (_: TemplateStringsArray, orderId = ":orderId") =>
    `/orders/${orderId}`,
} as const;

export { routes };
