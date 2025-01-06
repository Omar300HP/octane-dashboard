import { render, screen, fireEvent } from "@testing-library/react";
import { UsersTable } from "./UsersTable";
import { useGetUserListQuery } from "@/services/api";
import { useNavigate } from "react-router-dom";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  test,
  vi,
} from "vitest";

// Mock the dependencies
vi.mock("@/services/api", () => ({
  useGetUserListQuery: vi.fn(),
  useUpdateUserMutation: vi
    .fn()
    .mockReturnValue([vi.fn(), { isLoading: false }]),
  useDeleteUserMutation: vi
    .fn()
    .mockReturnValue([vi.fn(), { isLoading: false }]),
}));
vi.mock("react-router-dom");

describe("UsersTable", () => {
  const mockNavigate = vi.fn();
  const mockUserData = {
    users: [
      { id: 1, username: "Test User 1" },
      { id: 2, username: "Test User 2" },
    ],
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders data table with users", () => {
    (useGetUserListQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockUserData,
    });

    render(<UsersTable />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  test("handles row click and navigation", () => {
    (useGetUserListQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockUserData,
    });

    render(<UsersTable />);
    const firstRow = screen.getByText("Test User 1");
    fireEvent.click(firstRow!);
    expect(mockNavigate).toHaveBeenCalled();
  });

  test("renders empty table when no data", () => {
    (useGetUserListQuery as Mock).mockReturnValue({
      isLoading: false,
      data: { users: [] },
    });

    render(<UsersTable />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
