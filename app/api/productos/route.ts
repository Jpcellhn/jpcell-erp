
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function GET(){ try{ const p = await prisma.producto.findMany({orderBy:{createdAt:'desc'}}); return NextResponse.json(p) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
export async function POST(req:Request){ try{ const d = await req.json(); const p = await prisma.producto.create({data:{nombre:d.nombre, sku:d.sku||null, precio:parseFloat(d.precio), costo:parseFloat(d.costo||'0'), stock:parseInt(d.stock), categoria:d.categoria}}); return NextResponse.json(p) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
