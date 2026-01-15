# 🚀 Deploy Completo: GitHub → Netlify → Cloudflare → .cl

## 📋 Pre-requisitos

- [x] Código en GitHub (✅ ya tienes: fjsantel/ACM-CONECTA-web)
- [ ] Cuenta en Netlify (gratis)
- [ ] Cuenta en Cloudflare (gratis)
- [ ] Dominio .cl comprado en NIC Chile

---

## 🎯 FASE 1: Deploy en Netlify (10 minutos)

### Paso 1.1: Crear cuenta en Netlify

1. Ve a: **https://app.netlify.com/signup**
2. Haz clic en **"Sign up with GitHub"**
3. Autoriza Netlify para acceder a tus repos

### Paso 1.2: Importar tu repositorio

1. En Netlify, haz clic en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Elige **"Deploy with GitHub"**
4. Busca y selecciona: **`ACM-CONECTA-web`**
5. Configuración de build:
   ```
   Branch to deploy: main
   Build command: (dejar vacío)
   Publish directory: /
   ```
6. Haz clic en **"Deploy site"**
7. ⏱️ Espera 1-2 minutos

✅ **Resultado**: Tu sitio estará en `https://random-name-123.netlify.app`

### Paso 1.3: Cambiar nombre del sitio (opcional)

1. En Netlify, ve a **Site settings**
2. Haz clic en **"Change site name"**
3. Cambia a algo memorable: `acm-conecta`
4. Tu sitio ahora será: `https://acm-conecta.netlify.app`

---

## 🔐 FASE 2: Configurar Netlify Identity (para CMS) - 5 minutos

### Paso 2.1: Habilitar Identity

1. En tu sitio de Netlify, ve a **"Identity"** (menú izquierdo)
2. Haz clic en **"Enable Identity"**
3. ⏱️ Espera 30 segundos

### Paso 2.2: Configurar Registration

1. En Identity, haz clic en **"Settings and usage"**
2. Busca **"Registration preferences"**
3. Selecciona **"Invite only"** (para seguridad)
4. Guarda

### Paso 2.3: Habilitar Git Gateway

1. Desplázate a **"Services"**
2. Busca **"Git Gateway"**
3. Haz clic en **"Enable Git Gateway"**
4. Se conectará automáticamente con tu repo de GitHub

### Paso 2.4: Invitarte como usuario

1. Ve a la pestaña **"Identity"** (principal)
2. Haz clic en **"Invite users"**
3. Ingresa tu email: `tu-email@gmail.com`
4. Haz clic en **"Send"**

### Paso 2.5: Aceptar invitación

1. ✉️ Revisa tu email
2. Haz clic en el link de invitación
3. Crea una **contraseña segura**
4. ✅ Confirma

---

## ✅ FASE 3: Probar el CMS (2 minutos)

### Paso 3.1: Acceder al CMS

1. Abre tu navegador
2. Ve a: **`https://acm-conecta.netlify.app/admin`**
3. Ingresa tu email y contraseña
4. ✅ Deberías ver el panel del CMS

### Paso 3.2: Crear historia de prueba

1. Haz clic en **"Historias - Entrevista"**
2. Clic en **"New Historias - Entrevista"**
3. Completa los campos básicos:
   - Nombre: "Test Usuario"
   - Ubicación: "Santiago"
   - Slug: "test-usuario"
   - Descripción: "Historia de prueba"
   - Sube una imagen de prueba
   - Ocupación: "Agricultor"
   - Intro: "Esta es una prueba"
   - Agrega 1 pregunta y respuesta
   - Quote: "Cita de prueba"
   - Sube 3 imágenes para la galería
4. Haz clic en **"Save"** (arriba derecha)
5. Workflow: **Draft** → **In review** → **Ready**
6. Haz clic en **"Publish"**

### Paso 3.3: Verificar en el sitio

1. Ve a: `https://acm-conecta.netlify.app`
2. Scroll hasta **"Las voces del Maule"**
3. ✅ Deberías ver tu historia de prueba en el carrusel

⏱️ Si no aparece, espera 1-2 minutos y refresca con `Ctrl + Shift + R`

---

## 🌐 FASE 4: Conectar con Cloudflare (15 minutos)

### Paso 4.1: Agregar sitio a Cloudflare

1. Ve a: **https://dash.cloudflare.com**
2. Haz clic en **"Add a site"**
3. Ingresa: `tudominio.cl` (tu dominio real de NIC Chile)
4. Selecciona el plan **Free**
5. Haz clic en **"Continue"**

### Paso 4.2: Configurar DNS en Cloudflare

Cloudflare escaneará tus DNS actuales. Ahora agrega/edita:

```
Tipo   | Nombre | Contenido                    | Proxy
-------|--------|------------------------------|-------
CNAME  | www    | acm-conecta.netlify.app     | ✅ Proxied
CNAME  | @      | acm-conecta.netlify.app     | ✅ Proxied
```

**Elimina cualquier registro A o AAAA antiguo que apunte a otro servidor.**

### Paso 4.3: Anotar nameservers de Cloudflare

Cloudflare te mostrará algo como:

```
alexa.ns.cloudflare.com
reza.ns.cloudflare.com
```

