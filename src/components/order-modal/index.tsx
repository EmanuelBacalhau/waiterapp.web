import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import type { Order } from '../../types/order';
import { formatCurrency } from '../../utils/format-currency';

type Props = {
  visible: boolean;
  order: Order | null;
  onCloseModal: () => void;
};

export const OrderModal = ({ visible, order, onCloseModal }: Props) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  if (!visible || !order) {
    return null;
  }

  const orderStatus = () => {
    switch (order.status) {
      case 'WAITING':
        return {
          icon: '🕒',
          label: 'Fila de espera',
        };
      case 'IN_PRODUCTION':
        return {
          icon: '🧑‍🍳',
          label: 'Em preparação',
        };
      case 'DONE':
        return {
          icon: '✅',
          label: 'Pronto',
        };
      default:
        return;
    }
  };

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  return (
    <div className="inset-0 fixed w-full h-full bg-black/80 backdrop-blur flex items-center justify-center">
      <div className="bg-white rounded-lg w-[480px] p-8">
        <header className="flex items-center justify-between">
          <strong className="text-2xl">Mesa {order.table}</strong>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-400/20 transition-colors"
            onClick={onCloseModal}
          >
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <div className="mt-2">
          <small className="opacity-80">Status do pedido</small>

          <div className="flex items-center gap-2">
            <span>{orderStatus()?.icon}</span>
            <strong>{orderStatus()?.label}</strong>
          </div>
        </div>

        <div className="mt-8">
          <strong className="font-medium text-sm opacity-80">Itens</strong>

          <div className="mt-4">
            {order.products.map(({ _id, product, quantity }) => (
              <div key={_id} className="flex mt-2 gap-3">
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  width={56}
                  height={28.51}
                  alt="Imagem do produto"
                  className="rounded-lg"
                />

                <span className="text-sm text-gray-500/90">{quantity}x</span>

                <div className="flex flex-col">
                  <strong className="text-base">{product.name}</strong>
                  <span className="text-sm text-gray-500/90">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-medium text-sm">Total:</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          {order.status !== 'DONE' && (
            <footer className="space-y-2 mt-4">
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 transition-colors text-center w-full space-x-2 p-3 rounded-full"
              >
                <span>{order.status === 'WAITING' ? '🧑‍🍳' : '✅'}</span>
                <strong className="text-white">
                  {order.status === 'WAITING'
                    ? 'Iniciar produção'
                    : 'Finalizar'}
                </strong>
              </button>

              <button
                type="button"
                className="w-full p-3 rounded-full text-center hover:bg-red-600/10 text-red-600  transition-colors"
              >
                <strong>Cancelar pedido</strong>
              </button>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};
