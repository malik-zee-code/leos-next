"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { useTranslations } from "next-intl";

export type ReservationData = {
  project: string;
  resUnits: number;
  cnclUnits: number;
  resAmount: number;
  cnclAmount: number;
};

const columnHelper = createColumnHelper<ReservationData>();

export const useReservationsColumns = (): ColumnDef<ReservationData>[] => {
  const t = useTranslations();

  return [
    columnHelper.accessor("project", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.projects")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: t("tables.projects"),
      },
    }),
    columnHelper.accessor("resUnits", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.resUnits")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-center",
        displayName: t("tables.resUnits"),
      },
    }),
    columnHelper.accessor("cnclUnits", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.cnclUnits")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-center",
        displayName: t("tables.cnclUnits"),
      },
    }),
    columnHelper.accessor("resAmount", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.resAmounts")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.resAmounts"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">{getValue().toLocaleString()}</span>;
      },
    }),
    columnHelper.accessor("cnclAmount", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.cnclAmounts")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.cnclAmounts"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">{getValue().toLocaleString()}</span>;
      },
    }),
  ] as ColumnDef<ReservationData>[];
};
