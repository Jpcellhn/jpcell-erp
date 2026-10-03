
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function GET(){ try{ const c = await prisma.cliente.findMany({orderBy:{createdAt:'desc'}}); return NextResponse.json(c) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
export async function POST(req:Request){ try{ const d = await req.json(); const c = await prisma.cliente.create({data:{nombre:d.nombre, telefono:d.telefono, email:d.email, direccion:d.direccion}}); return NextResponse.json(c) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
