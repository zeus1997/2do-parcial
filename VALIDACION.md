# Validación de entrega

- OK: 41: cache persistida incluso vacía
- OK: 41: error conserva datos y avisa
- OK: 42: actualiza sin reemplazar favorita
- OK: 43: guardado de filtros y detalle
- OK: 43: task key restaurada
- OK: 44: descarga única por proceso
- OK: 44: bloqueo concurrente
- OK: 44: contador reactivo

Estas son comprobaciones estáticas del código, no pruebas de ejecución.

No se pudo ejecutar `npm ci --offline`: falta `yocto-queue` en caché. Por eso no se ejecutaron TypeScript, Gradle, el emulador ni las pruebas manuales del README.

Para completar la validación en un equipo con Internet: `npm ci`, `npm run typecheck`, `cd android && gradlew.bat assembleDebug`, y probar v1→v4, caída del servicio, cambio de favoritas durante descarga, rotación, `adb shell am kill ar.jornadas` y doble toque.
