# Jornadas del Sur — Análisis y correcciones

## 41. Programa sin señal

El problema principal era que una falla de conexión podía impedir que se viera la información ya descargada. La solución mantiene las charlas en SQLite y muestra un aviso cuando se usan datos guardados. También se registra si hubo una descarga exitosa: una respuesta vacía de la versión 4 es válida y no debe confundirse con una instalación que nunca descargó el programa. En ese último caso se ofrece reintentar.

## 42. Agenda personal

El identificador de la charla se mantiene aunque cambien el título o la sala. Por eso, la actualización modifica los datos de las charlas existentes sin sobrescribir la columna `favorita`. Como el servidor envía el programa completo, las charlas que ya no figuran se eliminan de la base; si vuelven a aparecer, se insertan como nuevas y sin marcar. La escritura se hace dentro de una transacción para evitar estados intermedios.

## 43. Volver al punto de lectura

El día, el tema, la sección y la ficha abierta se guardan por tarea, usando la clave que entrega Android. Esto permite conservar los filtros al navegar y rotar, y recuperarlos si Android restaura la tarea después de terminar el proceso. Una tarea nueva utiliza una clave distinta y comienza sin filtros. Este caso requiere una prueba específica con `adb shell am kill` y regreso desde Recientes.

## 44. Control de descargas

La descarga automática se inicia una sola vez por proceso. Rotar, cambiar de pestaña o abrir una charla no deben volver a descargar. Si se solicita una actualización mientras hay otra en curso, se deja pendiente una única solicitud adicional, que comienza cuando termina la primera. El estado de carga permanece activo hasta finalizar ambas. Los filtros siguen disponibles durante la espera. El contador de Mesa registra los intentos, incluso cuando el servicio falla.

## Otros ajustes

Se agregó validación básica de la respuesta antes de guardarla, se corrigió el texto de programa vacío y se evitó volver a aplicar el arranque sin conexión cuando Android restaura una actividad.

## Alcance de la comprobación

Se revisaron el código fuente y los requisitos del README. No se ejecutó la compilación Android ni las pruebas con emulador en este entorno. En particular, la recuperación de tareas, la interacción entre marcas y sincronización, y la captura exacta de la configuración de Mesa al iniciar una petición necesitan una comprobación funcional. Por eso no se presenta esta entrega como 100 % verificada.
