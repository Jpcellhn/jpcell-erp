
import { prisma } from '@/lib/db'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function Productos(){
  let productos:any[]=[]
  try{ productos = await prisma.producto.findMany({orderBy:{createdAt:'desc'}}) }catch{}
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-black">Productos ({productos.length})</h1><div className="flex gap-2"><Link href="/productos/nuevo" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-bold">+ Nuevo</Link><Link href="/api/productos/seed" className="bg-white border px-4 py-2 rounded-lg text-sm">Seed Demo</Link></div></div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Nombre</th><th className="p-3">SKU</th><th className="p-3">Cat</th><th className="p-3">Precio</th><th className="p-3">Costo</th><th className="p-3">Stock</th><th className="p-3">Acciones</th></tr></thead>
        <tbody>{productos.map((p:any)=><tr key={p.id} className="border-t hover:bg-gray-50"><td className="p-3 font-medium">{p.nombre}</td><td className="p-3">{p.sku}</td><td className="p-3">{p.categoria}</td><td className="p-3">L {p.precio}</td><td className="p-3">L {p.costo}</td><td className="p-3"><span className={p.stock<=3 ? 'text-red-600 font-bold' : ''}>{p.stock}</span></td><td className="p-3 flex gap-2"><Link href={`/productos/${p.id}/editar`} className="text-blue-600">Editar</Link><a href={`/api/productos/${p.id}/delete`} className="text-red-600">Borrar</a></td></tr>)}</tbody></table>
      </div>
    </div>
  )
}
