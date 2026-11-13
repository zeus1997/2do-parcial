# Resolución del parcial — Jornadas del Sur

Se entrega el proyecto React Native/Android con cambios para los requisitos 41–44 del README.

- **41:** persistencia de instantáneas completas, incluso la edición vacía; al fallar la red, mantiene el catálogo y avisa si existe una edición descargada.
- **42:** sincronización por ID, conserva favoritos de charlas vigentes, elimina charlas retiradas, y al reingresar una charla previamente eliminada queda sin marcar.
- **43:** navegación (filtros, sección y ficha) guardada por clave de tarea provista desde Android y recuperada tras recreación de actividad; una clave nueva inicia sin filtros.
- **44:** bloqueo de solicitudes simultáneas, una descarga automática por proceso y contador observable de solicitudes.

## Corrección adicional

Se alineó el `applicationId`, namespace y paquete de las clases Android con `ar.jornadas`, tal como indican los comandos ADB del README. Se distingue programa global vacío de resultados vacíos por filtros.

## Verificación

La revisión de código y estructura **no equivale** a ejecución funcional. En este entorno no se completaron `npm ci`, `npm run typecheck`, compilación Android ni pruebas en emulador. Para verificar la entrega, ejecutar `npm ci`, `npm run typecheck`, `cd android && gradlew.bat assembleDebug`, y luego los escenarios 41–44 del README. No se garantiza compilación hasta ejecutarlos.
