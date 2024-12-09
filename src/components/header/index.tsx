import logo from '../../assets/images/logo.svg'

export const Header = () => {
  return (
    <header className="bg-red-600 flex justify-center h-48">
      <div className="w-full max-w-[1216px] flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-white font-bold text-3xl">Pedidos</h1>
          <h2 className="text-white font-normal opacity-90">
            Acompanhe os pedidos dos clientes
          </h2>
        </div>

        <img src={logo} alt="WAIRTERAPP" />
      </div>
    </header>
  )
}
