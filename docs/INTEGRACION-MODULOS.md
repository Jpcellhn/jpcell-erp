# Integración de módulos JPCELL

## Qué contiene esta integración

Los siete archivos recibidos son artefactos HTML compilados de React. Para conservar exactamente sus estilos, tipografías, colores y lógica visual, se sirven sin modificarlos desde `public/modules/`.

El proyecto Next.js agrega:

- `/modulos`: centro de navegación.
- `/modulos/admin`
- `/modulos/catalogos`
- `/modulos/erp-v2`
- `/modulos/operacion`
- `/modulos/finanzas`
- `/modulos/reportes-whatsapp`
- `/modulos/pos-pwa`

Cada ruta muestra el HTML original dentro de un marco de navegación del ERP. También se puede abrir el módulo completo en una pestaña nueva.

## Estado de datos

El proyecto base ya usa Prisma y PostgreSQL/Neon en `lib/db.ts` y en las rutas `app/api/`. Sin embargo, los siete HTML recibidos no contienen código fuente separado ni llamadas a `fetch`, Prisma, `localStorage` o una API común; son bundles autónomos con datos y estado interno de demostración.

Por esa razón, esta integración preserva los módulos tal como fueron entregados y conecta su navegación. Para que sus botones guarden y consulten los mismos productos, clientes, ventas, inventario y finanzas de Neon, se necesitan los archivos fuente React originales o autorización para modificar el JavaScript compilado e insertar los adaptadores de API. Hacerlo sin esa fuente obligaría a alterar la lógica interna que se solicitó conservar.

## Instalación

```bash
npm install
npm run build
npm run dev
```

Configura `DATABASE_URL` y `DIRECT_URL` en Vercel para activar las operaciones Prisma del núcleo existente.
