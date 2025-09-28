"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { useTranslations } from "next-intl";

export type CollectionData = {
  project: string;
  escrow: number;
  nonEscrow: number;
};

const columnHelper = createColumnHelper<CollectionData>();

export const useCollectionsColumns = (): ColumnDef<CollectionData>[] => {
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
    columnHelper.accessor("escrow", {
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("tables.escrow")} />,
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.escrow"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">{getValue().toLocaleString()}</span>;
      },
    }),
    columnHelper.accessor("nonEscrow", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("tables.nonEscrow")} />
      ),
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: t("tables.nonEscrow"),
      },
      cell: ({ getValue }) => {
        return <span className="font-medium">{getValue().toLocaleString()}</span>;
      },
    }),
  ] as ColumnDef<CollectionData>[];
};
