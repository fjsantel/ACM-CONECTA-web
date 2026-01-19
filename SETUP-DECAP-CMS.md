# 🎯 Guía: Finalizar configuración de Decap CMS

## Estado actual ✅

- ✅ Repositorio limpio creado: https://github.com/fjsantel/ACM-CONECTA
- ✅ Decap CMS instalado y configurado
- ✅ Workflow de GitHub Actions listo
- ✅ Código pusheado a GitHub

## Lo que falta (5 minutos) ⏱️

### Paso 1: Configurar OAuth de GitHub

1. **Ve a Netlify:** https://app.netlify.com/
   - Haz login o crea cuenta gratuita (solo necesitas email)
   - **NO necesitas crear un sitio**, solo la cuenta

2. **Configurar OAuth provider:**
   - Haz clic en tu avatar (arriba derecha)
   - **User settings** → **Applications** → **OAuth**
   - Haz clic en **"Install provider"** o **"New OAuth provider"**
   - Selecciona **"GitHub"**

3. **Crear OAuth App en GitHub:**
   - Netlify te redirigirá a GitHub
   - O ve manualmente a: https://github.com/settings/developers
   - **New OAuth App**
   
   Configuración:
   ```
   Application name: ACM Conecta CMS
   Homepage URL: https://fjsantel.github.io/ACM-CONECTA
   Authorization callback URL: https://api.netlify.com/auth/done
   ```
   
4. **Copiar credenciales:**
   - GitHub te dará:
     - **Client ID**: (cópialo)
     - **Client Secret**: (genéralo y cópialo)

5. **Pegar en Netlify:**
   - Vuelve a Netlify OAuth settings
   - Pega el Client ID y Client Secret
   - Guarda

### Paso 2: Habilitar GitHub Pages

1. Ve a: https://github.com/fjsantel/ACM-CONECTA/settings/pages
2. En **"Source"**, selecciona: **"GitHub Actions"**
3. Guarda (se guarda automáticamente)

### Paso 3: Esperar deploy

1. Ve a: https://github.com/fjsantel/ACM-CONECTA/actions
2. Espera que el workflow termine (~1 minuto)
3. Debería estar en verde ✅

### Paso 4: Probar el CMS

1. Ve a: **https://fjsantel.github.io/ACM-CONECTA/admin**
2. Haz clic en **"Login with GitHub"**
3. Autoriza la app
4. ¡Deberías ver el panel del CMS! 🎉

---

## Crear primera historia de prueba

1. En el CMS, haz clic en **"Historias - Entrevista"**
2. **"New Historias - Entrevista"**
3. Completa los campos:
   - Nombre: "Test Usuario"
   - Slug: "test-usuario"
   - Ubicación: "Talca"
   - Ocupación: "Agricultor"
   - Descripción: "Historia de prueba"
   - Sube una imagen
   - Elige un color de gradiente
   - Intro: "Esta es una historia de prueba"
   - Agrega 1 pregunta y respuesta
   - Quote: "Cita de prueba"
   - Sube 3 imágenes adicionales
4. **Save** → **Publish**

Los cambios se commitean automáticamente a GitHub y el sitio se actualiza.

---

## Estructura del proyecto

```
/ACM-CONECTA
├── admin/
│   ├── index.html          # Panel de Decap CMS
│   └── config.yml          # Configuración del CMS
├── content/
│   ├── historias/          # Historias tipo entrevista (MD)
│   └── reportajes/         # Reportajes extensos (MD)
├── fotos/                  # Imágenes
├── videos/                 # Videos
├── assets/                 # Recursos (logos, etc)
├── index.html              # Página principal
├── historia-template.html  # Template para historias
├── reportaje-template.html # Template para reportajes
└── historias-loader.js     # Carga historias desde MD

```

---

## Agregar dominio .cl con Cloudflare (cuando quieras)

### En Cloudflare:

