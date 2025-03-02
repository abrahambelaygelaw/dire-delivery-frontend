'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { getStatusColor } from '@/components/trackorder/factories';
import { Button } from '@/components/ui/button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { LuEye } from 'react-icons/lu';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'transactionId',
    header: 'TransactionId',
  },
  {
    accessorKey: 'senderName',
    header: 'Sender Name',
  },
  {
    accessorKey: 'reciverName',
    header: 'Reciver Name',
  },
  {
    accessorKey: 'addedBy',
    header: 'Added By',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const formatted = formatDate(row.getValue('createdAt'));
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'senderAddress',
    header: 'From',
  },
  {
    accessorKey: 'reciverAddress',
    header: 'To',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const formatted = getStatusColor(
        (row.getValue('status') as string).toLowerCase()
      );
      return (
        <div
          className={`w-20 h-fit rounded-xl flex items-center  justify-center z-10  ${formatted}`}
        >
          {row.getValue('status')}
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const order = row.getValue('transactionId') as string;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="text-lg">⋮</span> {/* Three-dot button */}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <Link href={`/admin/orders/${order}`} passHref>
              <DropdownMenuItem className="cursor-pointer">
                <LuEye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-100">
              <RiDeleteBin5Line className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer text-blue-600 hover:bg-blue-100">
              🔑 Reset Password
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
