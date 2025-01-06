import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Orders } from "./orders";
import { Users } from "./users";
import { Redirect } from "@/components/Redirect";
import { routes } from "./paths";
import { TabsLayout } from "@/components/Layout";

// TODO: Create the 404 page
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TabsLayout />}>
          <Route
            path={routes.home``}
            element={<Redirect to={routes.orders``} />}
          />
          <Route path={routes.orders``} element={<Orders />} />
          <Route path={routes.users``} element={<Users />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
