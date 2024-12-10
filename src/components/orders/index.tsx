import type { Order } from '../../types/order';
import { Board } from '../board';

const orders: Order[] = [
  {
    _id: '6756242d21eaace6e04e70c9',
    table: '50',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijo',
          imagePath: '1733694553332-quatro-queijos.png',
          price: 40,
        },
        quantity: 2,
        _id: '6756242d21eaace6e04e70ca',
      },
      {
        product: {
          name: 'Coca Cola',
          imagePath: '1733694993411-coca-cola.png',
          price: 26,
        },
        quantity: 2,
        _id: '6756242d21eaace6e04e70cb',
      },
    ],
  },
  {
    _id: '6756242d21eaace6e04e70c9',
    table: '50',
    status: 'DONE',
    products: [
      {
        product: {
          name: 'Pizza quatro queijo',
          imagePath: '1733694553332-quatro-queijos.png',
          price: 40,
        },
        quantity: 2,
        _id: '6756242d21eaace6e04e70ca',
      },
      {
        product: {
          name: 'Coca Cola',
          imagePath: '1733694993411-coca-cola.png',
          price: 26,
        },
        quantity: 2,
        _id: '6756242d21eaace6e04e70cb',
      },
    ],
  },
];

export const Orders = () => {
  const waitingOrders = orders.filter(order => order.status === 'WAITING');
  const preparingOrders = orders.filter(
    order => order.status === 'IN_PRODUCTION'
  );
  const doneOrders = orders.filter(order => order.status === 'DONE');

  return (
    <div className="max-w-[1216px] w-full my-10 mx-auto grid grid-cols-3 gap-4">
      <Board icon="🕑" title="Fila de espera" orders={waitingOrders} />
      <Board icon="🧑‍🍳" title="Em preparação" orders={preparingOrders} />
      <Board icon="✅" title="Finalizados" orders={doneOrders} />
    </div>
  );
};
