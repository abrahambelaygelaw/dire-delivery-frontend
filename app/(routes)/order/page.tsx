import Image from 'next/image';
import plane from '@/public/Icons/plane.svg';
import { LuMapPin } from 'react-icons/lu';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

// bg-gradient-to-l from-[#33344f] to-[#060a87]

export default function Page() {
  return (
    <>
      <section className="w-full h-[100vh] bg-[#060a87] flex-col justify-center items-center inline-flex overflow-hidden">
        <nav className="w-full h-[100px] px-12 py-5 bg-[#060a87] backdrop-blur-sm justify-between items-center inline-flex overflow-hidden">
          <div className="justify-start items-center flex">
            <Image className="origin-top-left " src={plane} alt={''} />
            <div>
              <span className="text-white text-[40.23px] font-extrabold font-['Manrope']">
                Dire{' '}
              </span>
              <span className="text-[#e30613] text-[40.23px] font-extrabold font-['Manrope']">
                Express
              </span>
            </div>
          </div>
          <div className="h-[70px] p-2.5 justify-between items-center flex gap-10">
            <div className="justify-center items-center gap-2 flex">
              <LuMapPin className="text-white w-8 h-8" />
              <div className="text-white text-xl font-normal font-['Manrope']">
                Megenaga, Addis Ababa, Ethiopia
              </div>
            </div>
            <div className="flex gap-5">
              <FaFacebookF className="w-8 h-8 text-white" />
              <FaLinkedinIn className="w-8 h-8 text-white" />
              <FaInstagram className="w-8 h-8 text-white" />
            </div>
            <div className="justify-center items-center gap-11 flex">
              <div className="px-6 py-3 bg-[#e30613] rounded-lg justify-center items-center gap-2.5 flex">
                <div className="text-white text-xl font-bold font-['Manrope']">
                  Track order{' '}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="w-full h-[720px] px-[120px] py-[183px] bg-[linear-gradient(to_right,_rgba(0,0,0,0.7),rgba(0,0,0,0)),url('/images/track-order-banner.jpg')] flex-col justify-center items-start gap-4 inline-flex overflow-hidden bg-cover bg-center">
          <div className="w-[646px] text-white text-[64px] font-extrabold font-['Manrope']">
            Fast. Reliable. Delivered with Care.
          </div>
          <div className="w-[590px]">
            <span className="text-white text-[28px] font-light font-['Manrope']">
              Trust Dire Delivery to bring your packages home—on time, every
              time
            </span>
          </div>
        </section>
      </section>
      <section className="h-[88px] w-full p-8 bg-[#060a87] justify-center items-center gap-2.5 inline-flex overflow-hidden">
        <div className="text-white text-[32px] font-extrabold font-['Manrope']">
          Track Your Package
        </div>
      </section>
      <section>
        <div className="h-[183.32px] px-[120px] py-12 flex-col justify-center items-start gap-2.5 inline-flex overflow-hidden">
          <div className="justify-center items-end gap-2.5 inline-flex overflow-hidden">
            <div className="flex-col justify-start items-start gap-[7.32px] inline-flex">
              <div className="text-[#090909] text-xl font-bold font-['Manrope']">
                Transaction Id
              </div>
              <input
                type="text"
                placeholder="(Eg. TRX-0001)"
                className="w-[480px] h-14 px-[29.28px] rounded-[10px] border border-[#d6ddec] text-[#8987a1] text-lg font-normal font-['Manrope']"
              />
            </div>
            <button className="px-8 py-4 bg-[#060a87] hover:bg-[#3438b6] rounded-[9.15px] justify-center items-center gap-2.5 flex overflow-hidden">
              <div className="text-center text-white text-lg font-bold font-['Manrope']">
                Track Order
              </div>
            </button>
          </div>
        </div>
      </section>
      <footer className="w-full h-fit px-16 py-4 bg-[#060a87] flex-col justify-start items-center gap-8 inline-flex">
        <div className="self-stretch px-16 py-8 justify-between items-start inline-flex">
          <div className="self-stretch justify-start items-start gap-8 flex">
            <div className="justify-start items-start flex">
              <div className="flex-col justify-center items-start gap-3 inline-flex  ">
                <div className="justify-start items-center inline-flex ">
                  <Image className="origin-top-left " src={plane} alt={''} />
                  <div>
                    <span className="text-white text-[32px] font-extrabold font-['Manrope']">
                      Dire{' '}
                    </span>
                    <span className="text-[#e30613] text-[32px] font-extrabold font-['Manrope']">
                      Express
                    </span>
                  </div>
                </div>
                <div className="w-80 self-stretch text-white text-xl font-normal font-['Manrope'] px-6">
                  Your trusted partner for fast and reliable delivery services.
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch px-8 flex-col justify-start items-start gap-6 inline-flex">
            <div className="flex-col justify-start items-start gap-[22px] flex">
              <div className="text-white text-[32px] font-bold font-['Manrope']">
                Contact Us{' '}
              </div>
            </div>
            <div className="justify-center items-start gap-[71px] inline-flex">
              <div className="justify-start items-center gap-3 flex">
                <div className="h-[97px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-white text-xl font-normal font-['Manrope']">
                    Abdihadiiiman@gmail.com
                  </div>
                  <div className="text-white text-xl font-normal font-['Manrope']">
                    Tel: +251916272791
                  </div>
                  <div className="text-white text-xl font-normal font-['Manrope']">
                    Megenagna, Addis Ababa, Ethiopia
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <FaFacebookF className="w-12 h-12 text-white" />
            <FaLinkedinIn className="w-12 h-12 text-white" />
            <FaInstagram className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="w-[1440px] h-[0px] border border-white"></div>

        <div className="w-full  self-stretch px-8 justify-center items-center inline-flex">
          <div className="text-white text-xl font-medium font-['EB Garamond']">
            © 2025 Dire Delivery. All rights reserved | Terms | Privacy{' '}
          </div>
        </div>
      </footer>
    </>
  );
}
