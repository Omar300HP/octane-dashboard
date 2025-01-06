/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Header } from "./Header";
import { HeaderGroup } from "@tanstack/react-table";

describe("Header", () => {
  it("renders headers correctly", () => {
    const mockHeaderGroups = [
      {
        id: "group1",
        headers: [
          {
            id: "header1",
            isPlaceholder: false,
            column: {
              columnDef: {
                header: "Test Header",
              },
            },
            getContext: () => ({}),
          },
        ],
      },
    ] as HeaderGroup<any>[];

    const { container } = render(<Header headerGroups={mockHeaderGroups} />);

    expect(container.querySelector("thead")).toBeTruthy();
    expect(container.querySelector("tr")).toBeTruthy();
    expect(container.querySelector("th")).toBeTruthy();
    expect(container.textContent).toContain("Test Header");
  });

  it("handles placeholder headers", () => {
    const mockHeaderGroups = [
      {
        id: "group1",
        headers: [
          {
            id: "header1",
            isPlaceholder: true,
            column: {
              columnDef: {
                header: "Test Header",
              },
            },
            getContext: () => ({}),
          },
        ],
      },
    ] as HeaderGroup<any>[];

    const { container } = render(<Header headerGroups={mockHeaderGroups} />);

    expect(container.querySelector("th")).toBeTruthy();
    expect(container.textContent).not.toContain("Test Header");
  });
});
