
import { prisma } from '@/lib/db'
import Link from 'next/link'
export const dynamic='force-dynamic'
export default async function Ventas(){
  let ventas:any[]=[]; try{ ventas = await prisma.venta.findMany({include:{cliente:true, items:{include:{producto:true}}}, orderBy:{createdAt:'desc'}, take:50}) }catch{}
  const total = ventas.reduce((a:any,b:any)=>a+b.total,0)
  return (
    <div className="p-8">
      <div className="flex justify-between mb-6"><h1 className="text-3xl font-black">Ventas ({ventas.length}) - L {total}</h1><Link href="/ventas/nueva" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-bold">+ Nueva Venta</Link></div>
      <div className="bg-white rounded-xl shadow overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Fecha</th><th className="p-3">Cliente</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Pago</th></tr></thead><tbody>{ventas.map((v:any)=><tr key={v.id} className="border-t"><td className="p-3">{new Date(v.createdAt).toLocaleDateString()}</td><td className="p-3">{v.cliente?.nombre||'Mostrador'}</td><td className="p-3">{v.items?.length||0} prod</td><td className="p-3 font-bold">L {v.total}</td><td className="p-3">{v.metodoPago}</td></tr>)}</tbody></table></div>
    </div>
  )
}
