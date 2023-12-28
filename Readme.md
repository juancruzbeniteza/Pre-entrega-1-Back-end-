# Desafio 3 Backend

Este proyecto corresponde al Desafío 3 del curso de Backend. Implementa un servidor de Express que utiliza métodos de la clase `EventManager` para gestionar eventos.

## Estructura del Proyecto

La estructura de carpetas y archivos es la siguiente:

```plaintext
Desafio 3 Backend/
│
├── server/
│   ├── data/
│   │   ├── Fs/
│   │   │   ├── files/
│   │   │   │   ├── events.fs.js
│   │   │   ├── memory/
│   │   │   │   ├── events.memory.js
│   │   ├── server.js
│   ├── ... (otros archivos relevantes)
├── ...

Instalación
Para instalar y configurar el proyecto, sigue los siguientes pasos:

bash
Copy code
# Clona el repositorio
git clone https://github.com/tu-usuario/desafio-3-backend.git

# Cambia al directorio del proyecto
cd desafio-3-backend

# Instala las dependencias
npm install
Uso
Para ejecutar el servidor:

bash
Copy code
# Inicia el servidor
node server/server.js
Endpoints
GET /api/events
Recupera todos los eventos.

Parámetros: Ninguno
Respuesta: { success: true, response: [/* array de eventos */] }
GET /api/events/:eid
Recupera un evento específico por su ID.

Parámetros: eid (ID del evento)
Respuesta: { success: true, response: /* objeto de evento */ }
GET /api/events/:name/:place
Crea un nuevo evento.

Parámetros: name (nombre del evento), place (lugar del evento)
Respuesta: { success: true, response: /* objeto de evento creado */ }
GET /api/events/sold/:eid/:quantity
Vende un ticket para un evento específico.

Parámetros: eid (ID del evento), quantity (cantidad de tickets vendidos)
Respuesta: { success: true, response: /* objeto de evento actualizado */ }
GET /api/events/destroy/:eid
Elimina un evento específico.

Parámetros: eid (ID del evento)
Respuesta: { success: true, message: "Evento eliminado" }
Contribuir
Si deseas contribuir al proyecto, sigue las pautas en CONTRIBUTING.md.

Licencia
Este proyecto está bajo la Licencia MIT.

sql
Copy code

Replace the placeholder text with your actual project details. If you have specific information about the endpoints or any other details, please include them in the respective sections.




