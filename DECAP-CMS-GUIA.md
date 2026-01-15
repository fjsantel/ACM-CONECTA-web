# 📝 Guía de Uso: Decap CMS para Historias ACM Conecta

## ¿Qué es Decap CMS?

Decap CMS es un sistema de gestión de contenido que te permite **editar las historias de tu sitio web sin tocar código**. Es como un editor de texto moderno donde puedes agregar, editar y eliminar historias de manera visual y sencilla.

---

## 🚀 Acceder al CMS

### Opción 1: En Desarrollo Local
1. Abre tu navegador
2. Ve a: `http://localhost:8080/admin` (o el puerto que estés usando)
3. Inicia sesión con tu cuenta de GitHub

### Opción 2: En Producción (GitHub Pages)
1. Ve a: `https://tu-usuario.github.io/tu-repositorio/admin`
2. Inicia sesión con tu cuenta de GitHub

---

## 📚 Tipos de Historias

Tu sitio web ahora soporta **DOS tipos de historias**:

### 1️⃣ **Historias - Entrevista** (Template Actual)
- ✅ Perfecto para: Testimonios, entrevistas, historias personales
- 📋 Formato: Preguntas y respuestas
- 🖼️ Incluye: Foto principal + galería de imágenes
- 💬 Tiene: Cita destacada

### 2️⃣ **Historias - Reportaje Extenso** (Template Nuevo)
- ✅ Perfecto para: Artículos largos, reportajes, análisis profundos
- 📋 Formato: Contenido libre tipo revista (con títulos, subtítulos, párrafos)
- 🖼️ Incluye: Múltiples imágenes con pies de foto
- 📅 Tiene: Fecha de publicación y autor

---

## ✍️ Cómo Crear una Historia - Entrevista

### Paso 1: Entrar al CMS
1. Ve a `/admin` en tu sitio
2. Haz clic en **"Historias - Entrevista"** en el menú

### Paso 2: Crear Nueva Historia
1. Clic en **"New Historias - Entrevista"**
2. Completa los campos:

#### 📝 Campos Obligatorios:
- **Nombre**: Nombre completo de la persona (ej: "Juan Ramírez")
- **Slug (URL)**: URL amigable (ej: "juan-ramirez") - solo minúsculas y guiones
- **Ubicación**: Ciudad o comuna (ej: "Linares")
- **Ocupación**: Profesión o actividad (ej: "Productor de Cerezos")
- **Descripción Corta**: 1-2 líneas para la tarjeta del carrusel
- **Imagen Principal**: Foto principal (sube desde tu computador)
- **Colores del Gradiente**: Elige un color del menú desplegable
- **Introducción**: Párrafo introductorio de 2-3 líneas
- **Preguntas y Respuestas**: Agrega al menos 1, máximo 6
  - Haz clic en **"Add interview"** para agregar cada pregunta
  - Escribe la pregunta y la respuesta
- **Cita Destacada**: Una frase memorable de la persona
- **Imágenes Adicionales**: Sube entre 3 y 6 fotos

#### 📝 Campos Opcionales:
- **Edad**: Edad de la persona (déjalo vacío si no aplica)

### Paso 3: Publicar
1. Haz clic en **"Save"** (arriba a la derecha)
2. Cambia el estado a **"Ready"**
3. Haz clic en **"Publish"**

✅ **¡Listo!** Tu historia aparecerá automáticamente en el carrusel del sitio.

---

## 📰 Cómo Crear un Reportaje Extenso

### Paso 1: Entrar al CMS
1. Ve a `/admin` en tu sitio
2. Haz clic en **"Historias - Reportaje Extenso"** en el menú

### Paso 2: Crear Nuevo Reportaje
1. Clic en **"New Historias - Reportaje Extenso"**
2. Completa los campos:

#### 📝 Campos Obligatorios:
- **Título**: Título del reportaje (ej: "El Futuro del Riego en el Maule")
- **Slug (URL)**: URL amigable (ej: "futuro-riego-maule")
- **Subtítulo**: Descripción complementaria
- **Ubicación**: Lugar del reportaje
- **Descripción Corta**: Para la tarjeta del carrusel
- **Imagen Principal**: Foto principal
- **Colores del Gradiente**: Elige del menú
- **Fecha de Publicación**: Selecciona fecha y hora
- **Contenido del Reportaje**: Escribe el artículo completo usando el editor

#### 🎨 Editor de Contenido:
El editor soporta formato Markdown:
- **Títulos**: `## Título Grande`, `### Título Mediano`
- **Negritas**: `**texto en negrita**`
- **Cursivas**: `*texto en cursiva*`
- **Listas**: `- Item 1`, `- Item 2`
- **Citas**: `> Texto citado`

