"use client"

import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "../data-table/data-table-view-options"

import { useEffect, useState } from "react"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

export function DataTableToolbar({
    table,
}) {
    const isFiltered = table.getState().columnFilters.length > 0
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        setFilters(table?.getAllColumns()?.filter(column => column?.columnDef?.filterFn !== 'auto'));
    }, [])

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter ..."
                    value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {
                    filters?.map((item, index) =>
                        <DataTableFacetedFilter
                            key={`filter_item_${index}`}
                            column={table.getColumn(item?.columnDef?.accessorKey)}
                            title={item?.columnDef?.title}
                            options={item?.columnDef?.filterOptions}
                        />)
                }
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}