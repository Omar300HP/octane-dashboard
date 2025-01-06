import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { act } from "react";

interface TestData {
  id: number;
  name: string;
}

vi.mock("@/hooks", () => ({
  useViewportWidth: vi.fn(() => ({ isSmall: false, width: 100 })),
}));

describe("DataTable", () => {
  const columns: ColumnDef<TestData>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  const data: TestData[] = [
    { id: 1, name: "Test 1" },
    { id: 2, name: "Test 2" },
  ];

  it("renders table headers correctly", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders table data correctly", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });

  it("shows 'No results' message when data is empty", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("applies custom container className correctly", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        containerClassName="test-class"
      />
    );
    expect(document.querySelector(".test-class")).toBeInTheDocument();
  });

  it("renders pagination controls", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.getByText("1/1")).toBeInTheDocument();
  });

  it("disables pagination buttons when on first/only page", () => {
    render(<DataTable columns={columns} data={data} />);
    const previousButton = screen.getByText("Previous").closest("button");
    const nextButton = screen.getByText("Next").closest("button");
    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("handles page navigation correctly with multiple pages", () => {
    const manyItems = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Test ${i + 1}`,
    }));

    render(<DataTable columns={columns} data={manyItems} />);
    expect(screen.getByText("1/2")).toBeInTheDocument();

    const nextButton = screen.getByText("Next").closest("button");
    expect(nextButton).not.toBeDisabled();
  });

  it("displays correct page number after navigating", async () => {
    const manyItems = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Test ${i + 1}`,
    }));

    render(<DataTable columns={columns} data={manyItems} />);
    expect(screen.getByText("1/2")).toBeInTheDocument();

    const nextButton = screen.getByText("Next").closest("button");
    nextButton?.click();

    await waitFor(() => {
      expect(screen.getByText("2/2")).toBeInTheDocument();
    });
  });

  it("enables/disables first/last page buttons correctly", async () => {
    const manyItems = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Test ${i + 1}`,
    }));

    render(<DataTable columns={columns} data={manyItems} />);

    const firstPageButton = screen.getByRole("button", {
      name: /first page/i,
    });
    const lastPageButton = screen.getByRole("button", {
      name: /last page/i,
    });

    expect(firstPageButton).toBeDisabled();
    expect(lastPageButton).not.toBeDisabled();

    lastPageButton.click();

    await waitFor(() => {
      expect(firstPageButton).not.toBeDisabled();
    });
    expect(lastPageButton).toBeDisabled();
  });

  it("navigates through all pages correctly", async () => {
    const manyItems = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Test ${i + 1}`,
    }));

    render(<DataTable columns={columns} data={manyItems} />);

    expect(screen.getByText("1/3")).toBeInTheDocument();
    expect(screen.getByText("Test 1")).toBeInTheDocument();

    const nextButton = screen.getByText("Next").closest("button");
    nextButton?.click();
    await waitFor(() => {
      expect(screen.getByText("2/3")).toBeInTheDocument();
    });
    expect(screen.getByText("Test 11")).toBeInTheDocument();

    nextButton?.click();
    await waitFor(() => {
      expect(screen.getByText("3/3")).toBeInTheDocument();
    });
    expect(screen.getByText("Test 21")).toBeInTheDocument();
  });

  it("jumps to first/last pages correctly", async () => {
    const manyItems = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Test ${i + 1}`,
    }));

    render(<DataTable columns={columns} data={manyItems} />);

    const lastPageButton = screen.getByRole("button", {
      name: /last page/i,
    });
    lastPageButton.click();
    await waitFor(() => {
      expect(screen.getByText("3/3")).toBeInTheDocument();
    });

    expect(screen.getByText("Test 21")).toBeInTheDocument();

    const firstPageButton = screen.getByRole("button", {
      name: /first page/i,
    });
    firstPageButton.click();

    await waitFor(() => {
      expect(screen.getByText("1/3")).toBeInTheDocument();
    });
    expect(screen.getByText("Test 1")).toBeInTheDocument();
  });

  it("calls onRowClick with correct parameters when row is clicked", async () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        rowKey="id"
      />
    );

    const firstRow = screen.getByText("Test 1").closest("tr");
    firstRow?.click();

    await waitFor(() => {
      expect(onRowClick).toHaveBeenCalledWith("1", data[0]);
    });
  });

  it("applies selected row styling when row is clicked", async () => {
    render(<DataTable columns={columns} data={data} rowKey="id" />);

    const firstRow = screen.getByText("Test 1").closest("tr");
    firstRow?.click();
    await waitFor(() => {
      expect(
        screen.getByRole("row", {
          selected: true,
        })
      ).toHaveTextContent("Test 1");
    });
  });

  it("updates selected row when clicking different rows", async () => {
    render(<DataTable columns={columns} data={data} rowKey="id" />);

    const firstRow = screen.getByText("Test 1").closest("tr");
    const secondRow = screen.getByText("Test 2").closest("tr");

    firstRow?.click();
    await waitFor(() => {
      expect(
        screen.getByRole("row", {
          selected: true,
        })
      ).toHaveTextContent("Test 1");
    });
    expect(secondRow).not.toHaveClass("bg-gray-100");

    secondRow?.click();
    await waitFor(() => {
      expect(firstRow).not.toHaveAttribute("data-state", "selected");
    });
    expect(
      screen.getByRole("row", {
        selected: true,
      })
    ).toHaveTextContent("Test 2");
  });

  it("uses row.id for selection when no rowKey is provided", async () => {
    render(<DataTable columns={columns} data={data} />);

    const firstRow = screen.getByText("Test 1").closest("tr");
    firstRow?.click();
    await waitFor(() => {
      expect(firstRow).toHaveClass("bg-gray-100");
    });
  });

  it("maintains row selection when changing pages", async () => {
    const manyItems = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Test ${i + 1}`,
    }));

    render(<DataTable columns={columns} data={manyItems} rowKey="id" />);

    const firstRow = screen.getByText("Test 1");

    screen.debug(firstRow!, 1000000);

    act(() => {
      firstRow?.click();
    });

    await waitFor(() => {
      expect(
        screen.getByRole("row", {
          selected: true,
        })
      ).toHaveTextContent("Test 1");
    });

    const nextButton = screen.getByText("Next").closest("button");
    nextButton?.click();

    await waitFor(() => {
      expect(screen.getByText("2/2")).toBeInTheDocument();
    });

    const newFirstRow = screen.getByText("Test 11").closest("tr");
    expect(newFirstRow).not.toHaveClass("bg-gray-100");
  });
});
