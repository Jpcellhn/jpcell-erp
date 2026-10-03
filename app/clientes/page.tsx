
import { prisma } from '@/lib/db'
import Link from 'next/link'
export const dynamic='force-dynamic'
export default async function Clientes(){
  let clientes:any[]=[]; try{ clientes = await prisma.cliente.findMany({orderBy:{createdAt:'desc'}}) }catch{}
  return (
    <div className="p-8">
      <div className="flex justify-between mb-6"><h1 className="text-3xl font-black">Clientes ({clientes.length})</h1><Link href="/clientes/nuevo" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-bold">+ Nuevo Cliente</Link></div>
      <div className="bg-white rounded-xl shadow overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Nombre</th><th className="p-3">Teléfono</th><th className="p-3">Email</th><th className="p-3">Ventas</th><th className="p-3">Acciones</th></tr></thead><tbody>{clientes.map((c:any)=><tr key={c.id} className="border-t"><td className="p-3 font-medium">{c.nombre}</td><td className="p-3">{c.telefono}</td><td className="p-3">{c.email}</td><td className="p-3"><a href={`/api/clientes/${c.id}/delete`} className="text-red-600">Borrar</a></td></tr>)}</tbody></table></div>
    </div>
  )
}
