import { notFound } from 'next/navigation'
import ModuleFrame from '@/components/ModuleFrame'
import { getModule, modules } from '@/lib/modules'

export function generateStaticParams() {
  return modules.map((module) => ({ slug: module.slug }))
}

export default function ModuloPage({ params }: { params: { slug: string } }) {
  const module = getModule(params.slug)
  if (!module) notFound()

  return <ModuleFrame title={module.title} src={module.file} />
}
