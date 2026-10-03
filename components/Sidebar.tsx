
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const links = [
  {href:'/', label:'🏠 Inicio'},
  {href:'/dashboard', label:'📊 Dashboard'},
  {href:'/productos', label:'📦 Productos'},
  {href:'/clientes', label:'👥 Clientes'},
  {href:'/ventas', label:'💰 Ventas'},
  {href:'/ventas/nueva', label:'🛒 Nueva Venta'},
  {href:'/inventario', label:'📋 Inventario'},
  {href:'/gastos', label:'💸 Gastos'},
  {href:'/reportes', label:'📈 Reportes'},
  {href:'/modulos', label:'🧩 Módulos integrados'},
]
export default function Sidebar(){
  const path = usePathname()
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 fixed">
      <h2 className="text-2xl font-black mb-8">JPCELL ERP</h2>
      <nav className="space-y-1">
        {links.map(l=>{
          const active = path===l.href || (l.href!=='/' && path.startsWith(l.href))
          return <Link key={l.href} href={l.href} className={`block px-3 py-2 rounded-lg text-sm ${active?'bg-white text-slate-900 font-bold':'hover:bg-slate-800'}`}>{l.label}</Link>
        })}
      </nav>
      <div className="mt-10 text-xs text-slate-400"><p>Neon</p><p className="font-mono">ep-small-breeze-b5jry210</p><p className="mt-4">v6.0 FINAL</p></div>
    </aside>
  )
}
