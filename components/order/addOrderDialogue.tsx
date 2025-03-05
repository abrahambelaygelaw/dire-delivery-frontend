'use client';

import { X } from 'lucide-react';
import { city } from '@/types/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addFormSchema } from '@/types/order';
import { useState } from 'react';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { generateTransactionId } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import ConfirmModal from './confirmModal';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AddOrder } from '@/actions/order';
type props = {
  cities: city[];
  showNewOrderModal: boolean;
  setShowNewOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  showRecipet: boolean;
  setShowRecipt: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddOrderDialogue({
  cities,
  showNewOrderModal,
  setShowNewOrderModal,
  showConfirmationModal,
  setShowConfirmationModal,
  showRecipet,
  setShowRecipt,
}: props) {
  const [currentOrder, setCurrentOrder] = useState<Order>({
    id: '',
    createdAt: '',
    addedBy: 'Eyosi',
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
  });
  const priceCalculator = (weight: number, quantity: number) => {
    const basePrice = 200;
    if (weight <= 1 && weight > 0) {
      return basePrice * quantity;
    } else {
      return basePrice * weight * quantity;
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof addFormSchema>> = async (
    data
  ) => {
    console.log('Form data submitted:', data); // Log form data
    const totalPrice = priceCalculator(data.weight, data.quantity);
    const date = new Date();
    const randomTransaction = generateTransactionId();
    const randomId = uuidv4();
    const orderData = {
      ...data,
      id: randomId,
      createdAt: formatDate(date.toLocaleDateString()),
      transactionId: randomTransaction,
      status: 'Pending',
      Price: totalPrice,
    };
    console.log('Order data:', orderData); // Log order data
    setCurrentOrder(orderData);
    setShowNewOrderModal(false);
    setShowConfirmationModal(true);
  };
  const submitting = async () => {
    try {
      const response = await AddOrder(currentOrder);
      console.log('responseFromadd', response);
    } catch (error) {
      console.log(error);
    }
    setShowConfirmationModal(false);
    setShowRecipt(true);
  };
  console.log('Form errors:', errors);
  console.log('currentOrder:', currentOrder);

  return (
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        {...register('description')}
                        placeholder="Enter description"
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('weight', { valueAsNumber: true })}
                        title="Weight"
                        placeholder="Ex: 10"
                      />
                      {errors.weight && (
                        <p className="text-red-500 text-sm">
                          {errors.weight.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('quantity', { valueAsNumber: true })}
                        placeholder="Ex: 10"
                      />
                      {errors.quantity && (
                        <p className="text-red-500 text-sm">
                          {errors.quantity.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Repeat similar blocks for Sender and Receiver Information */}
                <div>
                  <h3 className="text-lg text-[#060a87] font-medium border-b pb-2">
                    Sender Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('senderName')}
                        placeholder="Ex: Jhon Doe"
                      />
                      {errors.senderName && (
                        <p className="text-red-500 text-sm">
                          {errors.senderName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('senderEmail')}
                        placeholder="example@gmail.com"
                      />
                      {errors.senderEmail && (
                        <p className="text-red-500 text-sm">
                          {errors.senderEmail.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('senderPhoneNumber')}
                        placeholder="eg: 09xxxxxxxx"
                      />
                      {errors.senderPhoneNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.senderPhoneNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Select
                        value={watch('senderAddress')}
                        onValueChange={(value) =>
                          setValue('senderAddress', value)
                        }
                      >
                        <SelectTrigger className="w-full px-3 py-2 border rounded-lg">
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
                      {errors.senderAddress && (
                        <p className="text-red-500 text-sm">
                          {errors.senderAddress.message}
                        </p>
                      )}
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
                        {...register('reciverName')}
                        placeholder="Ex: Jhon"
                      />
                      {errors.reciverName && (
                        <p className="text-red-500 text-sm">
                          {errors.reciverName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('reciverEmail')}
                        placeholder="example@gmail.com"
                      />
                      {errors.reciverEmail && (
                        <p className="text-red-500 text-sm">
                          {errors.reciverEmail.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('reciverPhoneNumber')}
                        placeholder="eg: 09xxxxxxxx"
                      />
                      {errors.reciverPhoneNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.reciverPhoneNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Select
                        value={watch('reciverAddress')}
                        onValueChange={(value) =>
                          setValue('reciverAddress', value)
                        }
                      >
                        <SelectTrigger className="w-full px-3 py-2 border rounded-lg">
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
                      {errors.reciverAddress && (
                        <p className="text-red-500 text-sm">
                          {errors.reciverAddress.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col py-4">
                    <h3 className="font-bold text-lg border-b-2 py-2 text-[#060A87]">
                      Payment Method
                    </h3>
                    <div className="space-y-2 flex flex-col px-10 py-2">
                      <label className="flex">
                        <input
                          type="radio"
                          value="Now"
                          {...register('paymentMethod')}
                          className="mr-2"
                        />
                        Pay Now
                      </label>
                      <label className="flex">
                        <input
                          type="radio"
                          value="On Delivery"
                          {...register('paymentMethod')}
                          className="mr-2"
                        />
                        Pay on Delivery
                      </label>
                    </div>
                    {errors.paymentMethod && (
                      <p className="text-red-500 text-sm">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewOrderModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 bg-[#060A87]/20 flex items-center justify-center z-50">
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

            <div className="border px-3 py-5 grid grid-cols-2 gap-10">
              <div className="h-full">
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

              <div className="h-full">
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
                  Receiver Detail
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
                    ).toFixed(2)}{' '}
                    birr
                  </p>
                </div>
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
                onClick={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecipet && (
        <ConfirmModal
          currentOrder={{ ...currentOrder, id: uuidv4() }}
          setShowRecipt={setShowRecipt}
        />
      )}
    </>
  );
}
