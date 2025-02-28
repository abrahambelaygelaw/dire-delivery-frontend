'use client';

import Image from 'next/image';
import Confused from '@/public/images/confused.jpg';
import plane from '@/public/Icons/plane.svg';
import { LuMapPin } from 'react-icons/lu';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPlaneDeparture,
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { TrackOrder } from '@/actions/order';
import { Order } from '@/types/orderType';
import { Circle } from 'lucide-react';
import { PiBoxArrowDownBold } from 'react-icons/pi';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { formatDate } from '@/lib/utils';
import { orderStatus } from '@/types/orderStatus';
import Loading from '@/components/loading';
export default function Page() {
  const [orderId, setOrderId] = useState('');
  const [transactionid, setTransactionid] = useState<string>('');
  const [anOrder, setanOrder] = useState<Order | null>(null);
  const [found, setFound] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<orderStatus[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  function getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-600';
      case 'delivered':
        return 'bg-yellow-100 text-yellow-600';
      case 'picked up':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'pending':
        return <FaPlaneDeparture className="h-10 w-10" />;
      case 'delivered':
        return <PiBoxArrowDownBold className="h-10 w-10" />;
      case 'picked up':
        return <TbCircleCheckFilled className="h-16 w-16" />;
      default:
        return <Circle className="h-10 w-10" />;
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!orderId.trim()) {
      console.log('Order ID cannot be empty');
      return;
    }
    setTransactionid('');
    setTransactionid(orderId); // Update state
    console.log('Submitted Order ID:', orderId); // Log immediately
    setOrderId(''); // Clear the input field
  };

  useEffect(() => {
    if (transactionid) {
      console.log('transactionid:', transactionid);
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 3000);
      const fetchtrackData = async () => {
        const response = await TrackOrder({ id: transactionid });
        if (response.length > 0) {
          console.log('response:', response[0]);
          setanOrder(response[0]);
          setStatuses(Object.values(response[0].statuses));
          setFound(true);
        } else {
          console.log('No data found for the given Order ID');
          setFound(false);
        }
      };
      fetchtrackData();
    }
  }, [transactionid]);
  return (
    <>
      {/* Navbar */}
      <nav className="w-full h-[100px] px-2 md:px-12 py-5 bg-[#060a87] backdrop-blur-sm flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <Image src={plane} alt="Dire Express" width={40} height={40} />
          <div className="text-white text-3xl font-extrabold font-['Manrope']">
            Dire <span className="text-[#e30613]">Express</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className=" hidden md:hidden lg:flex items-center gap-2">
            <LuMapPin className="text-white w-6 h-6" />
            <span className="text-white text-lg">
              Megenaga, Addis Ababa, Ethiopia
            </span>
          </div>
          <div className="hidden md:flex gap-4">
            <FaFacebookF className="text-white w-6 h-6" />
            <FaLinkedinIn className="text-white w-6 h-6" />
            <FaInstagram className="text-white w-6 h-6" />
          </div>
          <button className="px-4 py-2 bg-[#e30613] rounded-lg text-white font-bold">
            Track Order
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full h-[320px] md:h-[720px] px-6  lg:px-[120px] py-[183px] bg-[linear-gradient(to_right,_rgba(0,0,0,0.7),rgba(0,0,0,0)),url('/images/track-order-banner.jpg')] flex-col justify-center items-start gap-4 inline-flex overflow-hidden bg-cover bg-center bg-no-repeat md:bg-cover">
        <div className="w-64 md:w-[646px] text-white text-2xl md:text-[64px] font-extrabold font-['Manrope'] md:leading-tight">
          Fast. Reliable. Delivered with Care.
        </div>
        <div className="md:w-[590px]">
          <span className="text-white text-wrap text-lg md:text-[28px] font-light font-['Manrope']">
            Trust Dire Delivery to bring your packages home—on time, every time
          </span>
        </div>
      </section>
      <section className=" bg-[#060a87] text-white py-4 md:py-8 flex justify-center items-center ">
        <h2 className="text-xl md:text-3xl font-bold">Track Your Package</h2>
      </section>
      {/* middle section */}
      <section className="py-8 px-4 md:px-10 lg:px-16 flex flex-col gap-8 md:gap-16">
        {/* Tracking Section */}
        <section className="w-full h-auto bg-white px-1 md:px-3 lg:px-6 ">
          <form
            onSubmit={handleSubmit}
            className="flex items-end md:max-[680px]"
          >
            <div className="mt-6 flex flex-col md:flex-col gap-4  items-start w-full max-w-lg">
              <label className="text-lg md:text-xl lg:text-2xl font-bold">
                Tracking Number
              </label>
              <input
                type="text"
                placeholder="(Eg. TRX-0001)"
                className="w-[95%] md:w-[95%] h-12 md:h-16 md:text-lg lg:text-xl px-4 py-2 rounded-lg border border-gray-300 text-black"
                onChange={(e) => setOrderId(e.target.value)}
                value={orderId}
                required
              />
            </div>
            <button
              type="submit"
              className="text-sm md:w-auto md:h-16 md:text-lg lg:text-xl px-2 py-3 md:px-6 md:py-3 bg-[#e30613] hover:bg-[#c20410] rounded-lg text-white font-bold text-nowrap"
            >
              Track Order
            </button>
          </form>
        </section>
        {transactionid ? (
          loading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : found && anOrder ? (
            <section className="flex flex-col justify-start items-start gap-4 md:gap-8 border-t-2 border-[#060a87] py-6 md:py-12 px-2 lg:px-3  w-full ">
              <h1 className="text-[#090909] text-2xl md:text-3xl  font-bold  leading-[33.60px]">
                Tracking Details
              </h1>
              <div className="flex flex-col lg:flex-row justify-between w-full items-center md:items-start lg:px-0 py-2 gap-12  ">
                <div className="mt-8 relative w-full lg:max-w-fit ">
                  {/* Connector Line (Adjusts Direction Based on Screen Size) */}
                  <div
                    className="h-full absolute bg-gray-200
                    w-0.5 top-0  bottom-0 left-20
                    md:w-[64.3%] md:h-0.5 md:left-16 md:top-10 md:mx-10 lg:top-0 lg:w-0.5 lg:h-[90%] lg:mt-6 lg:left-10"
                  ></div>

                  <div className="relative flex flex-col justify-center w-fit items-center px-10 gap-10 lg:flex-col md:flex-row md:gap-16 md:items-center md:justify-center  ">
                    {statuses?.map((status, index) => (
                      <div
                        key={index}
                        className="relative w-full flex md:flex-col md:items-center md:w-fit md:justify-center md:gap-4 lg:flex-row  "
                      >
                        {/* Status Icon */}
                        <div
                          className={`w-20 h-20 rounded-full flex items-center  justify-center z-10  ${getStatusColor(status.type)}`}
                        >
                          {getStatusIcon(status.type)}
                        </div>

                        {/* Status Information */}
                        <div className="flex flex-col w-fit text-center md:text-center md:flex-1 md:justify-center ">
                          <h3 className="font-bold text-xl w-fit ">{`Status: ${status.type}`}</h3>
                          <p className="text-sm text-[#4B5563]">
                            {status.date}
                          </p>
                          <div className="text-base text-[#4B5563] font-semibold">
                            {status.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" w-full md:w-[680px] lg:w-full flex flex-col gap-8  ">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className=" w-full lg:max-w-[400px] px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                      <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                        <FiPackage className="w-8 h-8" />
                        <h1 className="text-xl font-bold">Package Detail</h1>
                      </div>
                      <div className="py-2 flex flex-col gap-2">
                        <div className="flex w-full justify-between ">
                          <h3 className="font-bold">Transaction Detail</h3>
                          <p className="text-[#71717A]">
                            {anOrder.transactionId}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Order date</h3>
                          <p className="text-[#71717A]">
                            {formatDate(anOrder.createdAt)}
                          </p>
                        </div>
                        <div
                          className="
                    flex
                    w-full
                    justify-between
                "
                        >
                          <h3 className="font-bold">Description</h3>
                          <p className="text-[#71717A]">
                            {anOrder.description}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Weight</h3>
                          <p className="text-[#71717A]">{anOrder.weight}kg</p>
                        </div>
                        <div
                          className="
                    flex
                    w-full
                    justify-between
                "
                        >
                          <h3 className="font-bold">Quantity</h3>
                          <p className="text-[#71717A]">{anOrder.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full lg:max-w-[400px] px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                      <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                        <FiPackage className="w-8 h-8" />
                        <h1 className="text-xl font-bold">Payment Details</h1>
                      </div>
                      <div className="py-2 flex flex-col gap-2">
                        <div className="flex w-full justify-between ">
                          <h3 className="font-bold">Total Price</h3>
                          <p className="text-[#71717A]">{anOrder.Price}birr</p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Payment Method</h3>
                          <p className="text-[#71717A]">
                            {anOrder.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className=" w-full lg:max-w-[400px] px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                      <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                        <FiPackage className="w-8 h-8" />
                        <h1 className="text-xl font-bold">Sender Detail</h1>
                      </div>
                      <div className="py-2 flex flex-col gap-2">
                        <div className="flex w-full justify-between ">
                          <h3 className="font-bold">Full Name</h3>
                          <p className="text-[#71717A]">{anOrder.senderName}</p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Email</h3>
                          <p className="text-[#71717A]">
                            {anOrder.senderEmail}
                          </p>
                        </div>
                        <div
                          className="
                    flex
                    w-full
                    justify-between
                "
                        >
                          <h3 className="font-bold">Phone Number</h3>
                          <p className="text-[#71717A]">
                            {anOrder.senderPhoneNumber}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Address</h3>
                          <p className="text-[#71717A]">
                            {anOrder.senderAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full lg:max-w-[400px]  px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                      <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                        <FiPackage className="w-8 h-8" />
                        <h1 className="text-xl font-bold">Receiver Detail</h1>
                      </div>
                      <div className="py-2 flex flex-col gap-2">
                        <div className="flex w-full justify-between ">
                          <h3 className="font-bold">Full Name</h3>
                          <p className="text-[#71717A]">
                            {anOrder.reciverName}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Email</h3>
                          <p className="text-[#71717A]">
                            {anOrder.reciverEmail}
                          </p>
                        </div>
                        <div
                          className="
                    flex
                    w-full
                    justify-between
                "
                        >
                          <h3 className="font-bold">Phone Number</h3>
                          <p className="text-[#71717A]">
                            {anOrder.reciverPhoneNumber}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <h3 className="font-bold">Address</h3>
                          <p className="text-[#71717A]">
                            {anOrder.reciverAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ;
            </section>
          ) : (
            <section className='className="flex flex-col justify-center items-center gap-2 md:gap-8 border-t-2 border-[#060a87] py-6 md:py-12 px-2 lg:px-3  w-full '>
              <h1 className="w-full text-center font-bold text-xl md:text-2xl lg:text-3xl">
                Order was Not Found!
              </h1>
              <div className="w-full flex justify-center mt-4">
                <Image
                  src={Confused}
                  alt="Order not Found"
                  className="w-[280px] md:w-[360px] lg:w-[400px]"
                />
              </div>
            </section>
          )
        ) : null}

        {/* Order info page */}
      </section>

      {/* Footer */}
      <footer className="w-full h-full px-6 md:px-16 py-8 bg-[#060a87] text-white flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <Image src={plane} alt="Dire Express" width={40} height={40} />
            <div className="text-2xl font-extrabold">
              Dire <span className="text-[#e30613]">Express</span>
            </div>
          </div>
          <p className="max-w-xs mt-2">
            Your trusted partner for fast and reliable delivery services.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="mt-2">Abdihadiiiman@gmail.com</p>
          <p>Tel: +251916272791</p>
          <p>Megenagna, Addis Ababa, Ethiopia</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <FaFacebookF className="w-8 h-8" />
          <FaLinkedinIn className="w-8 h-8" />
          <FaInstagram className="w-8 h-8" />
        </div>
      </footer>
      <div className="w-full py-4 bg-[#060a87] text-center text-white text-sm">
        © 2025 Dire Delivery. All rights reserved | Terms | Privacy
      </div>
    </>
  );
}
