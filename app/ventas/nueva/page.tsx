
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Prod = { id:string, nombre:string, precio:number, stock:number }

export default function NuevaVenta(){
  const router = useRouter()
  const [productos, setProductos] = useState<Prod[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [carrito, setCarrito] = useState<{productoId:string, nombre:string, precio:number, cantidad:number}[]>([])
  const [clienteId, setClienteId] = useState('')
  const [metodoPago, setMetodoPago] = useState('Efectivo')

  useEffect(()=>{
    fetch('/api/productos').then(r=>r.json()).then(d=>Array.isArray(d) && setProductos(d))
    fetch('/api/clientes').then(r=>r.json()).then(d=>Array.isArray(d) && setClientes(d))
  },[])

  const add = (p: Prod)=>{
    const ex = carrito.find(c=>c.productoId===p.id)
    if(ex){ setCarrito(carrito.map(c=>c.productoId===p.id?{...c, cantidad:c.cantidad+1}:c)) }
    else{ setCarrito([...carrito, {productoId:p.id, nombre:p.nombre, precio:p.precio, cantidad:1}]) }
  }
  const total = carrito.reduce((a,b)=>a+b.precio*b.cantidad,0)

  const vender = async ()=>{
    if(carrito.length===0) return alert('Carrito vacío')
    const res = await fetch('/api/ventas', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({clienteId: clienteId||null, metodoPago, items: carrito})})
    const data = await res.json()
    if(!res.ok) return alert(data.error)
    alert('Venta creada L '+total)
    router.push('/ventas')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-6">Nueva Venta</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold mb-2">Productos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-auto">
              {productos.map(p=><div key={p.id} className="border p-3 rounded-lg flex justify-between items-center"><div><p className="font-medium text-sm">{p.nombre}</p><p className="text-xs text-gray-500">L {p.precio} | Stock {p.stock}</p></div><button onClick={()=>add(p)} className="bg-black text-white px-3 py-1 rounded text-xs">+ Add</button></div>)}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold mb-3">Carrito ({carrito.length})</h3>
            <div className="space-y-2 mb-4">{carrito.map((c,i)=><div key={i} className="flex justify-between text-sm border-b py-1"><span>{c.nombre} x{c.cantidad}</span><span>L {c.precio*c.cantidad}</span></div>)}{carrito.length===0 && <p className="text-xs text-gray-400">Vacío</p>}</div>
            <div className="border-t pt-2 font-black text-lg flex justify-between"><span>Total</span><span>L {total}</span></div>
            <select value={clienteId} onChange={e=>setClienteId(e.target.value)} className="w-full mt-4 border rounded-lg p-2 text-sm"><option value="">Mostrador / Sin cliente</option>{clientes.map((c:any)=><option key={c.id} value={c.id}>{c.nombre}</option>)}</select>
            <select value={metodoPago} onChange={e=>setMetodoPago(e.target.value)} className="w-full mt-2 border rounded-lg p-2 text-sm"><option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option></select>
            <button onClick={vender} className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold">Cobrar L {total}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
