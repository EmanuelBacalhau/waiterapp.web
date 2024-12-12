import { useEffect, useState } from 'react';
import type { Order } from '../../types/order';
import { api } from '../../utils/api';
import { Board } from '../board';

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await api.get('/orders');

      console.log(data);

      setOrders(data);
    }

    fetchOrders();
  }, []);

  const waitingOrders = orders.filter(order => order.status === 'WAITING');
  const preparingOrders = orders.filter(
    order => order.status === 'IN_PRODUCTION'
  );
  const doneOrders = orders.filter(order => order.status === 'DONE');

  const handleCancelOrder = async (orderId: string) => {
    setOrders(prevOrders => {
      return prevOrders.filter(prevOrder => prevOrder._id !== orderId);
    });
  };

  const handleChangeOrderStatus = async (
    orderId: string,
    status: Order['status']
  ) => {
    setOrders(prevOrders => {
      return prevOrders.map(prevOrder => {
        if (prevOrder._id === orderId) {
          return { ...prevOrder, status };
        }

        return prevOrder;
      });
    });
  };

  return (
    <div className="max-w-[1216px] w-full my-10 mx-auto grid grid-cols-3 gap-4">
      <Board
        icon="🕑"
        title="Fila de espera"
        orders={waitingOrders}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleChangeOrderStatus}
      />
      <Board
        icon="🧑‍🍳"
        title="Em preparação"
        orders={preparingOrders}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleChangeOrderStatus}
      />
      <Board
        icon="✅"
        title="Finalizados"
        orders={doneOrders}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleChangeOrderStatus}
      />
    </div>
  );
};
