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
import { Plus, X } from 'lucide-react';
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
import { formatDate } from '@/lib/utils';
import { generateTransactionId } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

type props = {
  cities: city[];
  showNewOrderModal: boolean;
  setShowNewOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddOrderDialogue({
  cities,
  showNewOrderModal,
  setShowNewOrderModal,
  showConfirmationModal,
  setShowConfirmationModal,
}: props) {
  const [currentOrder, setCurrentOrder] = useState<
    Omit<Order, 'id' | 'statuses' | 'createdAt' | 'addedBy'>
  >({
    senderName: '',
    reciverName: '',
    description: '',
    senderAddress: '',
    reciverAddress: '',
    paymentMethod: undefined,
    senderPhoneNumber: '',
    reciverPhoneNumber: '',
    senderEmail: '',
    reciverEmail: '',
    weight: 0,
    quantity: 1,
    status: '',
  });
  const priceCalculator = (weight: number, quantity: number) => {
    const basePrice = 200;
    if (weight <= 1 && weight > 0) {
      return basePrice * quantity;
    } else {
      return basePrice * weight * quantity;
    }
  };

  const onSubmit: SubmitHandler<addFormSchema> = () => {
    const totalPrice = priceCalculator(
      currentOrder.weight,
      currentOrder.quantity
    );
    const date = new Date();
    const randomTransaction = generateTransactionId();
    const randomId = uuidv4();
    const orderData = {
      ...currentOrder,
      id: randomId,
      createdAt: formatDate(date.toLocaleDateString()),
      transactionNumber: randomTransaction,
      senderAddress: currentOrder.senderAddress,
      reciverAddress: currentOrder.reciverAddress,
      status: 'Pending',
      totalPrice,
    };
    console.log('orderData:');
    console.log('orderData:', orderData);
  };

  console.log('currentOrder:', currentOrder);

  //   function handleSubmit(values: z.infer<typeof formSchema>) {
  //     console.log(currentOrder);
  //     form.reset();
  //   }
  return (
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button className="bg-emerald-500 hover:bg-emerald-600">
    //       <Plus className="mr-2 h-4 w-4" /> Add New Order
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent className=" top-[48%] sm:max-w-md bg-white flex flex-col gap-4 min-w-[540px] pb-6">
    //     <DialogHeader>
    //       <DialogTitle className="text-xl text-[#060A87] font-semibold border-b border-[#060A87] pb-2">
    //         Add an Order
    //       </DialogTitle>
    //     </DialogHeader>
    //     {/* <Form action=""> */}
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       {/* Item Info */}
    //       <div className="flex flex-col items-center space-x-1 gap-10 w-full">
    //         <div className="flex flex-col gap-3 ">
    //           <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
    //             Item Information
    //           </h1>
    //           <div className="grid grid-cols-5 gap-6 w-full px-4 ">
    //             <div className="grid col-span-3 flex-1 gap-3 ">
    //               <Label htmlFor="description" className="text-[#060A87]">
    //                 Description
    //               </Label>
    //               <Input
    //                 {...register('description')}
    //                 id="description"
    //                 placeholder="eg: Electronics"
    //               />
    //               {errors.description && (
    //                 <p className="text-red-500">{errors.description.message}</p>
    //               )}
    //             </div>
    //             <div className="flex col-span-2 justify-between gap-3">
    //               <div className="grid flex-1 gap-3">
    //                 <Label htmlFor="weight" className="text-[#060A87]">
    //                   Weight(kg)
    //                 </Label>
    //                 <Input
    //                   {...register('weight')}
    //                   id="weight"
    //                   placeholder="Ex: 10"
    //                   type="number"
    //                 />
    //                 {errors.weight && (
    //                   <p className="text-red-500">{errors.weight.message}</p>
    //                 )}
    //               </div>
    //               <div className="grid flex-1 gap-3 w-12">
    //                 <Label htmlFor="quantity" className="text-[#060A87]">
    //                   Quantity
    //                 </Label>
    //                 <Input
    //                   {...register('quantity')}
    //                   className="w-20"
    //                   id="quantity"
    //                   placeholder="Ex: 1"
    //                 />
    //                 {errors.quantity && (
    //                   <p className="text-red-500">{errors.quantity.message}</p>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Sender Info */}
    //       <div className="flex flex-col items-center space-x-1 gap-6 w-full">
    //         <div className="flex flex-col gap-3 w-full">
    //           <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
    //             Sender Information
    //           </h1>
    //           <div className="grid grid-cols-6 gap-6 w-full px-4 ">
    //             <div className="grid col-span-3 gap-3 w-full ">
    //               <Label htmlFor="fullname" className="text-[#060A87]">
    //                 Full Name
    //               </Label>
    //               <Input
    //                 {...register('senderName')}
    //                 id="fullname"
    //                 placeholder="eg: Jhon Doe"
    //               />
    //               {errors.senderName && (
    //                 <p className="text-red-500">{errors.senderName.message}</p>
    //               )}
    //             </div>
    //             <div className="grid col-span-3 gap-3 ">
    //               <Label htmlFor="email" className="text-[#060A87]">
    //                 Email
    //               </Label>
    //               <Input
    //                 {...register('senderEmail')}
    //                 id="email"
    //                 placeholder="eg: example@gmail.com"
    //               />
    //               {errors.senderEmail && (
    //                 <p className="text-red-500">{errors.senderEmail.message}</p>
    //               )}
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-6 gap-6 w-full px-4 ">
    // <div className="grid col-span-3 gap-3 w-full ">
    //   <Label htmlFor="phone" className="text-[#060A87]">
    //     Phone Number
    //   </Label>
    //   <Input
    //     {...register('senderPhoneNumber')}
    //     id="phone"
    //     placeholder="eg: 09xxxxxxxx"
    //   />
    // </div>
    //             <div className="grid col-span-3 gap-3 ">
    //               <Label htmlFor="email" className="text-[#060A87]">
    //                 Address
    //               </Label>
    //               <Select
    //                 onValueChange={(value) => setValue('senderAddress', value)}
    //               >
    //                 <SelectTrigger className="w-[180px]">
    //                   <SelectValue placeholder="City" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   {cities.map((city) => (
    //                     <SelectItem key={city.id} value={city.name}>
    //                       {city.name}
    //                     </SelectItem>
    //                   ))}
    //                 </SelectContent>
    //               </Select>
    //               {errors.senderAddress && (
    //                 <p className="text-red-500">
    //                   {errors.senderAddress.message}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Reciver Info */}
    //       <div className="flex flex-col items-center space-x-1 gap-6 w-full">
    //         <div className="flex flex-col gap-3 w-full">
    //           <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
    //             Receiver Information
    //           </h1>
    //           <div className="grid grid-cols-6 gap-6 w-full px-4 ">
    //             <div className="grid col-span-3 gap-3 w-full ">
    //               <Label htmlFor="fullname" className="text-[#060A87]">
    //                 Full Name
    //               </Label>
    //               <Input
    //                 {...register('reciverName')}
    //                 id="fullname"
    //                 placeholder="eg: Jhon Doe"
    //               />
    //               {errors.reciverName && (
    //                 <p className="text-red-500">{errors.reciverName.message}</p>
    //               )}
    //             </div>
    //             <div className="grid col-span-3 gap-3 ">
    //               <Label htmlFor="email" className="text-[#060A87]">
    //                 Email
    //               </Label>
    //               <Input
    //                 {...register('reciverEmail')}
    //                 id="email"
    //                 placeholder="eg: example@gmail.com"
    //               />
    //               {errors.reciverEmail && (
    //                 <p className="text-red-500">
    //                   {errors.reciverEmail.message}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-6 gap-6 w-full px-4 ">
    //             <div className="grid col-span-3 gap-3 w-full ">
    //               <Label htmlFor="phone" className="text-[#060A87]">
    //                 Phone Number
    //               </Label>
    //               <Input
    //                 {...register('reciverPhoneNumber')}
    //                 id="phone"
    //                 placeholder="eg: 09xxxxxxxx"
    //               />
    //               {errors.reciverPhoneNumber && (
    //                 <p className="text-red-500">
    //                   {errors.reciverPhoneNumber.message}
    //                 </p>
    //               )}
    //             </div>
    //             <div className="grid col-span-3 gap-3 ">
    //               <Label htmlFor="email" className="text-[#060A87]">
    //                 Address
    //               </Label>
    //               <Select
    //                 onValueChange={(value) => setValue('reciverAddress', value)}
    //               >
    //                 <SelectTrigger className="w-[180px]">
    //                   <SelectValue placeholder="City" />
    //                 </SelectTrigger>
    // <SelectContent>
    //   {cities.map((city) => (
    //     <SelectItem key={city.id} value={city.name}>
    //       {city.name}
    //     </SelectItem>
    //   ))}
    // </SelectContent>
    //               </Select>
    //               {errors.senderAddress && (
    //                 <p className="text-red-500">
    //                   {errors.senderAddress.message}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* Payment Method */}
    //       <section className="flex flex-col gap-3">
    //         <h1 className="text-lg text-[#060a87] font-medium border-b-[0.2px]">
    //           Payment Method
    //         </h1>
    //         <RadioGroup
    //           onValueChange={(value) =>
    //             setValue('paymentMethod', value as 'cash' | 'delivery')
    //           }
    //           defaultValue=""
    //           className="flex px-4 "
    //         >
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="cash" id="cash" />
    //             <Label htmlFor="cash">Cash</Label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="delivery" id="delivery" />
    //             <Label htmlFor="delivery">Delivery</Label>
    //           </div>
    //         </RadioGroup>
    //         {errors.paymentMethod && (
    //           <p className="text-red-500">{errors.paymentMethod.message}</p>
    //         )}
    //       </section>
    //       {/* Total Price */}
    //       <div className="h-12 py-1.5 justify-start items-center gap-1.5 inline-flex">
    //         <div className="text-[#060a87] text-2xl font-bold font-['Manrope'] leading-tight">
    //           Total:
    //         </div>
    //         <div className="w-[280px] h-9 justify-start items-center gap-3 flex">
    //           <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
    //             <div className="self-stretch pl-3 pr-14 py-2 rounded-md border border-slate-200 justify-start items-center inline-flex">
    //               <div className="grow shrink basis-0 px-1.5 flex-col justify-end items-start gap-3.5 inline-flex">
    //                 <div className="text-black text-lg font-bold font-['Manrope'] leading-[18px]">
    //                   {priceCalculator(
    //                     currentOrder.weight,
    //                     currentOrder.quantity
    //                   )}
    //                   birr
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <DialogFooter className="flex justify-end sm:justify-end w-full">
    //         <DialogClose asChild>
    //           <Button
    //             type="button"
    //             variant="secondary"
    //             className="text-white bg-[#E30613]"
    //           >
    //             Close
    //           </Button>
    //         </DialogClose>
    //         <Button
    //           type="submit"
    //           className="bg-emerald-500 hover:bg-emerald-600"
    //         >
    //           Submit
    //         </Button>
    //       </DialogFooter>
    //     </form>
    //     {/* </Form> */}
    //   </DialogContent>
    // </Dialog>
    <>
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Order</h2>
              <button onClick={() => setShowNewOrderModal(false)} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-lg text-[#060a87] font-medium border-b pb-2">
                  Item Information
                </h1>
                <div className="grid grid-cols-5 gap-6 mt-4">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Object Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.description}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.weight}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          weight: parseFloat(e.target.value),
                        })
                      }
                      title="Weight"
                      placeholder="Ex: 10"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.quantity}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      placeholder="Ex: 10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-[#060a87] font-medium border-b pb-2">
                  Sender Information
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-4 ">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.senderName}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          senderName: e.target.value,
                        })
                      }
                      placeholder="Ex: Jhon Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.senderEmail}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          senderEmail: e.target.value,
                        })
                      }
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 ">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.senderPhoneNumber}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          senderPhoneNumber: e.target.value,
                        })
                      }
                      placeholder="eg: 09xxxxxxxx"
                    />
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Select
                      value={currentOrder.senderAddress}
                      onValueChange={(value) =>
                        setCurrentOrder({
                          ...currentOrder,
                          senderAddress: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full px-3 py-2 border rounded-lg ">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent className="">
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

              <div>
                <h3 className="text-lg text-[#060a87] font-medium border-b pb-2">
                  Receiver Information
                </h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.reciverName}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          reciverName: e.target.value,
                        })
                      }
                      placeholder="Ex: Jhon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.reciverEmail}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          reciverEmail: e.target.value,
                        })
                      }
                      placeholder="example@gmail.com"
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Select
                      value={currentOrder.reciverAddress}
                      onValueChange={(value) =>
                        setCurrentOrder({
                          ...currentOrder,
                          reciverAddress: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 ">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={currentOrder.reciverPhoneNumber}
                      onChange={(e) =>
                        setCurrentOrder({
                          ...currentOrder,
                          reciverPhoneNumber: e.target.value,
                        })
                      }
                      placeholder="eg: 09xxxxxxxx"
                    />
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Select
                      value={currentOrder.reciverAddress}
                      onValueChange={(value) =>
                        setCurrentOrder({
                          ...currentOrder,
                          reciverAddress: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full px-3 py-2 border rounded-lg ">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent className="">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Price
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  value={`${priceCalculator(
                    currentOrder.weight!,
                    currentOrder.quantity!
                  ).toFixed(2)} birr`}
                  placeholder="Price"
                  readOnly
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowNewOrderModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowNewOrderModal(false);
                    setShowConfirmationModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-[#060A87]/20  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <button
                onClick={() => setShowConfirmationModal(false)}
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className=" border px-3 py-5 grid grid-cols-2 gap-10">
              <div className="h-full ">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Item Details
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Description:</strong> {currentOrder.description}
                  </p>
                  <p>
                    <strong>Weight:</strong> {currentOrder.weight}kg
                  </p>
                  <p>
                    <strong>Quantity:</strong> {currentOrder.quantity}
                  </p>
                </div>
              </div>

              <div className="h-full ">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Sender Detail
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Full Name:</strong> {currentOrder.senderName}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentOrder.senderEmail}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{' '}
                    {currentOrder.senderPhoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {currentOrder.senderAddress}
                  </p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Reciver Detail
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Full Name:</strong> {currentOrder.reciverName}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentOrder.reciverEmail}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{' '}
                    {currentOrder.reciverPhoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {currentOrder.reciverAddress}
                  </p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Payment Detail
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Transaction Id:</strong>{' '}
                    {currentOrder.transactionId}
                  </p>
                  <p>
                    <strong>Total Price:</strong>{' '}
                    {priceCalculator(
                      currentOrder.weight!,
                      currentOrder.quantity!
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" flex flex-col py-4 ">
              <h3 className="font-bold text-lg border-b-2 py-2 text-[#060A87]">
                Payment Method
              </h3>
              <div className="space-y-2 flex flex-col px-10 py-2">
                <label className="flex ">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Now"
                    checked={currentOrder.paymentMethod === 'Now'}
                    onChange={(e) =>
                      setCurrentOrder({
                        ...currentOrder,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="mr-2"
                  />
                  Pay Now
                </label>
                <label className="flex">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="On Delivery"
                    checked={currentOrder.paymentMethod === 'On Delivery'}
                    onChange={(e) =>
                      setCurrentOrder({
                        ...currentOrder,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="mr-2"
                  />
                  Pay on Delivery
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onSubmit(
                    {
                      ...currentOrder,
                      paymentMethod: currentOrder.paymentMethod || '',
                    },
                    undefined
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
          {/* <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <button
                onClick={() => setShowConfirmationModal(false)}
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Package Details</h3>
                <p>
                  <strong>Description:</strong> {currentOrder.description}
                </p>
                <p>
                  <strong>Weight:</strong> {currentOrder.weight}kg
                </p>
                <p>
                  <strong>Quantity:</strong> {currentOrder.quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> $
                  {priceCalculator(
                    currentOrder.weight!,
                    currentOrder.quantity!
                  ).toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Sender Information</h3>
                <p>
                  <strong>Name:</strong> {currentOrder.senderName}
                </p>
                <p>
                  <strong>Address:</strong> {currentOrder.senderAddress}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Receiver Information</h3>
                <p>
                  <strong>Name:</strong> {currentOrder.reciverName}
                </p>
                <p>
                  <strong>Address:</strong> {currentOrder.reciverAddress}
                </p>
              </div>

              

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onSubmit(
                    {
                      ...currentOrder,
                      paymentMethod: currentOrder.paymentMethod || '',
                    },
                    undefined
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
