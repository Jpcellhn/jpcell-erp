
import { prisma } from '@/lib/db'
import ProductForm from '@/components/ProductForm'
export const dynamic='force-dynamic'
export default async function Editar({params}:{params:{id:string}}){
  const p = await prisma.producto.findUnique({where:{id:params.id}})
  if(!p) return <div className='p-8'>No encontrado</div>
  return <div className='p-8'><h1 className='text-3xl font-black mb-6'>Editar {p.nombre}</h1><ProductForm initial={p as any} isEdit/></div>
}
