"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { useTranslations } from "next-intl";

export type ExpenseData = {
  category: string;
  amount: number;
  percentage: number;
};

const columnHelper = createColumnHelper<ExpenseData>();

export const useExpenseColumns = (): ColumnDef<ExpenseData>[] => {
  const t = useTranslations();

  return [
    columnHelper.accessor("category", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.category")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: t("tables.category"),
      },
    }),
    columnHelper.accessor("amount", {
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("tables.amount")} />,
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.amount"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">${getValue().toLocaleString()}</span>;
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
        return <span className="font-medium">{getValue()}%</span>;
      },
    }),
  ] as ColumnDef<ExpenseData>[];
};
