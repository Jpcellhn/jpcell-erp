
import './globals.css'
import Sidebar from '@/components/Sidebar'
export const metadata = { title: 'JPCELL ERP - Sistema Completo' }
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="es"><body className="flex min-h-screen"><Sidebar/><main className="flex-1 bg-slate-50 ml-64">{children}</main></body></html>
}
