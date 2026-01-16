# 🚀 Guía: Deploy GitHub Pages + Tina CMS + Cloudflare

## Tu flujo de trabajo: VS Code → GitHub → GitHub Pages → Cloudflare

---

## 📋 FASE 1: Configurar Tina Cloud (5 minutos)

### Paso 1.1: Crear cuenta en Tina Cloud

1. Ve a: **https://app.tina.io/**
2. Haz clic en **"Sign up with GitHub"**
3. Autoriza Tina.io a acceder a tus repositorios

### Paso 1.2: Crear nuevo proyecto

1. En el dashboard de Tina, haz clic en **"Add Project"**
2. Selecciona el repositorio: **`fjsantel/ACM-CONECTA-web`**
3. Tina detectará automáticamente tu configuración
4. Haz clic en **"Continue"**

### Paso 1.3: Obtener credenciales

Tina te mostrará dos valores importantes:

```
Client ID: xxxxxxxxxxxxxxxxxxxxxxxx
Read-Only Token: xxxxxxxxxxxxxxxxxxxxxxxx
```

**📋 COPIA ESTOS VALORES** - Los necesitarás en el siguiente paso.

---

## 🔐 FASE 2: Configurar Secrets en GitHub (3 minutos)

### Paso 2.1: Ir a Settings del repositorio

1. Ve a: **https://github.com/fjsantel/ACM-CONECTA-web**
2. Haz clic en **"Settings"** (arriba)
3. En el menú lateral, busca **"Secrets and variables"**
4. Haz clic en **"Actions"**

### Paso 2.2: Agregar secrets

Haz clic en **"New repository secret"** dos veces para agregar:

**Secret 1:**
- Name: `TINA_CLIENT_ID`
- Secret: `[pega el Client ID de Tina Cloud]`

**Secret 2:**
- Name: `TINA_TOKEN`
- Secret: `[pega el Read-Only Token de Tina Cloud]`

✅ Guarda ambos secrets

---

## 📄 FASE 3: Habilitar GitHub Pages (2 minutos)

### Paso 3.1: Configurar Pages

1. En tu repo, ve a **"Settings"**
2. En el menú lateral, haz clic en **"Pages"**
3. En **"Source"**, selecciona:
   - **GitHub Actions** (no "Deploy from a branch")
4. Guarda

✅ GitHub Pages está listo

---

## 💻 FASE 4: Tu flujo de trabajo diario (VS Code → GitHub)

### Desde VS Code:

#### 1. Hacer cambios en el código
```bash
# Editar archivos en VS Code
# Guardar cambios
```

#### 2. Commit y push a GitHub
```bash
git add .
git commit -m "Descripción de tus cambios"
git push origin main
```

#### 3. GitHub Actions se ejecuta automáticamente
- Se instalan dependencias
- Se genera el admin de Tina CMS
- Se despliega a GitHub Pages
- ⏱️ Tarda ~2-3 minutos

#### 4. Ver tu sitio en vivo
Tu sitio estará en: **https://fjsantel.github.io/ACM-CONECTA-web/**

---

## ✍️ FASE 5: Usar el CMS en producción

### Para ti y tu cliente:

1. Ve a: **https://fjsantel.github.io/ACM-CONECTA-web/admin**
2. Haz clic en **"Login with Tina Cloud"**
3. Autoriza con GitHub
4. ¡Ya puedes crear y editar historias!

### Cuando guardas una historia:
1. Tina Cloud crea un commit en GitHub
2. GitHub Actions detecta el commit
3. Despliega automáticamente
4. Los cambios aparecen en el sitio en ~2-3 minutos

✅ **No necesitas VS Code para editar contenido, solo para cambios de código**

---

## 🌐 FASE 6: Agregar dominio .cl con Cloudflare (15 minutos)

### Paso 6.1: Agregar sitio a Cloudflare

1. Ve a: **https://dash.cloudflare.com**
2. Haz clic en **"Add a site"**
3. Ingresa: `tudominio.cl`
4. Selecciona el plan **Free**
5. Haz clic en **"Continue"**

### Paso 6.2: Configurar DNS en Cloudflare

Agrega estos registros DNS:

```
Tipo   | Nombre | Contenido                              | Proxy
-------|--------|----------------------------------------|-------
CNAME  | www    | fjsantel.github.io                     | ✅ Proxied
CNAME  | @      | fjsantel.github.io                     | ✅ Proxied
```

**Nota importante:** El contenido debe ser `fjsantel.github.io` (tu usuario de GitHub + `.github.io`)

### Paso 6.3: Anotar nameservers

