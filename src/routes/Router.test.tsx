import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "./Router";

vi.mock("./orders", () => ({
  Orders: () => <div>Orders Page</div>,
}));

vi.mock("./users", () => ({
  Users: () => <div>Users Page</div>,
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
});