1. Ve a: https://dash.cloudflare.com
2. **"Add a site"** → Ingresa: `tudominio.cl`
3. Plan **Free**
4. Configurar DNS:
   ```
   Tipo   | Nombre | Contenido              | Proxy
   -------|--------|------------------------|-------
   CNAME  | www    | fjsantel.github.io     | ✅ Proxied
   CNAME  | @      | fjsantel.github.io     | ✅ Proxied
   ```
5. Anota los nameservers de Cloudflare

### En NIC Chile:

1. Ve a: https://www.nic.cl
2. **"Mis dominios"** → Selecciona tu dominio
3. **"DNS"** → **"DNS personalizados"**
4. Ingresa los nameservers de Cloudflare
5. Guarda

⏱️ Propagación: 1-48 horas (usualmente 1-2 horas)

### En GitHub:

1. Ve a: https://github.com/fjsantel/ACM-CONECTA/settings/pages
2. **"Custom domain"** → Ingresa: `tudominio.cl`
3. **Save**
4. Marca **"Enforce HTTPS"**

✅ Tu sitio estará en: `https://tudominio.cl`
✅ CMS estará en: `https://tudominio.cl/admin`

---

## Ventajas de este setup

| Característica | Estado |
|----------------|--------|
| Hosting | 🟢 Gratis (GitHub Pages) |
| CMS | 🟢 Gratis (Decap CMS) |
| CDN | 🟢 Gratis (Cloudflare) |
| SSL | 🟢 Gratis (automático) |
| Build | ✅ No necesario |
| Deploy | ✅ Automático con git push |
| Login | ✅ Con cuenta de GitHub |

---

## Tu flujo de trabajo

### Para ti (desarrollador):
```bash
# Editar código en VS Code
git add .
git commit -m "Cambios"
git push

# GitHub Actions despliega automáticamente en ~1 minuto
```

### Para tu cliente:
```
1. Ir a: https://fjsantel.github.io/ACM-CONECTA/admin
2. Login con GitHub
3. Crear/editar historias
4. Save → Publish
5. Los cambios aparecen en el sitio en ~1 minuto
```

---

## Agregar más usuarios editores

### Opción A: Colaboradores del repo (recomendado)
1. Ve a: https://github.com/fjsantel/ACM-CONECTA/settings/access
2. **"Add people"**
3. Ingresa su usuario de GitHub
4. Rol: **Write** (pueden editar, no borrar el repo)

### Opción B: Solo lectura de repo + permisos de commit
El usuario solo necesita:
- Cuenta de GitHub
- Permisos de **Write** en el repo

---

## Troubleshooting

### ❓ No puedo hacer login en /admin
**Solución:**
- Verifica que el OAuth esté configurado en Netlify
- URL de callback debe ser: `https://api.netlify.com/auth/done`
- Homepage URL debe ser: `https://fjsantel.github.io/ACM-CONECTA`

### ❓ Mis cambios no aparecen
**Solución:**
- Espera 1-2 minutos (GitHub Actions tarda en desplegar)
- Refresca con `Ctrl + Shift + R` (Win) o `Cmd + Shift + R` (Mac)
- Verifica que el workflow esté en verde en Actions

### ❓ Error al subir imágenes
**Solución:**
- Verifica que la imagen sea menor a 5 MB
- Formato: JPG, PNG o GIF
- Nombre sin caracteres especiales

---

## Recursos

- **Decap CMS Docs**: https://decapcms.org/docs/intro/
- **Tu repositorio**: https://github.com/fjsantel/ACM-CONECTA
- **Tu sitio**: https://fjsantel.github.io/ACM-CONECTA
- **CMS**: https://fjsantel.github.io/ACM-CONECTA/admin

---

## Resumen de lo que conseguimos

✅ **Sitio estático rápido y liviano**  
✅ **CMS visual fácil de usar**  
✅ **Deploy automático con GitHub**  
✅ **Sin servicios externos problemáticos**  
✅ **100% gratis**  
✅ **Sin bugs de indexación**  
✅ **Todo funciona a la primera**

**¡Mañana en 5 minutos lo tienes funcionando!** 🚀

---

*Última actualización: 15 Enero 2026 - 23:30*
