'use client';

import {
  Eye,
  Trash,
  Users,
  Shield,
  Truck,
  Clock,
  Package,
  DollarSign,
  Building,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { JSX, useEffect, useState } from 'react';
import { Order } from '@/types/orderType';
import { FetchOrders } from '@/actions/order';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pending, setPending] = useState<Order[]>([]);

  const today = formatDate(new Date().toDateString());
  console.log('today:', today);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await FetchOrders();
        response.map((response: Order) => {
          console.log(response);
          if (response.createdAt === today) {
            console.log('yes');

            setOrders([...orders, response]);
          }
          if (response.status === 'Pending') {
            setPending([...pending, response]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  console.log('fetchorders:', orders);
  console.log('fetchPending:', pending);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back, Admin!
          </h1>
          <p className="text-slate-600">
            Here&apos;s What&apos;s happening with your deliveries today
          </p>
        </div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value={0}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-blue-400"
          />
          <StatCard
            title="Total Admins"
            value={0}
            icon={<Shield className="h-6 w-6 text-white" />}
            color="bg-purple-400"
          />
          <StatCard
            title="Delivered Items"
            value={0}
            icon={<Truck className="h-6 w-6 text-white" />}
            color="bg-red-400"
          />
          <StatCard
            title="Pending Items"
            value={pending.length}
            icon={<Clock className="h-6 w-6 text-white" />}
            color="bg-yellow-400"
          />
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={orders.length}
            icon={<Package className="h-6 w-6 text-white" />}
            color="bg-emerald-400"
          />
          <StatCard
            title="Total Revenue"
            value={0}
            icon={<DollarSign className="h-6 w-6 text-white" />}
            color="bg-indigo-400"
          />
          <StatCard
            title="Cities Delivered"
            value={0}
            icon={<Building className="h-6 w-6 text-white" />}
            color="bg-blue-400"
          />
          <StatCard
            title="Total Employees"
            value={0}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-purple-400"
          />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Input placeholder="Search for Order" className="pr-10" />
                <Button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Button>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">
                    Transaction id
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Sender Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Sender Name
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Weight (Kg)
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">From</TableHead>
                  <TableHead className="whitespace-nowrap">To</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">
                      {order.transactionId}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.senderName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.senderName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.weight}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.createdAt}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.senderAddress}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.reciverAddress}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/orders/${order.transactionId}`}
                          passHref
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-md"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 min-w-8 bg-gray-100"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8">
                3
              </Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm" className="h-8 min-w-8">
                10
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
            <div className="text-sm text-gray-500">Showing 8 of 50 entries</div>
          </div>
        </div>
      </div>
    </main>
  );
}

type StatCard = {
  title: string;
  value: number;
  color: string;
  icon: JSX.Element;
};

function StatCard({ title, value, icon, color }: StatCard) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>{icon}</div>
      </div>
    </Card>
  );
}

// const orders = [
//   {
//     id: 'TRX-0000001',
//     senderName: 'Pristia Candra',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Hanna Baptista',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Miracle Geidt',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Miracle Geidt',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Miracle Geidt',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Miracle Geidt',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Miracle Geidt',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
//   {
//     id: 'TRX-0000001',
//     senderName: 'Miracle Geidt',
//     weight: '65',
//     date: '13-02-2025',
//     from: 'Addis Ababa',
//     to: 'Addis Ababa',
//     status: 'Delivered',
//   },
// ];
