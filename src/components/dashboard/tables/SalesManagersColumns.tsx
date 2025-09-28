"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { useTranslations } from "next-intl";

export type SalesManagerData = {
  manager: string;
  achieved: string;
  target: string;
  percentage: string;
};

const columnHelper = createColumnHelper<SalesManagerData>();

export const useSalesManagersColumns = (): ColumnDef<SalesManagerData>[] => {
  const t = useTranslations();

  return [
    columnHelper.accessor("manager", {
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("tables.manager")} />,
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: t("tables.manager"),
      },
    }),
    columnHelper.accessor("achieved", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.achieved")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.achieved"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">{getValue()}</span>;
      },
    }),
    columnHelper.accessor("target", {
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("tables.target")} />,
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.target"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">{getValue()}</span>;
      },
    }),
    columnHelper.accessor("percentage", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.percentage")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-center",
        displayName: t("tables.percentage"),
      },
      cell: ({ getValue }) => {
        const value = getValue();
        const isPositive = value.includes("+") || !value.includes("-");
        return (
          <span className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {value}
          </span>
        );
      },
    }),
  ] as ColumnDef<SalesManagerData>[];
};
