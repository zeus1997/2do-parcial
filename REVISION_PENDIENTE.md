# Aspectos a revisar antes de entregar

- El README describe Retrofit y una aplicación Android nativa, mientras este proyecto usa React Native y Axios. Confirmar que se permite esta variante.
- El nombre de paquete Android debe coincidir con `ar.jornadas` si se van a usar literalmente los comandos ADB del README; modificar el applicationId puede afectar la actualización de una instalación existente.
- La configuración de Mesa se lee mediante operaciones asíncronas. Verificar con una prueba de cambio rápido que cada solicitud utiliza los valores que correspondían al inicio.
- Verificar una marca realizada durante una sincronización larga y la recuperación de filtros después de matar el proceso.
- No se ejecutó `assembleDebug` en este entorno.
