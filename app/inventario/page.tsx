
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export default async function Inventario(){
  let productos:any[]=[]; try{ productos = await prisma.producto.findMany({orderBy:{stock:'asc'}}) }catch{}
  const bajo = productos.filter((p:any)=>p.stock<=3)
  return <div className="p-8"><h1 className="text-3xl font-black mb-6">Inventario - Stock Bajo ({bajo.length})</h1><div className="bg-white rounded-xl shadow overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Producto</th><th className="p-3">Stock</th><th className="p-3">Estado</th></tr></thead><tbody>{productos.map((p:any)=><tr key={p.id} className="border-t"><td className="p-3">{p.nombre}</td><td className="p-3">{p.stock}</td><td className="p-3">{p.stock===0 ? '🔴 Agotado' : p.stock<=3 ? '🟡 Bajo' : '🟢 OK'}</td></tr>)}</tbody></table></div></div>
}
