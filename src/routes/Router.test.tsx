import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "./Router";
import { Outlet } from "react-router-dom";

vi.mock("./orders", () => ({
  Orders: () => (
    <div>
      Orders Page
      <Outlet />
    </div>
  ),
  Order: () => <div>Order Page</div>,
}));

vi.mock("./users", () => ({
  Users: () => (
    <div>
      Users Page <Outlet />
    </div>
  ),
  User: () => <div>User Page</div>,
}));

vi.mock("@/components/Redirect", () => ({
  Redirect: ({ to }: { to: string }) => <div>Redirecting to {to}</div>,
}));

describe("Router", () => {
  it("renders Orders component at /orders route", () => {
    window.history.pushState({}, "", "/orders");
    render(<Router />);
    expect(screen.getByText("Orders Page")).toBeInTheDocument();
  });

  it("renders Users component at /users route", () => {
    window.history.pushState({}, "", "/users");
    render(<Router />);
    expect(screen.getByText("Users Page")).toBeInTheDocument();
  });

  it("redirects to /orders when accessing root path", () => {
    window.history.pushState({}, "", "/");
    render(<Router />);
    expect(screen.getByText("Redirecting to /orders")).toBeInTheDocument();
  });

  it("renders User component at /users/id route", () => {
    window.history.pushState({}, "", "/users/id");
    render(<Router />);
    expect(screen.getByText("User Page")).toBeInTheDocument();
  });

  it("renders Order component at /orders/id route", () => {
    window.history.pushState({}, "", "/orders/id");
    render(<Router />);
    expect(screen.getByText("Order Page")).toBeInTheDocument();
  });
});
