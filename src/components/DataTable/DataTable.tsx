"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { Header } from "./Header";
import { Body } from "./Body";
import { useViewportWidth } from "@/hooks";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowKey?: keyof TData;
  containerClassName?: string;
  onRowClick?: (id: string, row: TData) => void;
  selectedRow?: string;
}

// TODO: Add sorting and filtering
// TODO: add selection

export function DataTable<TData, TValue>({
  columns,
  data,
  containerClassName,
  onRowClick,
  rowKey,
  selectedRow,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  const [_selectedRow, setSelectedRow] = useState("");

  const { isSmall } = useViewportWidth();

  return (
    <div className={twMerge("w-full", containerClassName)}>
      <div className="rounded-md border">
        <Table>
          {isSmall ? null : <Header headerGroups={table.getHeaderGroups()} />}
          <Body
            columnsLength={columns.length}
            rowModels={table.getRowModel()}
            rowSelected={String(selectedRow || _selectedRow)}
            setSelectedRow={setSelectedRow}
            onRowClick={onRowClick}
            rowKey={rowKey}
          />
        </Table>

        <Pagination
          isNextDisabled={!table.getCanNextPage()}
          isPreviousDisabled={!table.getCanPreviousPage()}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          setPageIndex={table.setPageIndex}
        />
      </div>
    </div>
  );
}
