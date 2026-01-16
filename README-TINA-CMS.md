# 🎨 Tina CMS - Guía Completa para ACM Conecta

## ¿Qué es Tina CMS?

Tina CMS es un sistema de gestión de contenido moderno que permite **editar el contenido de tu sitio web de forma visual**, sin necesidad de tocar código. Es como un editor de documentos, pero para tu página web.

---

## 🚀 Inicio Rápido

### Opción 1: Desarrollo Local (Sin cuenta Tina Cloud)

#### Paso 1: Instalar dependencias
```bash
npm install
```

#### Paso 2: Iniciar el servidor de desarrollo
```bash
npm run dev
```

Esto iniciará:
- Tu sitio web en: `http://localhost:8080`
- Panel de admin Tina en: `http://localhost:8080/admin`

#### Paso 3: Acceder al CMS
1. Abre tu navegador
2. Ve a: `http://localhost:8080/admin/index.html`
3. ¡Ya puedes crear y editar historias!

---

## 📝 Cómo Crear Historias

### 1️⃣ Historia - Entrevista (Formato Q&A)

Perfecto para: Testimonios personales, entrevistas, historias de agricultores

**Pasos:**
1. Entra a `/admin/index.html`
2. Haz clic en **"Historias - Entrevista"** en el menú lateral
3. Clic en **"Create New"**
4. Completa los campos:

**Campos obligatorios:**
- **Nombre**: Nombre completo (ej: "Juan Ramírez")
- **Slug**: URL amigable (ej: "juan-ramirez") - solo minúsculas y guiones
- **Ubicación**: Ciudad/comuna (ej: "Linares")
- **Ocupación**: Profesión (ej: "Productor de Cerezos")
- **Descripción Corta**: 1-2 líneas para el carrusel
- **Imagen Principal**: Foto principal de la persona
- **Colores del Gradiente**: Elige el que mejor combine con tu foto
- **Introducción**: Párrafo introductorio de 2-3 líneas
- **Preguntas y Respuestas**:
  - Clic en **"Add interview"** para agregar cada pregunta
  - Mínimo 1, máximo 6 preguntas
- **Cita Destacada**: Una frase memorable
- **Imágenes Adicionales**: Mínimo 3, máximo 6 fotos

**Campos opcionales:**
- **Edad**: Edad de la persona

5. Haz clic en **"Save"** (arriba a la derecha)

---

### 2️⃣ Historia - Reportaje Extenso

Perfecto para: Artículos largos, reportajes, análisis profundos

**Pasos:**
1. Entra a `/admin/index.html`
2. Haz clic en **"Historias - Reportaje Extenso"**
3. Clic en **"Create New"**
4. Completa los campos:

**Campos obligatorios:**
- **Título**: Título del reportaje
- **Slug**: URL amigable
- **Subtítulo**: Descripción complementaria
- **Ubicación**: Lugar del reportaje
- **Descripción Corta**: Para el carrusel
- **Imagen Principal**: Foto principal
- **Colores del Gradiente**: Elige del menú
- **Fecha de Publicación**: Selecciona fecha y hora
- **Contenido del Reportaje**: Editor visual completo
  - Puedes usar negritas, cursivas, títulos, listas
  - Editor tipo Word/Google Docs

**Campos opcionales:**
- **Autor**: Nombre del autor
- **Cita Destacada**: Frase para resaltar
- **Imágenes del Reportaje**:
  - Agrega hasta 10 imágenes
  - Cada imagen puede tener pie de foto

5. Haz clic en **"Save"**

---

## 🎨 Guía de Colores

| Color | Mejor Para |
|-------|------------|
| 🟢 Verde Oscuro/Claro/Oliva | Agricultura, cultivos, naturaleza |
| 🟤 Marrón Tierra/Ocre/Terracota | Rural, tierra, tradición |
| 🔵 Azul Agua/Cielo/Oscuro | Agua, riego, canales |
| 🟡 Dorado/Naranja/Ámbar | Sol, cosecha, cereales |
| 🟣 Morado/Vino | Uvas, vino, frutales |
| ⚫ Gris Oscuro | Neutral, elegante |

---

## ✏️ Editar una Historia Existente

1. Ve a `/admin/index.html`
2. Encuentra la historia en la lista
3. Haz clic sobre ella
4. Modifica lo que necesites
5. Haz clic en **"Save"**

✅ Los cambios se guardan como un commit en Git

---

## 🗑️ Eliminar una Historia

1. Ve a `/admin/index.html`
2. Encuentra la historia
3. Haz clic en ella
4. Busca el botón **"Delete"** o ícono de papelera
5. Confirma la eliminación

