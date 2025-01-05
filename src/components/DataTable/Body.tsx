import { RowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { twJoin } from "tailwind-merge";
import { SearchX } from "lucide-react";

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
  return (
    <TableBody>
      {rowModels.rows?.length ? (
        rowModels.rows.map((row) => {
          const isSelected = rowKey
            ? String(rowSelected) ===
              String((row.original as Record<keyof TData, unknown>)[rowKey])
            : String(rowSelected) === String(row.id);

          return (
            <TableRow
              key={row.id}
              data-state={isSelected && "selected"}
              onClick={() => {
                const id = rowKey ? String(row.original[rowKey]) : row.id;

                if (onRowClick) {
                  onRowClick(id, row.original);
                }

                setSelectedRow(String(id));
              }}
              className={twJoin(
                "cursor-pointer",
                isSelected ? "bg-gray-100" : null
              )}
              data-testid={"table-row"}
              aria-selected={isSelected}
              role="row"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
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
    </TableBody>
  );
};
export { Body };
