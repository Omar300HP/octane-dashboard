import type { Row, RowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { twJoin } from "tailwind-merge";
import { Card, CardContent } from "@/components/ui/card";
import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import { SearchX } from "lucide-react";
import { useViewportWidth } from "@/hooks";
import { Fragment } from "react";

type BodyProps<TData> = {
  rowModels: RowModel<TData>;
  rowSelected: string | undefined;
  rowKey?: keyof TData;
  onRowClick?: (id: string, row: TData) => void;
  setSelectedRow: (id: string) => void;
  columnsLength: number;
};

const Body = <TData,>({
  rowModels,
  rowSelected,
  rowKey,
  onRowClick,
  setSelectedRow,
  columnsLength,
}: BodyProps<TData>) => {
  const { isSmall } = useViewportWidth();

  const Wrapper = isSmall ? Fragment : TableBody;

  const handleRowClick = (row: Row<TData>) => {
    const id = String(rowKey ? String(row.original[rowKey]) : row.id);

    if (onRowClick) {
      onRowClick(id, row.original);
    }

    setSelectedRow(id);
  };

  return (
    <Wrapper>
      {rowModels.rows?.length ? (
        rowModels.rows.map((row) => {
          const isSelected = rowKey
            ? String(rowSelected) ===
              String((row.original as Record<keyof TData, unknown>)[rowKey])
            : String(rowSelected) === String(row.id);

          return (
            <Fragment key={"f" + row.id}>
              {/* Mobile View: Card Layout */}
              {isSmall ? (
                <Card
                  className={twJoin(
                    "block md:hidden mb-4 shadow-sm border",
                    isSelected ? "bg-gray-100" : "bg-white"
                  )}
                  onClick={() => {
                    handleRowClick(row);
                  }}
                >
                  <CardContent className="py-8 flex flex-col justify-start items-start gap-y-3">
                    {row.getVisibleCells().map((cell) => {
                      let header = String(cell.column.columnDef.header);
                      header += header ? ":" : "";

                      return (
                        <div
                          key={"cell" + cell.id}
                          className="flex flex-row w-full justify-between items-center  gap-x-5"
                        >
                          <div className="font-bold text-gray-800">
                            {header}
                          </div>
                          <div
                            className="text-gray-600"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ) : null}

              {/* Desktop View: Table Row Layout */}
              <TableRow
                key={"tr" + row.id}
                className={twJoin(
                  "hidden md:table-row",
                  isSelected ? "bg-gray-100" : "bg-white"
                )}
                onClick={() => {
                  handleRowClick(row);
                }}
                aria-selected={isSelected}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={"td" + cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            </Fragment>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={columnsLength} className="h-24 text-center">
            <div className="flex items-center justify-center gap-2">
              <SearchX className="h-4 w-4" />
              No results.
            </div>
          </TableCell>
        </TableRow>
      )}
    </Wrapper>
  );
};

export { Body };