⚠️ Esta acción no se puede deshacer

---

## 📸 Tips para Imágenes

### ✅ Buenas Prácticas:
- **Formato**: JPG o PNG
- **Peso**: Máximo 2 MB (idealmente menos de 1 MB)
- **Dimensiones**: Mínimo 1200px de ancho
- **Calidad**: Fotos nítidas, bien iluminadas
- **Nombres**: Descriptivos (ej: "juan-ramirez-cerezos.jpg")

### 🛠️ Herramientas para Optimizar:
- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app

---

## 🌐 Opción 2: Usar Tina Cloud (Recomendado para Producción)

### Ventajas de Tina Cloud:
- ✅ Editar contenido desde cualquier lugar (sin servidor local)
- ✅ Sincronización automática con GitHub
- ✅ Colaboración en equipo
- ✅ **Plan GRATIS** hasta 2 usuarios

### Configuración:

#### Paso 1: Crear cuenta en Tina Cloud
1. Ve a: https://app.tina.io/
2. Registrate con GitHub
3. Crea un nuevo proyecto

#### Paso 2: Conectar tu repositorio
1. En Tina Cloud, selecciona: **"fjsantel/ACM-CONECTA-web"**
2. Tina te dará un **Client ID** y **Token**

#### Paso 3: Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```bash
TINA_CLIENT_ID=tu-client-id-aqui
TINA_TOKEN=tu-token-aqui
```

#### Paso 4: Actualizar en GitHub
```bash
git add .
git commit -m "Configurar Tina Cloud"
git push
```

#### Paso 5: Acceder al CMS en producción
Ahora puedes acceder a:
- `https://tu-sitio.com/admin` - Panel de administración
- O directamente desde Tina Cloud Dashboard

---

## 🔄 Workflow de Trabajo

### Para el Cliente (Usuarios no técnicos):
```
1. Ir a: https://tu-sitio.com/admin (o http://localhost:8080/admin)
2. Login (si usas Tina Cloud)
3. Crear/editar historias usando el editor visual
4. Guardar cambios
5. Los cambios se ven inmediatamente en el sitio
```

### Para el Desarrollador:
```bash
# Trabajar localmente
npm run dev

# Hacer cambios en código
git add .
git commit -m "Cambios"
git push

# Deploy automático (si usas GitHub Pages, Vercel, etc.)
```

---

## 🆘 Solución de Problemas

### ❓ No puedo ver el panel de admin
**Solución:**
- Verifica que el servidor esté corriendo: `npm run dev`
- Accede a: `http://localhost:8080/admin/index.html`

### ❓ Error al guardar cambios
**Solución:**
- Si usas modo local: Los cambios se guardan en `content/`
- Si usas Tina Cloud: Verifica tus credenciales en `.env`

### ❓ Las imágenes no se suben
**Solución:**
- Verifica que la imagen sea menor a 2 MB
- Asegúrate de que sea JPG o PNG
- Intenta cambiar el nombre (sin espacios ni caracteres especiales)

### ❓ Mis cambios no aparecen en el sitio
**Solución:**
- En desarrollo local: Refresca con `Ctrl + F5` (Win) o `Cmd + Shift + R` (Mac)
- En producción: Espera 1-2 minutos para que se actualice

---

## 📊 Comparación: Modo Local vs Tina Cloud

| Característica | Modo Local | Tina Cloud |
|----------------|------------|------------|
| **Precio** | 🟢 Gratis | 🟢 Gratis (hasta 2 usuarios) |
| **Acceso** | Solo en tu computador | Desde cualquier lugar |
| **Requiere cuenta** | ❌ No | ✅ Sí |
| **Colaboración** | ❌ No | ✅ Sí |
| **Setup** | Más simple | Requiere configuración |
| **Para empezar** | 👍 Ideal | Para después |

---

## 🎯 Comandos Útiles

```bash
# Iniciar servidor de desarrollo (con CMS)
npm run dev

# Solo ver el sitio (sin CMS)
npm run serve

# Generar archivos de Tina CMS
npm run build
```

---

## 📚 Recursos

- **Tina CMS Docs**: https://tina.io/docs/
- **Tina Cloud**: https://app.tina.io/
- **GitHub Repo**: https://github.com/fjsantel/ACM-CONECTA-web

---

## ✨ ¡Listo para Usar!

Ya tienes todo configurado para:
- ✅ Crear historias tipo entrevista
- ✅ Crear reportajes extensos
- ✅ Editar contenido visualmente
- ✅ Subir y gestionar imágenes
- ✅ Todo sin tocar código

**¡Cuenta las historias del Maule de manera profesional!** 🚜💧
