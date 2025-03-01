'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/types/orderType';
import { FetchOrders } from '@/actions/order';
import { columns } from '@/components/order/admin/column';
import { DataTable } from '@/components/order/admin/orderTable';
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
      {/* Datatable */}
      <DataTable columns={columns} data={orders} />
    </section>
  );
}
