
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function POST(req:Request){
  try{
    const { clienteId, metodoPago, items } = await req.json()
    if(!items || items.length===0) throw new Error('Carrito vacío')
    const total = items.reduce((a:any,b:any)=>a+b.precio*b.cantidad,0)
    const venta = await prisma.$transaction(async (tx)=>{
      const v = await tx.venta.create({data:{total, clienteId: clienteId||null, metodoPago: metodoPago||'Efectivo'}})
      for(const it of items){
        await tx.ventaItem.create({data:{ventaId:v.id, productoId:it.productoId, cantidad:it.cantidad, precio:it.precio}})
        await tx.producto.update({where:{id:it.productoId}, data:{stock:{decrement: it.cantidad}}})
      }
      return v
    })
    return NextResponse.json(venta)
  }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) }
}
