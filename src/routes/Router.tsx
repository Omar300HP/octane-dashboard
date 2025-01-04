import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Orders } from "./orders";
import { Users } from "./users";
import { Redirect } from "@/components/Redirect";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect to="/orders" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
