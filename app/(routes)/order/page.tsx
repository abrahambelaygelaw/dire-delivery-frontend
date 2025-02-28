'use client';

import Image from 'next/image';
import plane from '@/public/Icons/plane.svg';
import { LuMapPin } from 'react-icons/lu';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { TrackOrder } from '@/actions/order';
import { Order } from '@/types/orderType';
import SearchBar from '@/components/trackorder/serachBar';
import { orderStatus } from '@/types/orderStatus';
import Tracking from '@/components/trackorder/tracking';
import TrackHero from '@/components/trackorder/trackHero';
import TrackFooter from '@/components/trackorder/trackFooter';

export default function Page() {
  const [orderId, setOrderId] = useState('');
  const [transactionid, setTransactionid] = useState<string>('');
  const [anOrder, setanOrder] = useState<Order | null>(null);
  const [found, setFound] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<orderStatus[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!orderId.trim()) {
      return;
    }
    setTransactionid('');
    setTransactionid(orderId); // Update state
    setOrderId(''); // Clear the input field
  };

  useEffect(() => {
    if (transactionid) {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 3000);
      const fetchtrackData = async () => {
        try {
          const response = await TrackOrder({ id: transactionid });
          if (response.length > 0) {
            setanOrder(response[0]);
            setStatuses(Object.values(response[0].statuses));
            setFound(true);
          } else {
            setFound(false);
          }
        } catch (error) {
          console.error('Error fetching track data:', error);
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
      <TrackHero />
      <section className=" bg-[#060a87] text-white py-4 md:py-8 flex justify-center items-center ">
        <h2 className="text-xl md:text-3xl font-bold">Track Your Package</h2>
      </section>
      {/* middle section */}
      <section className="py-8 px-4 md:px-10 lg:px-16 flex flex-col gap-8 md:gap-16">
        {/* Tracking Section */}
        <SearchBar
          handleSubmit={handleSubmit}
          orderId={orderId}
          setOrderId={setOrderId}
        />
        <Tracking
          transactionid={transactionid}
          loading={loading}
          found={found}
          anOrder={anOrder}
          statuses={statuses}
        />
        {/* Order info page */}
      </section>
      {/* Footer */}
      <TrackFooter />
    </>
  );
}
