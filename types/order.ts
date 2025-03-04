import * as z from 'zod';

export const formSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  weight: z.coerce.number().positive('Weight must be a positive number'),
  quantity: z.coerce
    .number()
    .int()
    .positive('Quantity must be a positive integer'),
  senderName: z.string().min(1, 'Sender name is required'),
  senderEmail: z.string().email('Invalid email'),
  senderPhoneNumber: z.string().min(10, 'Phone number is required'),
  senderAddress: z.string().min(1, 'Address is required'),
  reciverName: z.string().min(1, 'Receiver name is required'),
  reciverEmail: z.string().email('Invalid email'),
  reciverPhoneNumber: z.string().min(10, 'Phone number is required'),
  reciverAddress: z.string().min(1, 'Address is required'),
  paymentMethod: z.enum(['cash', 'delivery']),
});

export type addFormSchema = z.infer<typeof formSchema>;
