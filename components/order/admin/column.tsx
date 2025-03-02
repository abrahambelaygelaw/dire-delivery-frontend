'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { getStatusColor } from '@/components/trackorder/factories';
import { Button } from '@/components/ui/button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { LuEye } from 'react-icons/lu';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleclick = (id: string) => {
  console.log(id);
};

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
        <div className="flex space-x-2">
          <Link href={`/admin/orders/${order}`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-[#27A376] hover:bg-[#218d65] hover:text-white text-white border-none"
              onClick={() => handleclick(order)}
            >
              <LuEye className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-[#E03137] hover:bg-[#a82428] hover:text-white  text-white border-none"
          >
            <RiDeleteBin5Line className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
