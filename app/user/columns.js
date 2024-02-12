"use client"

import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
    },
    {
        accessorKey: 'name',
        title: 'Name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
        filterOptions: [
            {
                value: "bug",
                label: "Bug",
            },
            {
                value: "feature",
                label: "Feature",
            },
            {
                value: "documentation",
                label: "Documentation",
            },
        ]
    },
    {
        accessorKey: 'username',
        header: 'Use Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
]