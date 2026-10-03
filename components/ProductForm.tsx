
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
type Producto = { id?: string, nombre: string, sku: string, precio: number, stock: number, categoria: string, costo: number }
export default function ProductForm({ initial, isEdit=false }: { initial?: Producto, isEdit?: boolean }){
  const router = useRouter()
  const [form, setForm] = useState<Producto>(initial || { nombre:'', sku:'', precio:0, stock:0, categoria:'Celulares', costo:0 })
  const [loading, setLoading] = useState(false)
  const submit = async (e: React.FormEvent)=>{
    e.preventDefault(); setLoading(true)
    try{
      const url = isEdit ? `/api/productos/${initial?.id}` : '/api/productos'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if(!res.ok){ const err = await res.json(); throw new Error(err.error) }
      router.push('/productos'); router.refresh()
    }catch(err:any){ alert(err.message) } finally{ setLoading(false) }
  }
  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">
      <div><label className="text-sm font-bold">Nombre *</label><input required value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} className="w-full mt-1 border rounded-lg p-2" placeholder="iPhone 15"/></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm font-bold">SKU</label><input value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} className="w-full mt-1 border rounded-lg p-2"/></div>
        <div><label className="text-sm font-bold">Categoría</label><select value={form.categoria} onChange={e=>setForm({...form, categoria:e.target.value})} className="w-full mt-1 border rounded-lg p-2"><option>Celulares</option><option>Accesorios</option><option>Reparaciones</option><option>Otros</option></select></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className="text-sm font-bold">Precio L *</label><input required type="number" step="0.01" value={form.precio} onChange={e=>setForm({...form, precio:parseFloat(e.target.value)||0})} className="w-full mt-1 border rounded-lg p-2"/></div>
        <div><label className="text-sm font-bold">Costo L</label><input type="number" step="0.01" value={form.costo} onChange={e=>setForm({...form, costo:parseFloat(e.target.value)||0})} className="w-full mt-1 border rounded-lg p-2"/></div>
        <div><label className="text-sm font-bold">Stock *</label><input required type="number" value={form.stock} onChange={e=>setForm({...form, stock:parseInt(e.target.value)||0})} className="w-full mt-1 border rounded-lg p-2"/></div>
      </div>
      <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold">{loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear Producto')}</button>
    </form>
  )
}
