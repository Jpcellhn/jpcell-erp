
import { prisma } from '@/lib/db'
export const dynamic = 'force-dynamic'
export default async function Dashboard(){
  let stats = {productos:0, clientes:0, ventas:0, total:0, gastos:0, stockBajo:0}
  let topProductos:any[]=[]
  try{
    const [productos, clientes, ventas, gastos, stockBajo] = await Promise.all([
      prisma.producto.count(),
      prisma.cliente.count(),
      prisma.venta.count(),
      prisma.gasto.aggregate({_sum:{monto:true}}),
      prisma.producto.count({where:{stock:{lte:3}}}),
    ])
    const totalAgg = await prisma.venta.aggregate({_sum:{total:true}})
    stats = {productos, clientes, ventas, total: totalAgg._sum.total||0, gastos: gastos._sum.monto||0, stockBajo}
    topProductos = await prisma.producto.findMany({orderBy:{stock:'asc'}, take:5})
  }catch(e){ console.log(e) }
  const utilidad = stats.total - stats.gastos
  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-xl shadow"><p className="text-xs text-gray-500">Productos</p><p className="text-3xl font-bold">{stats.productos}</p></div>
        <div className="bg-white p-6 rounded-xl shadow"><p className="text-xs text-gray-500">Clientes</p><p className="text-3xl font-bold">{stats.clientes}</p></div>
        <div className="bg-white p-6 rounded-xl shadow"><p className="text-xs text-gray-500">Ventas</p><p className="text-3xl font-bold">{stats.ventas}</p></div>
        <div className="bg-white p-6 rounded-xl shadow"><p className="text-xs text-gray-500">Ingresos</p><p className="text-2xl font-bold text-green-600">L {stats.total}</p></div>
        <div className="bg-white p-6 rounded-xl shadow"><p className="text-xs text-gray-500">Gastos</p><p className="text-2xl font-bold text-red-600">L {stats.gastos}</p></div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-l-green-500"><p className="text-xs text-gray-500">Utilidad</p><p className="text-2xl font-bold">L {utilidad}</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow"><h3 className="font-bold mb-4">⚠️ Stock Bajo (≤3)</h3><p className="text-sm mb-2">{stats.stockBajo} productos con stock crítico</p><ul className="space-y-1">{topProductos.filter((p:any)=>p.stock<=3).map((p:any)=><li key={p.id} className="text-sm flex justify-between border-b py-1"><span>{p.nombre}</span><span className="font-bold text-red-600">{p.stock}</span></li>)}</ul></div>
        <div className="bg-white p-6 rounded-xl shadow"><h3 className="font-bold mb-4">🚀 Acciones rápidas</h3><div className="space-y-2"><a href="/ventas/nueva" className="block w-full bg-black text-white text-center py-2 rounded-lg">Nueva Venta</a><a href="/productos/nuevo" className="block w-full border text-center py-2 rounded-lg">Nuevo Producto</a><a href="/clientes/nuevo" className="block w-full border text-center py-2 rounded-lg">Nuevo Cliente</a></div></div>
      </div>
    </div>
  )
}
