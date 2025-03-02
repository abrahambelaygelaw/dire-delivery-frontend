import { FetchOrder } from '@/actions/order';
import { notFound } from 'next/navigation';
interface Params {
  orderid: string;
}

export default async function OrderPage({ params }: { params: Params }) {
  const { orderid } = await params;
  const id = orderid;
  console.log(id);

  const response = await FetchOrder(id);
  const order = response[0];
  console.log(order);

  if (!order) return notFound(); // Handles cases where the order isn't found

  return (
    <section>
      <div>{order.transactionId}</div>
    </section>
  );
}
