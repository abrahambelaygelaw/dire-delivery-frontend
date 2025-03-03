import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Plus } from 'lucide-react';
import { city } from '@/types/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type props = {
  cities: city[];
};

export default function AddOrderDialogue({ cities }: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white flex flex-col gap-4 min-w-[580px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#060A87] font-semibold border-b border-[#060A87] pb-2">
            Add an Order
          </DialogTitle>
        </DialogHeader>
        {/* Item Info */}
        <div className="flex flex-col items-center space-x-1 gap-6 w-full">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
              Item Information
            </h1>
            <div className="grid grid-cols-5 gap-6 w-full px-4 ">
              <div className="grid col-span-3 flex-1 gap-2 ">
                <Label htmlFor="description" className="text-[#060A87]">
                  Description
                </Label>
                <Input id="description" placeholder="eg: Electronics" />
              </div>
              <div className="flex col-span-2 justify-between gap-3">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="weight" className="text-[#060A87]">
                    Weight(kg)
                  </Label>
                  <Input id="weight" placeholder="Ex: 10" />
                </div>
                <div className="grid flex-1 gap-2 w-12">
                  <Label htmlFor="quantity" className="text-[#060A87]">
                    Quantity
                  </Label>
                  <Input className="w-20" id="quantity" placeholder="Ex: 1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sender Info */}
        <div className="flex flex-col items-center space-x-1 gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
              Sender Information
            </h1>
            <div className="grid grid-cols-6 gap-6 w-full px-4 ">
              <div className="grid col-span-3 gap-2 w-full ">
                <Label htmlFor="fullname" className="text-[#060A87]">
                  Full Name
                </Label>
                <Input id="fullname" placeholder="eg: Jhon Doe" />
              </div>
              <div className="grid col-span-3 gap-2 ">
                <Label htmlFor="email" className="text-[#060A87]">
                  Email
                </Label>
                <Input id="email" placeholder="eg: example@gmail.com" />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6 w-full px-4 ">
              <div className="grid col-span-3 gap-2 w-full ">
                <Label htmlFor="phone" className="text-[#060A87]">
                  Phone Number
                </Label>
                <Input id="phone" placeholder="eg: 09xxxxxxxx" />
              </div>
              <div className="grid col-span-3 gap-2 ">
                <Label htmlFor="email" className="text-[#060A87]">
                  Address
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {/* Reciver Info */}
        <div className="flex flex-col items-center space-x-1 gap-6 w-full">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
              Receiver Information
            </h1>
            <div className="grid grid-cols-6 gap-6 w-full px-4 ">
              <div className="grid col-span-3 gap-2 w-full ">
                <Label htmlFor="fullname" className="text-[#060A87]">
                  Full Name
                </Label>
                <Input id="fullname" placeholder="eg: Jhon Doe" />
              </div>
              <div className="grid col-span-3 gap-2 ">
                <Label htmlFor="fullname" className="text-[#060A87]">
                  Full Name
                </Label>
                <Input id="fullname" placeholder="eg: Jhon Doe" />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6 w-full px-4 ">
              <div className="grid col-span-3 gap-2 w-full ">
                <Label htmlFor="fullname" className="text-[#060A87]">
                  Full Name
                </Label>
                <Input id="fullname" placeholder="eg: Jhon Doe" />
              </div>
              <div className="grid col-span-3 gap-2 ">
                <Label htmlFor="fullname" className="text-[#060A87]">
                  Full Name
                </Label>
                <Input id="fullname" placeholder="eg: Jhon Doe" />
              </div>
            </div>
          </div>
        </div>
        {/* Payment Method */}

        {/* Total Price */}
        <DialogFooter className="flex justify-end sm:justify-end w-full">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-white bg-[#E30613]"
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="text-white bg-[#27A376]">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
