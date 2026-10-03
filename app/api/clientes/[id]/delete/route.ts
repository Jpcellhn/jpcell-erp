
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function GET(req:NextRequest, {params}:{params:{id:string}}){ try{ await prisma.cliente.delete({where:{id:params.id}}); return NextResponse.redirect(`${req.nextUrl.origin}/clientes`) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) } }
