import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const defaultProps = {
    setPageIndex: vi.fn(),
    isPreviousDisabled: false,
    isNextDisabled: false,
    previousPage: vi.fn(),
    nextPage: vi.fn(),
    pageCount: 10,
    pageIndex: 5,
  };

  test("renders pagination controls", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByLabelText("first page")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.getByText("5/10")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByLabelText("last page")).toBeInTheDocument();
  });

  test("handles first page navigation", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("first page"));
    expect(defaultProps.setPageIndex).toHaveBeenCalledWith(0);
  });

  test("handles previous page navigation", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(defaultProps.previousPage).toHaveBeenCalled();
  });

  test("handles next page navigation", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByText("Next"));
    expect(defaultProps.nextPage).toHaveBeenCalled();
  });

  test("handles last page navigation", () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("last page"));
    expect(defaultProps.setPageIndex).toHaveBeenCalledWith(9);
  });

  test("disables navigation buttons when appropriate", () => {
    render(
      <Pagination
        {...defaultProps}
        isPreviousDisabled={true}
        isNextDisabled={true}
      />
    );

    expect(screen.getByLabelText("first page")).toBeDisabled();
    expect(screen.getByText("Previous").closest("button")).toBeDisabled();
    expect(screen.getByText("Next").closest("button")).toBeDisabled();
    expect(screen.getByLabelText("last page")).toBeDisabled();
  });
});