**📋 ANOTA ESTOS NAMESERVERS** - Los necesitarás en el siguiente paso.

---

## 🇨🇱 FASE 5: Actualizar NIC Chile (5 minutos)

### Paso 5.1: Ir a NIC Chile

1. Ve a: **https://www.nic.cl**
2. Inicia sesión con tu cuenta
3. Ve a **"Mis dominios"**
4. Selecciona tu dominio `.cl`

### Paso 5.2: Cambiar nameservers

1. Busca la opción **"DNS"** o **"Nameservers"**
2. Cambia de **"DNS de NIC"** a **"DNS personalizados"**
3. Ingresa los nameservers de Cloudflare:
   ```
   Nameserver 1: alexa.ns.cloudflare.com
   Nameserver 2: reza.ns.cloudflare.com
   ```
4. Guarda los cambios

⏱️ **Propagación**: 1-48 horas (usualmente 1-2 horas)

---

## 🔗 FASE 6: Configurar dominio en Netlify (5 minutos)

### Paso 6.1: Agregar dominio custom en Netlify

1. En Netlify, ve a **Site settings**
2. Haz clic en **"Domain management"**
3. En "Custom domains", haz clic en **"Add custom domain"**
4. Ingresa: `tudominio.cl`
5. Haz clic en **"Verify"**
6. Si Netlify pregunta si ya eres dueño, confirma **"Yes, add domain"**

### Paso 6.2: Agregar www

1. En la misma sección, haz clic en **"Add domain alias"**
2. Ingresa: `www.tudominio.cl`
3. Verifica

### Paso 6.3: Configurar SSL

1. En "HTTPS", Netlify detectará automáticamente tu dominio
2. Haz clic en **"Verify DNS configuration"**
3. ⏱️ Espera 1-2 minutos
4. Netlify emitirá un certificado SSL automáticamente
5. Habilita **"Force HTTPS"** (ON)

✅ **SSL configurado**

---

## ✅ FASE 7: Verificación Final (5 minutos)

### Checklist de verificación:

```
⏱️ Espera que los DNS se propaguen (1-48 hrs, usualmente 1-2 hrs)
```

Luego verifica:

- [ ] **Sitio principal**: `https://tudominio.cl` → Muestra el sitio ✅
- [ ] **Con www**: `https://www.tudominio.cl` → Muestra el sitio ✅
- [ ] **SSL**: Candado verde en el navegador ✅
- [ ] **CMS**: `https://tudominio.cl/admin` → Panel de login ✅
- [ ] **Login CMS**: Puedes entrar con tu email/contraseña ✅
- [ ] **Crear historia**: Funciona y aparece en el sitio ✅
- [ ] **GitHub**: Los cambios del CMS crean commits ✅

---

## 🎯 Resultado Final

```
┌─────────────────────────────────────┐
│   https://tudominio.cl              │ ← SITIO PÚBLICO
│   https://tudominio.cl/admin        │ ← CMS (cliente)
└─────────────────────────────────────┘
                  ↑
            [Cloudflare CDN]
                  ↑
            [Netlify Hosting]
                  ↑
          [GitHub - tu código]
```

---

## 🔄 Workflow Final

### Para ti (desarrollador):

```bash
# Editar código localmente
git add .
git commit -m "Cambios"
git push origin main

# Netlify detecta el push y despliega automáticamente
# Cambios en tudominio.cl en 1-2 minutos
```

### Para el cliente:

```
1. Ir a: https://tudominio.cl/admin
2. Login con email/contraseña
3. Crear/editar historias
4. Save → Publish
5. Ver cambios en tudominio.cl en 1-2 minutos
```

---

## 🆘 Troubleshooting

### ❓ El dominio no carga después de 48 horas

**Verifica:**
```bash
# En terminal, verifica los nameservers
dig tudominio.cl NS
```

Deben mostrar los nameservers de Cloudflare. Si no:
- Revisa NIC Chile que los nameservers estén correctos
- Espera más tiempo (puede tardar hasta 48hrs)

### ❓ SSL no funciona

En Netlify:
1. Domain settings → HTTPS
2. "Renew certificate"
3. Espera 1-2 minutos

### ❓ El CMS no guarda cambios

1. Verifica que Git Gateway esté habilitado en Netlify
2. Verifica que tengas permisos en el repo de GitHub
3. Revisa la consola del navegador (F12) para errores

### ❓ Las historias nuevas no aparecen

1. Espera 1-2 minutos (Netlify tarda en desplegar)
2. Refresca con `Ctrl + Shift + R`
3. Verifica en GitHub que se haya creado el commit

---

## 📞 Contactos de Soporte

- **Netlify**: https://answers.netlify.com/
- **Cloudflare**: https://community.cloudflare.com/
- **NIC Chile**: soporte@nic.cl

---

## 🎉 ¡Listo!

Tu sitio ahora está:
- ✅ Online en tu dominio .cl
- ✅ Con CMS funcional
- ✅ Con SSL (HTTPS)
- ✅ Con CDN de Cloudflare
- ✅ Deploy automático desde GitHub

**Total de tiempo: ~45 minutos**
**Costo adicional: $0** (todo gratis excepto el dominio .cl que ya tienes)
