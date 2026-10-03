
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic='force-dynamic'
export async function GET(){
  try{
    await prisma.producto.createMany({data:[
      {nombre:'iPhone 13 128GB', sku:'IP13-128', precio:18500, stock:5, categoria:'Celulares'},
      {nombre:'Samsung A54', sku:'SAM-A54', precio:8500, stock:10, categoria:'Celulares'},
      {nombre:'Cargador Tipo C', sku:'CARG-C', precio:350, stock:50, categoria:'Accesorios'},
      {nombre:'Mica Vidrio Templado', sku:'MICA-001', precio:150, stock:100, categoria:'Accesorios'},
      {nombre:'Reparación Pantalla', sku:'REP-PANT', precio:1200, stock:999, categoria:'Reparaciones'},
    ], skipDuplicates:true})
    return NextResponse.json({ok:true, message:'Seed OK', next:'/productos'})
  }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) }
}
