'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/types/orderType';
import { FetchOrders } from '@/actions/order';
import { columns } from '@/components/order/admin/column';
import { DataTable } from '@/components/order/admin/orderTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await FetchOrders();
        console.log(response);
        setOrders(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  console.log(`orders:`, orders);

  return (
    <section className="w-full px-8 py-4">
      {/* Welcome Section */}
      <div className="h-fit border-b border-gray-100 justify-start items-center gap-9 inline-flex">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060a87] text-3xl font-extrabold font-['Manrope'] leading-[40px]">
            Welcome Back, Owner!
          </div>
          <div className="self-stretch text-[#495d85] text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your Orders Report
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </div>
      {/* Datatable */}
      <DataTable columns={columns} data={orders} totalEntries={orders.length} />
    </section>
  );
}
