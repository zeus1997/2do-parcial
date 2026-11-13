# Correcciones implementadas — Jornadas del Sur

## Pedido 41 · Programa sin señal
- La base guarda la existencia de una descarga válida, incluso si el programa descargado está vacío.
- Una falla conserva la instantánea local, la ficha abierta y las marcas, y muestra «Sin señal: usando datos guardados».
- Sin descarga previa, aparece la opción Reintentar. Una respuesta exitosa vacía reemplaza la edición anterior.

## Pedido 42 · Agenda personal
- La sincronización usa una transacción SQLite: inserta nuevas charlas, actualiza los campos de las existentes sin modificar `favorita`, elimina las retiradas y marca la descarga como válida.
- Las marcas se asocian al ID estable, no al título. Una charla eliminada pierde su marca si reaparece en otra edición.
- Las marcas cambiadas durante una petición se conservan porque la transacción de sincronización no sobrescribe `favorita`.

## Pedido 43 · Volver al punto de lectura
- Se conserva sección, ficha, día y tema en SQLite con una clave única de tarea Android (`taskKey`).
- Android mantiene la clave de tarea en `savedInstanceState`; una nueva tarea obtiene otra clave y arranca sin filtros.
- La pantalla ya no remonta el catálogo al girar ni reinicia el tema al entrar en la ficha.

## Pedido 44 · Control de descargas
- Una sola descarga automática por proceso JS; no se descarga al rotar, cambiar de pestaña, entrar a una ficha o regresar de segundo plano.
- `recargar` ignora nuevas peticiones mientras haya otra en curso. Al terminar (éxito o falla), permite otra.
- Los filtros se pueden modificar durante la carga y el catálogo guardado sigue visible.

## Archivos modificados
- `App.tsx`
- `src/data/archivo.ts`
- `src/ui/programaModel.ts`
- `src/ui/Catalogo.tsx`
- `android/app/src/main/java/ar/jornadasrn/MainActivity.kt`

## Verificación pendiente en entorno Android
No se pudo ejecutar `npm ci --offline` porque falta una dependencia en la caché. Por eso no se afirma que haya compilado ni que los casos se hayan probado en emulador. Para comprobarlo en Windows: `npm ci`, `npm run typecheck`, `cd android`, `gradlew.bat assembleDebug`.

Probar los escenarios de `README.md`, especialmente v1→v2→v3→v4, cambios de favoritas durante la demora de 8 segundos, rotación, recuperación de tarea y dos toques rápidos en Actualizar.


## Ajustes adicionales de revisión
- Contador de Mesa suscrito a cambios mediante `useSyncExternalStore`.
- Aviso de modo sin conexión visible también en detalle y Mi agenda.
- Escrituras de navegación serializadas para evitar pérdida de cambios rápidos.
- Resultado de comprobaciones y limitaciones en `VALIDACION.md`.
