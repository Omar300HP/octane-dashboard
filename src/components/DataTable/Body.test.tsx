import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Body } from "./Body";
import { useViewportWidth } from "@/hooks";

vi.mock("@/hooks", () => ({
  useViewportWidth: vi.fn(),
}));

describe("Body", () => {
  const mockRowModels = {
    rows: [
      {
        id: "1",
        original: { id: 1, name: "Test" },
        getVisibleCells: () => [
          {
            id: "cell-1",
            column: {
              columnDef: {
                header: "Name",
                cell: () => "Test",
              },
            },
            getContext: () => ({}),
          },
        ],
        _getAllCellsByColumnId: () => ({}),
        _uniqueValuesCache: new Map(),
        _valuesCache: new Map(),
        depth: 0,
        index: 0,
        parentId: undefined,
        getValue: () => ({}),
        renderValue: () => ({}),
        subRows: [],
        getLeafRows: () => [],
        getParentRow: () => null,
        getParentRows: () => [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    ],
    flatRows: [
      {
        id: "1",
        original: { id: 1, name: "Test" },
      },
    ],
    rowsById: {
      "1": {
        id: "1",
        original: { id: 1, name: "Test" },
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const emptyRowModels = {
    rows: [],
    flatRows: [],
    rowsById: {},
  };

  const defaultProps = {
    rowModels: mockRowModels,
    rowSelected: undefined,
    columnsLength: 1,
    setSelectedRow: vi.fn(),
  };

  it("renders table rows for desktop view", () => {
    vi.mocked(useViewportWidth).mockReturnValue({ isSmall: false, width: 100 });

    render(<Body {...defaultProps} />);
    expect(screen.getByRole("row")).toBeInTheDocument();
  });

  it("renders cards for mobile view", () => {
    vi.mocked(useViewportWidth).mockReturnValue({ isSmall: true, width: 100 });

    render(<Body {...defaultProps} />);
    expect(screen.getByText("Name:")).toBeInTheDocument();
  });

  it("renders no results message when no rows", () => {
    vi.mocked(useViewportWidth).mockReturnValue({ isSmall: false, width: 100 });

    render(<Body {...defaultProps} rowModels={emptyRowModels} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("calls onRowClick and setSelectedRow when row is clicked", () => {
    const onRowClick = vi.fn();
    vi.mocked(useViewportWidth).mockReturnValue({ isSmall: false, width: 100 });

    render(<Body {...defaultProps} onRowClick={onRowClick} />);

    fireEvent.click(screen.getByRole("row"));

    expect(onRowClick).toHaveBeenCalledWith("1", { id: 1, name: "Test" });
    expect(defaultProps.setSelectedRow).toHaveBeenCalledWith("1");
  });

  it("handles row selection with custom rowKey", () => {
    vi.mocked(useViewportWidth).mockReturnValue({ isSmall: false, width: 100 });

    render(<Body {...defaultProps} rowKey="id" rowSelected="1" />);

    expect(screen.getByRole("row")).toHaveAttribute("aria-selected", "true");
  });
});
