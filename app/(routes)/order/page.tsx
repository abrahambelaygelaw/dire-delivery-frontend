import Image from 'next/image';
import plane from '@/public/Icons/plane.svg';
import { LuMapPin } from 'react-icons/lu';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Page() {
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

      {/* Tracking Section */}
      <section className="w-full h-auto py-8 px-3 md:px-12 lg:px-24 flex items-end md:max-[680px] ">
        <div className="mt-6 flex flex-col md:flex-col gap-4  items-start w-full max-w-lg">
          <label className="text-lg md:text-xl lg:text-2xl font-bold">
            Tracking Number
          </label>
          <input
            type="text"
            placeholder="(Eg. TRX-0001)"
            className="w-[95%] md:w-[95%] h-12 md:h-16 md:text-lg lg:text-xl px-4 py-2 rounded-lg border border-gray-300 text-black"
          />
        </div>
        <button className="text-sm md:w-auto md:h-16 md:text-lg lg:text-xl px-2 py-3 md:px-6 md:py-3 bg-[#e30613] hover:bg-[#c20410] rounded-lg text-white font-bold text-nowrap">
          Track Order
        </button>
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
