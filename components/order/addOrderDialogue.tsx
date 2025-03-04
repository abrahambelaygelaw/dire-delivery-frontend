'use client';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import ConfirmModal from './confirmModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { formSchema, addFormSchema } from '@/types/order';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Order } from '@/types/orderType';

type props = {
  cities: city[];
};

export default function AddOrderDialogue({ cities }: props) {
  const [currentOrder, setCurrentOrder] = useState<
    Omit<Order, 'id' | 'statuses' | 'createdAt' | 'addedBy'>
  >({
    senderName: '',
    reciverName: '',
    description: '',
    weight: 0,
    quantity: 1,
    Price: 0,
    senderAddress: '',
    reciverAddress: '',
    paymentMethod: 'cash',
    senderPhoneNumber: '',
    reciverPhoneNumber: '',
    senderEmail: '',
    reciverEmail: '',
  });
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       senderName: '',
  //       reciverName: '',
  //       description: '',
  //       weight: 0,
  //       quantity: 1,
  //       Price: 0,
  //       senderAddress: '',
  //       reciverAddress: '',
  //       paymentMethod: 'cash',
  //       senderPhoneNumber: '',
  //       reciverPhoneNumber: '',
  //       senderEmail: '',
  //       reciverEmail: '',
  //     },
  //   });
  const {
    register,
    handleSubmit,
    setValue, // Add this
    formState: { errors },
  } = useForm<addFormSchema>({
    resolver: zodResolver(formSchema),
  });
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setCurrentOrder({ ...currentOrder, [e.target.name]: e.target.value });
  //   };

  const onSubmit: SubmitHandler<addFormSchema> = (data) => {
    data.weight = Number(data.weight);
    console.log('Form data:', data);
    setCurrentOrder(data);
  };

  console.log('currentOrder:', currentOrder);

  //   function handleSubmit(values: z.infer<typeof formSchema>) {
  //     console.log(currentOrder);
  //     form.reset();
  //   }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </DialogTrigger>
      <DialogContent className=" top-[48%] sm:max-w-md bg-white flex flex-col gap-4 min-w-[540px] pb-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#060A87] font-semibold border-b border-[#060A87] pb-2">
            Add an Order
          </DialogTitle>
        </DialogHeader>
        {/* <Form action=""> */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Input
                    {...register('description')}
                    id="description"
                    placeholder="eg: Electronics"
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <div className="flex col-span-2 justify-between gap-3">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="weight" className="text-[#060A87]">
                      Weight(kg)
                    </Label>
                    <Input
                      {...register('weight')}
                      id="weight"
                      placeholder="Ex: 10"
                      type="number"
                    />
                    {errors.weight && (
                      <p className="text-red-500">{errors.weight.message}</p>
                    )}
                  </div>
                  <div className="grid flex-1 gap-2 w-12">
                    <Label htmlFor="quantity" className="text-[#060A87]">
                      Quantity
                    </Label>
                    <Input
                      {...register('quantity')}
                      className="w-20"
                      id="quantity"
                      placeholder="Ex: 1"
                    />
                    {errors.quantity && (
                      <p className="text-red-500">{errors.quantity.message}</p>
                    )}
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
                  <Input
                    {...register('senderName')}
                    id="fullname"
                    placeholder="eg: Jhon Doe"
                  />
                  {errors.senderName && (
                    <p className="text-red-500">{errors.senderName.message}</p>
                  )}
                </div>
                <div className="grid col-span-3 gap-2 ">
                  <Label htmlFor="email" className="text-[#060A87]">
                    Email
                  </Label>
                  <Input
                    {...register('senderEmail')}
                    id="email"
                    placeholder="eg: example@gmail.com"
                  />
                  {errors.senderEmail && (
                    <p className="text-red-500">{errors.senderEmail.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6 w-full px-4 ">
                <div className="grid col-span-3 gap-2 w-full ">
                  <Label htmlFor="phone" className="text-[#060A87]">
                    Phone Number
                  </Label>
                  <Input
                    {...register('senderPhoneNumber')}
                    id="phone"
                    placeholder="eg: 09xxxxxxxx"
                  />
                </div>
                <div className="grid col-span-3 gap-2 ">
                  <Label htmlFor="email" className="text-[#060A87]">
                    Address
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('senderAddress', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.senderAddress && (
                    <p className="text-red-500">
                      {errors.senderAddress.message}
                    </p>
                  )}
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
                  <Input
                    {...register('reciverName')}
                    id="fullname"
                    placeholder="eg: Jhon Doe"
                  />
                  {errors.reciverName && (
                    <p className="text-red-500">{errors.reciverName.message}</p>
                  )}
                </div>
                <div className="grid col-span-3 gap-2 ">
                  <Label htmlFor="email" className="text-[#060A87]">
                    Email
                  </Label>
                  <Input
                    {...register('reciverEmail')}
                    id="email"
                    placeholder="eg: example@gmail.com"
                  />
                  {errors.reciverEmail && (
                    <p className="text-red-500">
                      {errors.reciverEmail.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6 w-full px-4 ">
                <div className="grid col-span-3 gap-2 w-full ">
                  <Label htmlFor="phone" className="text-[#060A87]">
                    Phone Number
                  </Label>
                  <Input
                    {...register('reciverPhoneNumber')}
                    id="phone"
                    placeholder="eg: 09xxxxxxxx"
                  />
                  {errors.reciverPhoneNumber && (
                    <p className="text-red-500">
                      {errors.reciverPhoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="grid col-span-3 gap-2 ">
                  <Label htmlFor="email" className="text-[#060A87]">
                    Address
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('reciverAddress', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.senderAddress && (
                    <p className="text-red-500">
                      {errors.senderAddress.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Payment Method */}
          <section className="flex flex-col gap-3">
            <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
              Payment Method
            </h1>
            <RadioGroup
              onValueChange={(value) =>
                setValue('paymentMethod', value as 'cash' | 'delivery')
              }
              defaultValue="cash"
              className="flex px-4 "
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
            </RadioGroup>
            {errors.paymentMethod && (
              <p className="text-red-500">{errors.paymentMethod.message}</p>
            )}
          </section>
          {/* Total Price */}
          <div className="h-12 py-1.5 justify-start items-center gap-1.5 inline-flex">
            <div className="text-[#060a87] text-2xl font-bold font-['Manrope'] leading-tight">
              Total:
            </div>
            <div className="w-[280px] h-9 justify-start items-center gap-2 flex">
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="self-stretch pl-3 pr-14 py-2 rounded-md border border-slate-200 justify-start items-center inline-flex">
                  <div className="grow shrink basis-0 px-1.5 flex-col justify-end items-start gap-2.5 inline-flex">
                    <div className="text-black text-lg font-bold font-['Manrope'] leading-[18px]">
                      345.65 birr
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
        {/* </Form> */}
      </DialogContent>
    </Dialog>
  );
}
