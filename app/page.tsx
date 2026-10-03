
import Link from 'next/link'
export default function Home(){
  return (
    <div className="p-8">
      <div className="bg-white p-8 rounded-2xl shadow max-w-5xl">
        <h1 className="text-5xl font-black">JPCELL ERP v6 FINAL</h1>
        <p className="text-gray-600 mt-2 text-lg">Sistema completo - 7 módulos - Neon ep-small-breeze-b5jry210</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/dashboard" className="p-6 bg-blue-600 text-white rounded-xl text-center font-bold hover:bg-blue-700">📊 Dashboard<br/><span className="text-xs font-normal">Ver métricas</span></Link>
          <Link href="/productos" className="p-6 bg-green-600 text-white rounded-xl text-center font-bold hover:bg-green-700">📦 Productos<br/><span className="text-xs font-normal">{`CRUD completo`}</span></Link>
          <Link href="/clientes" className="p-6 bg-purple-600 text-white rounded-xl text-center font-bold hover:bg-purple-700">👥 Clientes<br/><span className="text-xs font-normal">Base clientes</span></Link>
          <Link href="/ventas/nueva" className="p-6 bg-orange-600 text-white rounded-xl text-center font-bold hover:bg-orange-700">💰 Nueva Venta<br/><span className="text-xs font-normal">Carrito + stock</span></Link>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Link href="/inventario" className="p-4 bg-slate-100 rounded-xl text-center font-bold">📋 Inventario bajo</Link>
          <Link href="/gastos" className="p-4 bg-slate-100 rounded-xl text-center font-bold">💸 Gastos</Link>
          <Link href="/reportes" className="p-4 bg-slate-100 rounded-xl text-center font-bold">📈 Reportes</Link>
        </div>
        <Link href="/modulos" className="mt-6 block rounded-xl bg-violet-600 p-4 text-center font-bold text-white hover:bg-violet-700">
          🧩 Abrir centro de los 7 módulos integrados
        </Link>
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl"><p className="font-bold text-green-800">✅ SISTEMA FINAL LISTO</p><p className="text-sm text-green-700">Todos los módulos incluidos. Haz tu primera venta en /ventas/nueva</p></div>
      </div>
    </div>
  )
}
