import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

// type props = {
//   cities: city[];
// };

export default function ConfirmModal(type: 'button' | 'submit' | 'reset') {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type={type} className="text-white bg-[#27A376]">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className=" top-[48%] sm:max-w-md bg-white flex flex-col gap-4 min-w-[540px] pb-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#060A87] font-semibold border-b border-[#060A87] pb-2">
            Order Added Succesfully
          </DialogTitle>
        </DialogHeader>
        {/* Item Info */}
        <section className="w-fill h-fit justify-start items-center inline-flex">
          <div className="grow shrink basis-0 px-3 py-6 rounded-sm border border-slate-200 flex-col justify-start items-start gap-3 inline-flex">
            <div className="self-stretch px-3 py-2 justify-start items-center gap-2.5 inline-flex">
              <div className="text-black text-xl font-bold font-['Inter'] leading-tight">
                Order Summary
              </div>
            </div>
            <div className="self-stretch h-[108px] px-6 flex-col justify-start items-start flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-4 inline-flex">
                <div
                  className="text-black text-lg
                                 font-bold font-['Inter'] leading-tight"
                >
                  Item Details
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Description:
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    Electronics{' '}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Weight
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {' '}
                    65kg
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Quantity
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    2
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[108px] px-6 flex-col justify-start items-start flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-4 inline-flex">
                <div className="text-black text-base font-bold font-['Inter'] leading-tight">
                  Sender Detail
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Full Name
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    Jhon Doe{' '}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Phone Number
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    +25197324647722
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Address
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    Addis Ababa
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[110px] px-6 flex-col justify-start items-start gap-0.5 flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-2.5 inline-flex">
                <div className="text-black text-base font-bold font-['Inter'] leading-tight">
                  Receiver Detail
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Full Name
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    Yakob{' '}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Phone Number
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    25197324647722
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Address
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    Bahirdar
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[108px] px-6 flex-col justify-start items-start flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-2.5 inline-flex">
                <div className="text-black text-base font-bold font-['Inter'] leading-tight">
                  Price Details
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Transaction Id:{' '}
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    TXD332002{' '}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Total Price
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {' '}
                    336.5 birr
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Payment Method
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    On cash
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DialogFooter className="flex justify-end sm:justify-end w-full">
          <Button
            type="submit"
            className="text-white  w-full text-base bg-[#060A87] py-6"
          >
            Print Reciept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
