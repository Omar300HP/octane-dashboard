/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrdersTable } from "./OrdersTable";
import { useGetOrderListQuery } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

vi.mock("@/services/api", () => ({
  useUpdateOrderMutation: vi
    .fn()
    .mockReturnValue([vi.fn(), { isLoading: false }]),
  useGetOrderListQuery: vi.fn(),
  useDeleteOrderMutation: vi
    .fn()
    .mockReturnValue([vi.fn(), { isLoading: false }]),
}));
vi.mock("react-router-dom");

describe("OrdersTable", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("should render table with data", async () => {
    const mockData = {
      orders: [
        { id: 1, name: "Order 1" },
        { id: 2, name: "Order 2" },
      ],
    };

    vi.mocked(useGetOrderListQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
    } as any);

    render(<OrdersTable />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(mockData.orders.length + 1); // +1 for header row
  });

  it("should navigate when row is clicked", async () => {
    const mockData = {
      orders: [{ id: 1, name: "Order 1" }],
    };

    vi.mocked(useGetOrderListQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
    } as any);

    render(<OrdersTable />);

    const row = screen.getByText("1");
    await userEvent.click(row);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/orders/${mockData.orders[0].id}`
    );
  });
});
