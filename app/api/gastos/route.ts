
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function POST(req:NextRequest){
  const form = await req.formData()
  const concepto = form.get('concepto') as string
  const monto = parseFloat(form.get('monto') as string)
  try{ await prisma.gasto.create({data:{concepto, monto}}); return NextResponse.redirect(`${req.nextUrl.origin}/gastos`) }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) }
}
