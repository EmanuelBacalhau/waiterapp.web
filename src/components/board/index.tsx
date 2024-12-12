import { useState } from 'react';
import { toast } from 'react-toastify';
import type { Order } from '../../types/order';
import { api } from '../../utils/api';
import { OrderModal } from '../order-modal';

type Props = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeStatus: (orderId: string, status: Order['status']) => void;
};
export const Board = ({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeStatus,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenModal = (order: Order) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleChangeOrderStatus = async (order: Order) => {
    const orderId = order._id;
    const status = order.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    setIsLoading(true);
    await api.patch(`/orders/${orderId}`, { status });
    setIsLoading(false);
    handleCloseModal();
    onChangeStatus(orderId, status);
    toast.success(`O pedido da mesa ${order.table} teve o status alterado!`);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) {
      return;
    }

    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder._id}`);
    setIsLoading(false);
    handleCloseModal();
    onCancelOrder(selectedOrder._id);
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
  };

  return (
    <div className="p-4 border border-gray-500/30 w-full rounded-lg space-y-3">
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseModal={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeStatus={handleChangeOrderStatus}
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
