# Priora

<div align="center">

### Plataforma inteligente para la gestión de tareas asistida con IA (priorizacion de tareas sugerida con IA).

Aplicación web desarrollada con **Next.js**, **TypeScript** y **Supabase**, que permite la organización de tareas, la clasificarción por prioridad y la gestión del progreso personal mediante autenticación con Google.

**Deploy:** https://priora-ecru.vercel.app/

</div>

---

# Capturas (carpeta capturas)

- Landing
- Dashboard
- Mis tareas
- Perfil

---

# Funcionalidades

Inicio de sesión con Google
Persistencia de sesión
Gestión de tareas
- Crear
- Eliminar
- Cambiar estado
Organización por estados
- Pendiente
- En progreso
- Finalizada
Dashboard interactivo
- Métricas generales
- Consejos inteligentes
- Estadísticas
Perfil de usuario
- Información personal
- Nivel de productividad
- Logros
- Barra de progreso
- Métricas
Persistencia de datos mediante Supabase
Diseño responsive

---

# Tecnologías
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Supabase
- Google OAuth
- Vercel
- Lucide React
---

# Arquitectura

La aplicación sigue una arquitectura por capas:

- **app/**: páginas y rutas de Next.js.
- **components/**: componentes reutilizables de interfaz.
- **services/**: lógica de acceso a Supabase.
- **hooks/**: autenticación y estado de sesión.
- **lib/**: configuración de Supabase.
- **types/**: definición de tipos TypeScript.

Esta organización permite separar responsabilidades, facilitar el mantenimiento y escalar el proyecto.

---

# Uso de Inteligencia Artificial

Durante el desarrollo del proyecto utilicé herramientas de IA como **ChatGPT**, **Gemini** y **Claude** para acelerar el proceso de desarrollo y aprendizaje.

Las principales áreas donde me asistieron fueron:

- Comprensión e integración de Supabase, tecnología con la que no tenía experiencia previa.
- Resolución de problemas relacionados con Google OAuth y persistencia de sesiones.
- Generación de propuestas de arquitectura y organización del proyecto.
- Asistencia en la implementación de componentes de React y TypeScript.
- Resolución de errores específicos durante el desarrollo.
- Revisión y mejora de la interfaz de usuario.

En todos los casos utilicé la IA como un asistente de desarrollo, validando el código generado, adaptándolo a las necesidades del proyecto y realizando las pruebas necesarias para asegurar el correcto funcionamiento de la aplicación.

# Funcionalidad IA

Priora incorpora un sistema de sugerencias inteligentes que analiza la información de las tareas para recomendar prioridades y brindar consejos de productividad según el avance del usuario.

---

# Estructura

```
app/
components/
hooks/
lib/
services/
types/
public/
```
---

# Instalación

```bash
git clone https://github.com/moracicero/priora.git

cd priora

npm install

npm run dev
```
---

# Deploy

La aplicación se encuentra desplegada en:

https://priora-ecru.vercel.app/

---

# Autora

**Mora Abril Cicero**

Tecnicatura Universitaria en Desarrollo Web - Universidad Nacional de La Matanza

---

# Licencia
Proyecto desarrollado con fines educativos.