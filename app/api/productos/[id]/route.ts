
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function PUT(req:Request, {params}:{params:{id:string}}){ try{ const d = await req.json(); const p = await prisma.producto.update({where:{id:params.id}, data:{nombre:d.nombre, sku:d.sku, precio:parseFloat(d.precio), costo:parseFloat(d.costo||'0'), stock:parseInt(d.stock), categoria:d.categoria}}); return NextResponse.json(p) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
export async function DELETE(req:Request, {params}:{params:{id:string}}){ try{ await prisma.producto.delete({where:{id:params.id}}); return NextResponse.json({ok:true}) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
