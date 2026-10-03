
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
type Cliente = { id?: string, nombre: string, telefono: string, email: string, direccion: string }
export default function ClientForm({ initial, isEdit=false }: { initial?: Cliente, isEdit?: boolean }){
  const router = useRouter()
  const [form, setForm] = useState<Cliente>(initial || { nombre:'', telefono:'', email:'', direccion:'' })
  const [loading, setLoading] = useState(false)
  const submit = async (e: React.FormEvent)=>{
    e.preventDefault(); setLoading(true)
    try{
      const url = isEdit ? `/api/clientes/${initial?.id}` : '/api/clientes'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if(!res.ok) throw new Error('Error')
      router.push('/clientes'); router.refresh()
    }catch(err:any){ alert(err.message) } finally{ setLoading(false) }
  }
  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">
      <div><label className="text-sm font-bold">Nombre *</label><input required value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} className="w-full border rounded-lg p-2 mt-1"/></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm font-bold">Teléfono</label><input value={form.telefono} onChange={e=>setForm({...form, telefono:e.target.value})} className="w-full border rounded-lg p-2 mt-1"/></div>
        <div><label className="text-sm font-bold">Email</label><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border rounded-lg p-2 mt-1"/></div>
      </div>
      <div><label className="text-sm font-bold">Dirección</label><input value={form.direccion} onChange={e=>setForm({...form, direccion:e.target.value})} className="w-full border rounded-lg p-2 mt-1"/></div>
      <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold">{isEdit ? 'Actualizar' : 'Crear Cliente'}</button>
    </form>
  )
}
