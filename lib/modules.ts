export const modules = [
  {
    slug: 'admin',
    title: 'Administración',
    file: '/modules/admin.html',
    icon: '⚙️',
    description: 'Usuarios, roles, permisos, sucursales y configuración.',
  },
  {
    slug: 'catalogos',
    title: 'Catálogos',
    file: '/modules/catalogos.html',
    icon: '🗂️',
    description: 'Productos, clientes, proveedores, IMEI y catálogos.',
  },
  {
    slug: 'erp-v2',
    title: 'ERP V2',
    file: '/modules/erp-v2.html',
    icon: '📊',
    description: 'Dashboard central con POS, IA y WhatsApp.',
  },
  {
    slug: 'operacion',
    title: 'Operación',
    file: '/modules/operacion.html',
    icon: '🔧',
    description: 'Inventario, créditos, caja, traslados y operación diaria.',
  },
  {
    slug: 'finanzas',
    title: 'Finanzas',
    file: '/modules/finanzas.html',
    icon: '💰',
    description: 'Gastos, ingresos, sucursales y control financiero.',
  },
  {
    slug: 'reportes-whatsapp',
    title: 'Reportes + IA + WhatsApp',
    file: '/modules/reportes-whatsapp.html',
    icon: '📈',
    description: 'Informes, análisis, reportes y comunicación por WhatsApp.',
  },
  {
    slug: 'pos-pwa',
    title: 'POS PWA',
    file: '/modules/pos-pwa.html',
    icon: '🛒',
    description: 'Punto de venta optimizado para escritorio y móvil.',
  },
] as const

export type ModuleSlug = (typeof modules)[number]['slug']

export function getModule(slug: string) {
  return modules.find((module) => module.slug === slug)
}
