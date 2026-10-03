'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type ModuleFrameProps = {
  title: string
  src: string
}

export default function ModuleFrame({ title, src }: ModuleFrameProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'jpcell:module-ready') setLoaded(true)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <section className="min-h-screen bg-slate-100">
      <header className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/modulos" className="shrink-0 rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-slate-50">
            ← Módulos
          </Link>
          <h1 className="truncate text-lg font-black text-slate-900">{title}</h1>
        </div>
        <a href={src} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          Abrir completo ↗
        </a>
      </header>

      {!loaded && (
        <div className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          Cargando módulo…
        </div>
      )}

      <iframe
        title={title}
        src={src}
        onLoad={() => setLoaded(true)}
        className="block h-[calc(100vh-4rem)] w-full border-0 bg-white"
      />
    </section>
  )
}
