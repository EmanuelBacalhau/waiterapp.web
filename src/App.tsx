import { ToastContainer } from 'react-toastify';
import { Header } from './components/header';
import { Orders } from './components/orders';
import 'react-toastify/ReactToastify.css';

export function App() {
  return (
    <>
      <Header />
      <Orders />
      <ToastContainer position="bottom-center" theme="light" />
    </>
  );
}
