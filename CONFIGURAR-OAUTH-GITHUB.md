# 🔐 Configurar OAuth de GitHub - PASO A PASO

Para que el CMS funcione, necesitas crear una aplicación OAuth en GitHub. Es un proceso de **5 minutos** y solo lo haces una vez.

---

## 📋 Opción 1: Usar Netlify (MÁS FÁCIL - RECOMENDADO)

### Paso 1: Crear cuenta en Netlify
1. Ve a: https://app.netlify.com/signup
2. Regístrate con tu cuenta de GitHub (opción más rápida)

### Paso 2: Conectar tu repositorio
1. En Netlify, haz clic en **"Add new site"** → **"Import an existing project"**
2. Selecciona **"Deploy with GitHub"**
3. Busca y selecciona el repo: `ACM-CONECTA-web`
4. **NO CAMBIES NADA** en la configuración de build
5. Haz clic en **"Deploy site"**

### Paso 3: Habilitar Netlify Identity
1. En tu sitio de Netlify, ve a **"Site configuration"** → **"Identity"**
2. Haz clic en **"Enable Identity"**
3. Ve a **"Settings and usage"**
4. En **"Registration preferences"**, selecciona **"Invite only"** (para mayor seguridad)

### Paso 4: Habilitar Git Gateway
1. En la misma página de Identity, desplázate a **"Services"**
2. Busca **"Git Gateway"** y haz clic en **"Enable Git Gateway"**
3. Ya está configurado automáticamente con tu repo de GitHub

### Paso 5: Invitarte como usuario
1. Ve a **"Identity"** en el menú principal
2. Haz clic en **"Invite users"**
3. Ingresa tu email
4. Revisa tu correo y acepta la invitación
5. Crea una contraseña

### Paso 6: Usar el sitio de Netlify para el CMS
Tu CMS ahora estará en:
```
https://tu-sitio.netlify.app/admin
```

(Netlify te dará un nombre automático, puedes cambiarlo en Site settings)

**✅ LISTO!** Ya puedes acceder al CMS.

---

## 📋 Opción 2: OAuth Manual (MÁS TÉCNICO)

Si prefieres seguir usando GitHub Pages en lugar de Netlify:

### Paso 1: Crear OAuth App en GitHub
1. Ve a: https://github.com/settings/developers
2. Haz clic en **"OAuth Apps"** → **"New OAuth App"**
3. Completa:
   - **Application name**: `ACM Conecta CMS`
   - **Homepage URL**: `https://fjsantel.github.io/ACM-CONECTA-web`
   - **Authorization callback URL**: `https://fjsantel.github.io/ACM-CONECTA-web/admin/`
4. Haz clic en **"Register application"**
5. **Guarda** el **Client ID** (lo necesitarás después)
6. Haz clic en **"Generate a new client secret"**
7. **Guarda** el **Client Secret** (solo se muestra una vez)

### Paso 2: Configurar servidor OAuth
Como GitHub Pages es estático, necesitas un servidor OAuth. Opciones:

#### Opción 2A: Usar servicio gratuito
1. Ve a: https://github.com/vencax/netlify-cms-github-oauth-provider
2. Despliega en Heroku o Railway (gratis)
3. Configura las variables de entorno:
   - `OAUTH_CLIENT_ID`: Tu Client ID de GitHub
   - `OAUTH_CLIENT_SECRET`: Tu Client Secret de GitHub

#### Opción 2B: Usar serverless
1. Usa Vercel, Railway o Cloudflare Workers
2. Implementa el flujo OAuth básico
3. Configura las credenciales

### Paso 3: Actualizar config.yml
En `admin/config.yml`, agrega:

```yaml
backend:
  name: github
  repo: fjsantel/ACM-CONECTA-web
  branch: main
  base_url: https://tu-servidor-oauth.herokuapp.com
```

---

## 🎯 ¿Cuál opción elegir?

| Característica | Netlify | OAuth Manual |
|----------------|---------|--------------|
| **Facilidad** | ⭐⭐⭐⭐⭐ Muy fácil | ⭐⭐ Requiere conocimientos técnicos |
| **Tiempo setup** | 5 minutos | 20-30 minutos |
| **Hosting** | Netlify (automático) | GitHub Pages |
| **Mantenimiento** | ✅ Cero | ⚠️ Requiere servidor OAuth |
| **Costo** | 🆓 Gratis | 🆓 Gratis (con servicios gratuitos) |

### 💡 Recomendación

**Usa Netlify (Opción 1)** - Es mucho más simple y Netlify se sincroniza automáticamente con tu repo de GitHub. Los cambios aparecen tanto en Netlify como en GitHub Pages.

---

## 🆘 Problemas Comunes

### ❓ "Site not found" al hacer login
- **Causa**: El servidor OAuth no está configurado
- **Solución**: Usa Netlify Identity (Opción 1)

### ❓ "OAuth authentication failed"
- **Causa**: Client ID o Secret incorrectos
- **Solución**: Verifica las credenciales en GitHub OAuth Apps

### ❓ No puedo editar contenido
- **Causa**: No tienes permisos en el repo
- **Solución**: Asegúrate de ser colaborador del repo en GitHub

---

## 📞 Soporte

Si tienes dudas:
1. **Opción más simple**: Usa Netlify (arriba)
2. Consulta: https://decapcms.org/docs/github-backend/
3. Issues de Decap: https://github.com/decaporg/decap-cms/issues

---

## ✅ Checklist Final

Una vez configurado:
- [ ] Puedo acceder a `/admin`
- [ ] Puedo hacer login
- [ ] Veo las colecciones (Historias - Entrevista y Reportaje)
- [ ] Puedo crear una historia de prueba
- [ ] La historia se guarda en GitHub
- [ ] Aparece en el sitio web (esperar 5-7 min)

**¡Cuando completes todos los checks, el CMS está 100% funcional!** 🎉
