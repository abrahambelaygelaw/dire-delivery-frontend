'use client';

import { Mail, Phone, MapPin, Edit, X } from 'lucide-react';
import type { help } from '@/types/help';
import { useEffect, useState } from 'react';
import { HelpFetch, patchHelp } from '@/actions/help';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const helpForm = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  location: z.string(),
});
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Page() {
  const [help, setHelp] = useState<help>();
  const [showEditInfoModal, setShowEditInfoModal] = useState<boolean>(false);
  const [triggerState, setStateTrigger] = useState<boolean>(false);

  const [showConfirmInfo, setShowConfirmInfo] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof helpForm>>({
    resolver: zodResolver(helpForm),
  });

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const response = await HelpFetch();
        setHelp(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHelp();
  }, [triggerState]);

  const onSubmit: SubmitHandler<z.infer<typeof helpForm>> = async (data) => {
    console.log('Form data submitted:', data); // Log form data
    const updatedHelp = {
      item: {
        email: data.email,
        phone: data.phone,
        location: data.location,
      },
    };
    setHelp(updatedHelp);
    setShowEditInfoModal(false);
    setShowConfirmInfo(true);
    console.log('Updated help data:', updatedHelp); // Log updated help data
  };
  const handleClose = () => {
    reset();
    setShowConfirmInfo(false);
    setStateTrigger(!triggerState);
  };

  const submitting = async () => {
    try {
      const response = await patchHelp(help!);
      console.log('response:', response);
      setShowEditInfoModal(false);
      setShowConfirmInfo(false);
      reset();
      setStateTrigger(!triggerState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f0f1fa] flex p-10">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#0a0f8a]">
              Welcome Back, Owner!
            </h1>
            <p className="text-[#0a0f8a]/80">
              Here&apos;s your Help and Support
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Help and Support
            </h2>
            <div className="h-px bg-gray-200 mb-6"></div>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email Support</h3>
                  <p className="text-gray-500">{help?.item.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone Support</h3>
                  <p className="text-gray-500">{help?.item.phone}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-500">{help?.item.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowEditInfoModal(true)}
                className="inline-flex items-center px-4 py-2 bg-[#0a0f8a] text-white rounded-md hover:bg-[#0a0f8a]/90 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Info
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showEditInfoModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full h-fit max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Info</h2>
              <button onClick={() => setShowEditInfoModal(false)} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <div className="space-y-2">
                {/* Repeat similar blocks for Sender and Receiver Information */}
                <div className="mt-2">
                  <h3 className="text-lg text-[#060a87] font-bold border-b pb-2">
                    Help and Support Information
                  </h3>
                  <div className="flex flex-col gap-4 mt-2 px-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder={help?.item.email}
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder={help?.item.phone}
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder={help?.item.location}
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('location')}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-2">
                  <div></div>

                  <button
                    type="button"
                    onClick={() => setShowEditInfoModal(false)}
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
      {showConfirmInfo && (
        <div className="fixed inset-0 bg-[#060A87]/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {' '}
                New Help and Support Details
              </h2>
              <button onClick={() => setShowConfirmInfo(false)} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="border px-3 py-5 grid grid-cols-2 gap-10">
              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Email
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>{help?.item.email}</p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Phone
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>{help?.item.phone}</p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Location
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>{help?.item.location}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleClose}
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
    </>
  );
}