Cloudflare te mostrará algo como:
```
alexa.ns.cloudflare.com
reza.ns.cloudflare.com
```

**📋 ANOTA ESTOS NAMESERVERS**

### Paso 6.4: Actualizar en NIC Chile

1. Ve a: **https://www.nic.cl**
2. Inicia sesión
3. Ve a **"Mis dominios"**
4. Selecciona tu dominio `.cl`
5. Busca **"DNS"** o **"Nameservers"**
6. Cambia a **"DNS personalizados"**
7. Ingresa los nameservers de Cloudflare
8. Guarda

⏱️ **Propagación**: 1-48 horas (usualmente 1-2 horas)

### Paso 6.5: Configurar dominio en GitHub

1. En tu repo de GitHub, ve a **"Settings"** → **"Pages"**
2. En **"Custom domain"**, ingresa: `tudominio.cl`
3. Haz clic en **"Save"**
4. Espera a que GitHub verifique el dominio (puede tardar unos minutos)
5. Una vez verificado, marca la casilla **"Enforce HTTPS"**

✅ **SSL configurado automáticamente**

---

## 🎯 Resultado Final

Tu sitio funcionará en:
- ✅ **https://tudominio.cl** → Sitio público
- ✅ **https://tudominio.cl/admin** → Panel CMS
- ✅ **https://www.tudominio.cl** → También funciona

---

## 🔄 Resumen del Flujo Completo

### Para cambios de código (tú):
```
VS Code → git push → GitHub Actions → GitHub Pages → En vivo
```

### Para cambios de contenido (tu cliente):
```
https://tudominio.cl/admin → Editar → Save → GitHub Actions → En vivo
```

---

## 📊 Ventajas de este setup

| Característica | Estado |
|----------------|--------|
| **Hosting** | 🟢 Gratis (GitHub Pages) |
| **CMS** | 🟢 Gratis hasta 2 usuarios (Tina Cloud) |
| **CDN** | 🟢 Gratis (Cloudflare) |
| **SSL** | 🟢 Gratis (automático) |
| **Backups** | 🟢 Automático (GitHub) |
| **Deploy** | 🟢 Automático (GitHub Actions) |
| **Editor visual** | ✅ Sí (Tina CMS) |
| **Sin servidor** | ✅ 100% estático |

---

## 🆘 Troubleshooting

### ❓ El deploy falla en GitHub Actions

**Solución:**
1. Ve a tu repo → **"Actions"**
2. Haz clic en el workflow que falló
3. Revisa los logs
4. Probablemente faltan los secrets `TINA_CLIENT_ID` o `TINA_TOKEN`

### ❓ No puedo acceder a /admin

**Solución:**
1. Verifica que GitHub Actions haya terminado
2. Accede a: `https://tu-url/admin/index.html` (con `/index.html`)
3. Espera 2-3 minutos después del deploy

### ❓ El dominio .cl no funciona

**Solución:**
1. Verifica que los nameservers de Cloudflare estén configurados en NIC Chile
2. Espera hasta 48 horas para propagación DNS
3. Verifica con: `dig tudominio.cl NS`

### ❓ SSL no funciona en el dominio custom

**Solución:**
1. En GitHub Pages settings, desmarca "Enforce HTTPS"
2. Espera 1 minuto
3. Vuelve a marcar "Enforce HTTPS"
4. Espera 5-10 minutos

### ❓ El cliente no puede hacer login en /admin

**Solución:**
1. Asegúrate de que haya hecho clic en **"Login with Tina Cloud"**
2. Debe autorizar con GitHub
3. En Tina Cloud dashboard, ve a **"Team"** y agrega su email como colaborador

---

## 👥 Agregar más usuarios al CMS

### En Tina Cloud:
1. Ve a: **https://app.tina.io**
2. Selecciona tu proyecto
3. Haz clic en **"Team"** (menú lateral)
4. Haz clic en **"Invite member"**
5. Ingresa el email del nuevo usuario
6. Envía la invitación

✅ El usuario recibirá un email y podrá acceder al CMS

---

## 📞 Contacto

Si tienes problemas:
- **Tina CMS**: https://tina.io/docs/
- **GitHub Pages**: https://docs.github.com/pages
- **Cloudflare**: https://community.cloudflare.com/

---

## 🎉 ¡Listo!

Tu sitio ahora tiene:
- ✅ Deploy automático desde GitHub
- ✅ CMS visual para tu cliente
- ✅ Dominio .cl personalizado
- ✅ CDN de Cloudflare
- ✅ SSL automático
- ✅ $0 de costo mensual

**¡A crear historias del Maule!** 🚜💧
