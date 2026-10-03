
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export default async function Reportes(){
  let ventas:any[]=[], productos:any[]=[]; 
  try{ ventas = await prisma.venta.findMany({orderBy:{createdAt:'desc'}, take:100}); productos = await prisma.producto.findMany() }catch{}
  const total = ventas.reduce((a:any,b:any)=>a+b.total,0)
  const promedio = ventas.length ? total/ventas.length : 0
  return <div className="p-8"><h1 className="text-3xl font-black mb-6">Reportes</h1><div className="grid grid-cols-3 gap-4 mb-6"><div className="bg-white p-6 rounded-xl shadow"><p className="text-xs">Total Ventas</p><p className="text-2xl font-bold">L {total}</p></div><div className="bg-white p-6 rounded-xl shadow"><p className="text-xs">Ticket Promedio</p><p className="text-2xl font-bold">L {promedio.toFixed(2)}</p></div><div className="bg-white p-6 rounded-xl shadow"><p className="text-xs">Productos en catálogo</p><p className="text-2xl font-bold">{productos.length}</p></div></div><div className="bg-white p-6 rounded-xl shadow"><h3 className="font-bold mb-4">Últimas ventas</h3><ul className="space-y-1">{ventas.slice(0,20).map((v:any)=><li key={v.id} className="text-sm flex justify-between border-b py-1"><span>{new Date(v.createdAt).toLocaleString()}</span><span>L {v.total}</span></li>)}</ul></div></div>
}
