'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/types/orderType';
import { FetchOrders } from '@/actions/order';
import { columns } from '@/components/order/admin/column';
import { DataTable } from '@/components/order/admin/orderTable';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import { city } from '@/types/cities';
import { fetchCity } from '@/actions/cities';
export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cities, setCities] = useState<city[]>([]);

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

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetchCity();
        console.log('cities:', response);
        setCities(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, []);

  console.log('city:', cities);

  console.log(`orders:`, orders);

  return (
    <section className="w-full px-8 py-4 bg-[#F1F2F8]">
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, Owner!
          </div>
          <div className="self-stretch text-[#495d85] text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your Orders Report
          </div>
        </div>
      </div>
      <section className=" w-full border px-6 py-2 mt-3 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        <div className="w-full flex justify-between items-center mt-4 ">
          <h1 className="text-2xl font-bold">Orders</h1>
          <AddOrderDialogue cities={cities} />
        </div>
        {/* Datatable */}
        <DataTable
          columns={columns}
          data={orders}
          totalEntries={orders.length}
        />
      </section>
    </section>
  );
}
