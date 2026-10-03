
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export default async function Gastos(){
  let gastos:any[]=[]; try{ gastos = await prisma.gasto.findMany({orderBy:{createdAt:'desc'}}) }catch{}
  const total = gastos.reduce((a:any,b:any)=>a+b.monto,0)
  return <div className="p-8"><h1 className="text-3xl font-black mb-6">Gastos (L {total})</h1><form action="/api/gastos" method="post" className="bg-white p-4 rounded-xl shadow mb-6 flex gap-2"><input name="concepto" placeholder="Concepto" className="border p-2 rounded flex-1" required/><input name="monto" type="number" placeholder="Monto" className="border p-2 rounded w-32" required/><button className="bg-black text-white px-4 rounded">+ Agregar</button></form><div className="bg-white rounded-xl shadow"><table className="w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Fecha</th><th className="p-3">Concepto</th><th className="p-3">Monto</th></tr></thead><tbody>{gastos.map((g:any)=><tr key={g.id} className="border-t"><td className="p-3">{new Date(g.createdAt).toLocaleDateString()}</td><td className="p-3">{g.concepto}</td><td className="p-3">L {g.monto}</td></tr>)}</tbody></table></div></div>
}
