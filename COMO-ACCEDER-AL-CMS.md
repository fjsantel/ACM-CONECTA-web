# 🚀 Cómo Acceder al CMS - Guía Rápida

## ⚠️ PASO PREVIO OBLIGATORIO

**Antes de usar el CMS, debes configurar la autenticación OAuth.**

### 👉 Sigue las instrucciones en: [CONFIGURAR-OAUTH-GITHUB.md](CONFIGURAR-OAUTH-GITHUB.md)

**Recomendación**: Usa **Netlify** (Opción 1 del documento) - Es la forma más simple y solo toma 5 minutos.

---

## 📍 URLs del CMS

### Si usas Netlify (Recomendado):
```
https://tu-sitio.netlify.app/admin
```

### Si usas GitHub Pages + OAuth manual:
```
https://fjsantel.github.io/ACM-CONECTA-web/admin
```

---

## 🔐 Primer Acceso (Después de Configurar OAuth)

### Con Netlify Identity:
1. Ve a: `https://tu-sitio.netlify.app/admin`
2. Ingresa tu **email** y **contraseña** (la que creaste en Netlify Identity)
3. ¡Listo!

### Con GitHub OAuth:
1. Ve a: `https://fjsantel.github.io/ACM-CONECTA-web/admin`
2. Haz clic en **"Login with GitHub"**
3. Autoriza la aplicación
4. ¡Listo!

Verás el panel con dos colecciones:
- **Historias - Entrevista** (formato Q&A)
- **Historias - Reportaje Extenso** (formato revista)

---

## ✏️ Crear tu Primera Historia

### Opción 1: Historia Entrevista
1. En el panel, haz clic en **"Historias - Entrevista"**
2. Clic en **"New Historias - Entrevista"**
3. Llena los campos:
   - Nombre de la persona
   - Ubicación
   - Sube una foto
   - Agrega preguntas y respuestas
4. Clic en **"Save"** (arriba a la derecha)
5. Cambia el estado a **"Ready"**
6. Clic en **"Publish"**

### Opción 2: Reportaje Extenso
1. En el panel, haz clic en **"Historias - Reportaje Extenso"**
2. Clic en **"New Historias - Reportaje Extenso"**
3. Llena los campos:
   - Título del reportaje
   - Subtítulo
   - Escribe el contenido usando el editor Markdown
   - Agrega imágenes
4. Clic en **"Save"**
5. Cambia el estado a **"Ready"**
6. Clic en **"Publish"**

---

## 🔄 ¿Cuándo Aparecen los Cambios?

Después de publicar:
1. GitHub procesa el cambio (1-2 minutos)
2. GitHub Pages/Netlify se actualiza (2-5 minutos)
3. **Total: 3-7 minutos** aproximadamente

💡 **Tip**: Refresca la página con `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac) para ver los cambios.

---

## 🆘 Solución Rápida de Problemas

### ❓ Error "Site not found" al hacer login
- **Causa**: OAuth no está configurado correctamente
- **Solución**: Sigue la guía [CONFIGURAR-OAUTH-GITHUB.md](CONFIGURAR-OAUTH-GITHUB.md)
- **Opción fácil**: Usa Netlify Identity

### ❓ No puedo ver el botón de login
- Verifica que estés en la URL correcta: `/admin` al final
- Limpia la caché del navegador
- Prueba en modo incógnito

### ❓ Error de autenticación
- Verifica que OAuth esté configurado
- Asegúrate de estar logueado en GitHub
- Con Netlify: verifica tu email y contraseña

### ❓ No veo mis cambios en el sitio
- Espera 5-7 minutos después de publicar
- Refresca con `Ctrl + F5` o `Cmd + Shift + R`
- Verifica en GitHub que el commit se haya creado

---

## 📚 Documentación Completa

- **[CONFIGURAR-OAUTH-GITHUB.md](CONFIGURAR-OAUTH-GITHUB.md)** - ⚡ EMPIEZA AQUÍ
- **[DECAP-CMS-GUIA.md](DECAP-CMS-GUIA.md)** - Guía completa de uso
- **[DECAP-CMS-SETUP.md](DECAP-CMS-SETUP.md)** - Guía técnica

---

## 🎯 Checklist

1. ⬜ Configurar OAuth (ver CONFIGURAR-OAUTH-GITHUB.md)
2. ⬜ Acceder a /admin
3. ⬜ Hacer login exitosamente
4. ⬜ Crear historia de prueba
5. ⬜ Publicar y esperar 5-7 minutos
6. ⬜ Ver historia en el sitio web

**¡Cuando completes todos los pasos, el CMS está listo!** 🎉
