import { URLData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2 as Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CopyCell from "@/components/table/cell/CopyCell";
import Tooltip from "@/components/tooltip";
import { getFormattedDate, getTimeAgo } from "@/lib/utils";

export const createColumns = (
  handleDeleteLink: (id: string) => void
): ColumnDef<URLData>[] => [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "short",
    header: "Short URL",
    cell: ({ row }) => (
      <CopyCell row={row} accessorKey="short" header="Short URL" />
    ),
  },
  {
    accessorKey: "fullUrl",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Long URL
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <CopyCell row={row} accessorKey="fullUrl" header="Long URL" />
    ),
  },
  {
    accessorKey: "clicks",
    header: () => <div className="text-right">Clicks</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("clicks")}</div>
      );
    },
  },
  {
    id: "delete",
    // header: () => <div className="text-right">Delete</div>,
    cell: ({ row }) => {
      return (
        <Tooltip hovertext="Delete">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 cursor-pointer"
            onClick={() => handleDeleteLink(row.original.short)}
          >
            <span className="sr-only">Delete</span>
            <Trash className="h-4 w-4" color="red" />
          </Button>
        </Tooltip>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { lastClicked, createdAt } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Details</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Details</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <Tooltip
              hovertext={
                "Last Clicked At: " + getFormattedDate(new Date(lastClicked))
              }
            >
              <DropdownMenuItem>
                Clicked {getTimeAgo(new Date(lastClicked))}
              </DropdownMenuItem>
            </Tooltip>
            <Tooltip hovertext={"Created At: " + getFormattedDate(createdAt)}>
              <DropdownMenuItem>
                Created {getTimeAgo(createdAt)}
              </DropdownMenuItem>
            </Tooltip>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
