import { useState } from 'react';
import type { Order } from '../../types/order';
import { OrderModal } from '../order-modal';

type Props = {
  icon: string;
  title: string;
  orders: Order[];
};
export const Board = ({ icon, title, orders }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-4 border border-gray-500/30 w-full rounded-lg space-y-3">
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseModal={handleCloseModal}
      />

      <header className="flex gap-2 items-center justify-center w-full text-sm">
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.map(order => (
        <button
          key={order._id}
          type="button"
          className="flex flex-col h-32 w-full rounded-lg bg-white border border-gray-500/30 p-4 items-center justify-center"
          onClick={() => handleOpenModal(order)}
        >
          <span className="font-medium">Mesa {order.table}</span>
          <span className="font-normal text-sm text-gray-500/90">
            {order.products.length} itens
          </span>
        </button>
      ))}
    </div>
  );
};
