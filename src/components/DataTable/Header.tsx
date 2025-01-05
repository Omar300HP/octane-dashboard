import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { flexRender } from "@tanstack/react-table";
import type { HeaderGroup } from "@tanstack/react-table";

type HeaderProps<TData> = {
  headerGroups: HeaderGroup<TData>[];
};

const Header = <TData,>({ headerGroups }: HeaderProps<TData>) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
export { Header };