#### 📝 Campos Opcionales:
- **Autor**: Nombre del autor del reportaje
- **Cita Destacada**: Frase para resaltar
- **Imágenes del Reportaje**: Agrega hasta 10 imágenes
  - Haz clic en **"Add articleImages"**
  - Sube la imagen
  - Agrega un pie de foto (opcional)

### Paso 3: Publicar
1. Haz clic en **"Save"**
2. Cambia el estado a **"Ready"**
3. Haz clic en **"Publish"**

✅ **¡Listo!** Tu reportaje aparecerá en el carrusel con un diseño tipo revista.

---

## 🎨 Guía de Colores del Gradiente

Elige el color que mejor combine con tu foto:

| Color | Sugerido Para |
|-------|---------------|
| 🟢 **Verde Oscuro / Verde Claro / Verde Oliva** | Agricultura, cultivos, naturaleza |
| 🟤 **Marrón Tierra / Ocre / Terracota** | Rural, tierra, tradición |
| 🔵 **Azul Agua / Azul Cielo / Azul Oscuro** | Agua, riego, canales |
| 🟡 **Dorado / Naranja / Ámbar** | Sol, cosecha, cereales |
| 🟣 **Morado / Vino** | Uvas, vino, frutales |
| ⚫ **Gris Oscuro** | Neutral, elegante |

**💡 Tip**: Abre la foto en tu computador, mira el color dominante, y elige el gradiente más parecido.

---

## ✏️ Cómo Editar una Historia Existente

1. Ve a `/admin`
2. Haz clic en **"Historias - Entrevista"** o **"Historias - Reportaje Extenso"**
3. Busca la historia que quieres editar
4. Haz clic sobre ella
5. Modifica los campos que necesites
6. Haz clic en **"Save"** y luego **"Publish"**

✅ Los cambios se verán reflejados inmediatamente en el sitio.

---

## 🗑️ Cómo Eliminar una Historia

1. Ve a `/admin`
2. Encuentra la historia que quieres eliminar
3. Haz clic en ella
4. Haz clic en **"Delete entry"** (arriba a la derecha)
5. Confirma la eliminación

⚠️ **Cuidado**: Esta acción no se puede deshacer.

---

## 📸 Tips para Subir Imágenes

### ✅ Buenas Prácticas:
- **Formato**: JPG o PNG
- **Peso**: Máximo 2 MB por imagen (idealmente menos de 1 MB)
- **Dimensiones**: Mínimo 1200px de ancho
- **Calidad**: Fotos nítidas, bien iluminadas
- **Nombres**: Usa nombres descriptivos (ej: "juan-ramirez-cerezos.jpg")

### 🛠️ Herramientas Recomendadas para Optimizar:
- **TinyPNG**: https://tinypng.com (comprime sin perder calidad)
- **Squoosh**: https://squoosh.app (Google, muy fácil de usar)

---

## 🔧 Solución de Problemas

### ❓ No puedo ver el botón "Publish"
- Asegúrate de hacer clic en **"Save"** primero
- Cambia el estado a **"Ready"**
- Actualiza la página

### ❓ Mis cambios no aparecen en el sitio
- GitHub Pages puede tardar 2-5 minutos en actualizar
- Refresca la página con `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac)

### ❓ Error al subir imágenes
- Verifica que la imagen sea menor a 2 MB
- Asegúrate de que sea formato JPG o PNG
- Intenta cambiarle el nombre a algo simple (sin caracteres especiales)

### ❓ El slug ya existe
- Cada historia debe tener un slug único
- Si ya existe "juan-ramirez", prueba con "juan-ramirez-talca" o "juan-ramirez-2025"

---

## 📞 Soporte

Si tienes dudas o problemas:
1. Revisa esta guía primero
2. Consulta los ejemplos en `/admin`
3. Contacta al equipo técnico

---

## 🎓 Recursos Adicionales

### Markdown Básico:
- [Guía de Markdown](https://www.markdownguide.org/basic-syntax/)
- [Cheatsheet de Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Decap CMS:
- [Documentación Oficial](https://decapcms.org/docs/intro/)

---

## ✨ ¡Manos a la Obra!

Ya estás listo para empezar a crear y gestionar historias. Recuerda:
- **Historias - Entrevista**: Para testimonios personales con Q&A
- **Historias - Reportaje Extenso**: Para artículos largos tipo revista

**¡Cuenta las historias del Maule de manera profesional y sin tocar código!** 🚜💧
