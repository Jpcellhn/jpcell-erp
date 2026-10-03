import Link from 'next/link'
import { modules } from '@/lib/modules'

export default function ModulosPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">JPCELL ERP</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Centro de módulos</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Accede a los siete módulos originales desde un solo proyecto.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.slug}
              href={`/modulos/${module.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-3xl" aria-hidden="true">{module.icon}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-700">
                  Abrir
                </span>
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-900">{module.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{module.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
