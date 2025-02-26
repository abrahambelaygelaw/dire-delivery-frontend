export type Order = {
  id: number;
  transactionId: string;
  senderName: string;
  reciverName: string;
  description: string;
  weight: number;
  quantity: number;
  price: number;
  senderAddress: string;
  reciverAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
};
