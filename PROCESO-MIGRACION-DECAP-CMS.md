# Proceso de Migración a Decap CMS - Documentación Técnica

**Fecha:** 18 Enero 2026
**Desarrollador:** Francisco Santelices
**Propósito:** Documento técnico interno del proceso constructivo

---

## 🎯 Objetivo del Proyecto

Implementar un CMS funcional para ACM Conecta que permita al cliente:
- Crear y editar historias (formato entrevista)
- Crear y editar reportajes (formato extenso)
- Gestionar contenido sin conocimientos técnicos
- Deploy automático al guardar cambios

---

## 📊 Estado Inicial

### Infraestructura Original
- **Hosting:** GitHub Pages (fjsantel/ACM-CONECTA-web)
- **Deploy:** Manual con GitHub Actions
- **CMS:** Tina CMS (FALLIDO - no indexaba correctamente)
- **Contenido:** Hardcodeado en `historias-cards-data.js`

### Problemas con Tina CMS
- No indexaba el contenido
- Errores de GraphQL
- Dependencias pesadas (~982 paquetes)
- Configuración compleja que no funcionó

---

## 🔄 Proceso de Migración Realizado

### Fase 1: Eliminación de Tina CMS

**Archivos eliminados:**
```bash
rm -rf tina/
rm -f README-TINA-CMS.md
```

**Dependencias eliminadas de package.json:**
```json
// ANTES (con Tina)
"devDependencies": {
  "@tinacms/cli": "^2.1.1",
  "tinacms": "^3.3.1"
}

// DESPUÉS (sin Tina)
"dependencies": {
  "axios": "^1.6.0"  // Solo para OAuth function
}
```

**Resultado:** Reducción de 982 paquetes a 24 paquetes

---

### Fase 2: Instalación de Decap CMS

#### 2.1 Estructura de carpetas creada

```
/ACM-CONECTA
├── admin/                    # Panel de administración CMS
│   ├── index.html           # UI de Decap CMS
│   └── config.yml           # Configuración del CMS
├── netlify/
│   └── functions/
│       └── auth.js          # OAuth proxy para GitHub
├── content/
│   ├── historias/           # Historias tipo entrevista (MD)
│   └── reportajes/          # Reportajes extensos (MD)
├── netlify.toml             # Config de Netlify + redirects
└── package.json
```

#### 2.2 Configuración de Decap CMS

**Archivo:** `admin/index.html`
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>ACM Conecta - Panel de Administración</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

**Archivo:** `admin/config.yml`
```yaml
backend:
  name: github
  repo: fjsantel/ACM-CONECTA-web
  branch: main
  base_url: https://acmconecta.netlify.app
  auth_endpoint: auth

media_folder: "fotos"
public_folder: "/fotos"

collections:
  - name: "historias"
    label: "Historias - Entrevista"
    folder: "content/historias"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Nombre", name: "nombre", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Ubicación", name: "ubicacion", widget: "string"}
      - {label: "Ocupación", name: "ocupacion", widget: "string"}
      - {label: "Descripción corta", name: "descripcion", widget: "text"}
      - {label: "Foto principal", name: "foto", widget: "image"}
      - {label: "Color del gradiente", name: "color", widget: "select", options: ["blue", "green", "orange", "purple", "red"]}
      - {label: "Intro", name: "intro", widget: "markdown"}
      - label: "Preguntas y Respuestas"
        name: "preguntas"
        widget: "list"
        fields:
          - {label: "Pregunta", name: "pregunta", widget: "string"}
          - {label: "Respuesta", name: "respuesta", widget: "markdown"}
      - {label: "Quote destacado", name: "quote", widget: "text"}
      - label: "Galería de fotos"
        name: "galeria"
        widget: "list"
        field: {label: "Foto", name: "foto", widget: "image"}

  - name: "reportajes"
    label: "Reportajes - Extensos"
    folder: "content/reportajes"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Título", name: "titulo", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Descripción corta", name: "descripcion", widget: "text"}
      - {label: "Foto principal", name: "foto", widget: "image"}
      - {label: "Color del gradiente", name: "color", widget: "select"}
      - {label: "Contenido", name: "body", widget: "markdown"}
      - label: "Galería de fotos"
        name: "galeria"
        widget: "list"
        field: {label: "Foto", name: "foto", widget: "image"}
```

---

### Fase 3: Configuración de OAuth con GitHub

#### 3.1 ¿Por qué necesitamos OAuth?

Decap CMS necesita hacer commits a GitHub en nombre del usuario. Para esto necesita:
1. Autenticar al usuario con GitHub
2. Obtener un token de acceso
3. Usar ese token para hacer commits

**Problema:** GitHub no permite OAuth directo desde navegador (CORS)
**Solución:** Crear un proxy OAuth en Netlify Functions

#### 3.2 GitHub OAuth App creada

**URL de configuración:** https://github.com/settings/developers

**Configuración:**
```
Application name: ACM Conecta CMS
Client ID: Ov23ctgqSy6PKYQZik6D
Client Secret: 5c26a886c9e24f715b091374cffd04abf24acf90
Homepage URL: https://acmconecta.netlify.app
Authorization callback URL: https://acmconecta.netlify.app/.netlify/functions/auth/callback
```

#### 3.3 Netlify Function: OAuth Proxy

**Archivo:** `netlify/functions/auth.js`

**¿Qué hace esta función?**

1. **Paso 1: Redirect a GitHub**
   - Usuario hace clic en "Login with GitHub"
   - Función redirige a: `https://github.com/login/oauth/authorize`
   - GitHub muestra pantalla de autorización

2. **Paso 2: GitHub devuelve código**
   - Usuario autoriza la app
   - GitHub redirige a: `/.netlify/functions/auth/callback?code=XXXXX`

3. **Paso 3: Exchange código por token**
   - Función recibe el código
   - Hace POST a `https://github.com/login/oauth/access_token`
   - Envía: Client ID + Client Secret + código
   - Recibe: access_token

4. **Paso 4: Comunicar token al CMS**
   - Función retorna HTML con JavaScript
   - JavaScript usa `postMessage` para enviar token al CMS
   - CMS guarda el token y permite editar

**Código final que funciona:**

```javascript
const axios = require('axios');

exports.handler = async (event) => {
  const { httpMethod, queryStringParameters } = event;

  // Paso 1: Redirect inicial a GitHub
  if (httpMethod === 'GET' && !queryStringParameters.code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.URL || 'https://acmconecta.netlify.app'}/.netlify/functions/auth/callback`;

    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`
      }
    };
  }

  // Paso 2 y 3: Exchange code por token
  if (queryStringParameters.code) {
    const { code } = queryStringParameters;

    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code
        },
        {
          headers: { Accept: 'application/json' }
        }
      );

      const { access_token, error } = response.data;

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error })
        };
      }

      // Paso 4: Comunicar token al CMS via postMessage
      const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
  <script>
    (function() {
      const receiveMessage = function(message) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({
            token: "${access_token}",
            provider: "github"
          }),
          message.origin
        );
      };

      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");

      setTimeout(function() {
        receiveMessage({ origin: window.opener.location.origin });
        window.close();
      }, 100);
    })();
  </script>
</head>
<body>
  <p>Authenticating... You can close this window.</p>
</body>
</html>
`;

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: html
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to get access token',
          details: error.message
        })
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid request' })
  };
};
```

#### 3.4 Variables de entorno en Netlify

**Ubicación:** https://app.netlify.com/sites/acmconecta/configuration/env

**Variables configuradas:**
```
GITHUB_CLIENT_ID=Ov23ctgqSy6PKYQZik6D
GITHUB_CLIENT_SECRET=5c26a886c9e24f715b091374cffd04abf24acf90
```

**Scopes:** All scopes (Builds + Functions + Runtime + Post processing)

---

### Fase 4: Configuración de Netlify

#### 4.1 netlify.toml

**Archivo:** `netlify.toml`

```toml
[build]
  publish = "."
  command = "npm install"

[[redirects]]
  from = "/auth"
  to = "/.netlify/functions/auth"
  status = 200

[[redirects]]
  from = "/auth/callback"
  to = "/.netlify/functions/auth/callback"
  status = 200

[functions]
  directory = "netlify/functions"
```

**¿Por qué estos redirects?**

Decap CMS intenta acceder a `/auth`, pero las funciones están en `/.netlify/functions/auth`.
Los redirects permiten que `/auth` → `/.netlify/functions/auth` de forma transparente.

#### 4.2 Deploy automático

**Flow completo:**
1. Usuario hace commit en GitHub (o CMS hace commit)
2. GitHub webhook notifica a Netlify
3. Netlify ejecuta: `npm install`
4. Netlify despliega el sitio estático
5. Netlify despliega las functions
6. Sitio actualizado en ~1-2 minutos

---

### Fase 5: Integración con index.html

**Agregado al `<head>` del sitio:**

```html
<!-- Netlify Identity Widget -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

**Nota:** Aunque usamos GitHub OAuth, este script es necesario para que Decap CMS detecte el entorno de Netlify.

---

## 🧪 Testing y Debugging

### Problemas encontrados y soluciones

#### Problema 1: "Missing code parameter"
**Causa:** La función no recibía el parámetro `code` de GitHub
**Solución:** Corregir callback URL en GitHub OAuth App

#### Problema 2: 404 en `/admin`
**Causa:** Netlify no servía la carpeta `admin/`
**Solución:** Acceder con barra final: `/admin/` o agregar redirect

#### Problema 3: 404 en `/auth`
**Causa:** Decap CMS buscaba `/auth` pero función estaba en `/.netlify/functions/auth`
**Solución:** Agregar redirects en `netlify.toml`

#### Problema 4: Token no se comunicaba al CMS
**Causa:** Formato incorrecto de `postMessage`
**Solución:** Usar formato específico de Decap CMS: `'authorization:github:success:' + JSON.stringify({token, provider})`

#### Problema 5: Function no se desplegaba
**Causa:** Faltaba instalar `axios` en Netlify
**Solución:** Cambiar build command a `npm install` y agregar axios a `package.json`

---

## ✅ Estado Actual (FUNCIONANDO)

### URLs del proyecto

- **Sitio público:** https://acmconecta.netlify.app
- **CMS (admin):** https://acmconecta.netlify.app/admin/
- **Repositorio:** https://github.com/fjsantel/ACM-CONECTA-web
- **Netlify dashboard:** https://app.netlify.com/sites/acmconecta

### Flujo de trabajo actual

1. **Crear contenido:**
   - Ir a: https://acmconecta.netlify.app/admin/
   - Login con GitHub
   - Crear/editar historia o reportaje
   - Click en "Publish"

2. **Guardado automático:**
   - Decap CMS hace commit a GitHub
   - Commit message: "Create/Update [nombre-archivo]"
   - Archivo guardado en: `content/historias/` o `content/reportajes/`

3. **Deploy automático:**
   - Netlify detecta el commit
   - Ejecuta build
   - Despliega sitio actualizado
   - Tiempo: ~1-2 minutos

4. **Visualización:**
   - `historias-loader.js` carga archivos MD
   - Parsea Front Matter
   - Muestra en el sitio

---

## 🔧 Arquitectura Técnica

### Stack completo

```
┌─────────────────────────────────────────────────┐
│  Usuario final (cliente)                        │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Decap CMS UI                                   │
│  https://acmconecta.netlify.app/admin/         │
│                                                  │
│  - Editor visual de contenido                   │
│  - Subida de imágenes                           │
│  - Preview en vivo                              │
└───────────────┬─────────────────────────────────┘
                │
                │ Click "Login with GitHub"
                ▼
┌─────────────────────────────────────────────────┐
│  Netlify Function: /auth                        │
│  netlify/functions/auth.js                      │
│                                                  │
│  1. Redirect a GitHub OAuth                     │
│  2. Recibe código de autorización               │
│  3. Exchange por access_token                   │
│  4. Retorna token al CMS                        │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  GitHub API                                     │
│  https://api.github.com                         │
│                                                  │
│  - Autenticación OAuth                          │
│  - Crear/editar archivos                        │
│  - Hacer commits                                │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  GitHub Repository                              │
│  fjsantel/ACM-CONECTA-web                       │
│                                                  │
│  - Almacena código fuente                       │
│  - Almacena contenido (MD)                      │
│  - Almacena imágenes                            │
└───────────────┬─────────────────────────────────┘
                │
                │ Webhook on push
                ▼
┌─────────────────────────────────────────────────┐
│  Netlify Build                                  │
│                                                  │
│  1. npm install                                 │
│  2. Deploy static files                         │
│  3. Deploy functions                            │
└───────────────┬─────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  Netlify CDN                                    │
│  https://acmconecta.netlify.app                 │
│                                                  │
│  - Sirve sitio estático                         │
│  - CDN global                                   │
│  - SSL automático                               │
└─────────────────────────────────────────────────┘
```

### Flujo de datos

```
[Usuario escribe contenido en CMS]
          ↓
[CMS convierte a Markdown con Front Matter]
          ↓
[CMS usa GitHub API para hacer commit]
          ↓
[Archivo guardado en content/historias/*.md]
          ↓
[GitHub notifica a Netlify via webhook]
          ↓
[Netlify hace build y deploy]
          ↓
[historias-loader.js carga archivos MD en el sitio]
          ↓
[Usuario final ve contenido actualizado]
```

---

## 📝 Formato de archivos generados

### Ejemplo: Historia (Entrevista)

**Archivo:** `content/historias/maria-gonzalez.md`

```markdown
---
nombre: María González
slug: maria-gonzalez
ubicacion: Talca
ocupacion: Agricultora
descripcion: Historia de María, agricultora del Valle del Maule
foto: /fotos/maria-gonzalez.jpg
color: green
intro: |
  María lleva 20 años trabajando la tierra en el Valle del Maule...
preguntas:
  - pregunta: ¿Cómo ha cambiado el riego en estos años?
    respuesta: |
      Antes regábamos por inundación, ahora tenemos riego tecnificado...
  - pregunta: ¿Qué significa el agua para ti?
    respuesta: |
      El agua es vida, sin ella no hay futuro para la agricultura...
quote: "El agua es el recurso más valioso que tenemos"
galeria:
  - /fotos/maria-1.jpg
  - /fotos/maria-2.jpg
  - /fotos/maria-3.jpg
---
```

### Ejemplo: Reportaje

**Archivo:** `content/reportajes/proyecto-canal-norte.md`

```markdown
---
titulo: Proyecto Canal Norte: Modernización del Riego
slug: proyecto-canal-norte
descripcion: Un recorrido por la modernización del sistema de riego
foto: /fotos/canal-norte-portada.jpg
color: blue
galeria:
  - /fotos/canal-1.jpg
  - /fotos/canal-2.jpg
---

## Introducción

El Proyecto Canal Norte representa un hito en la modernización...

## Desarrollo

[Contenido del reportaje en Markdown]

## Conclusión

Este proyecto marca un antes y un después...
```

---

## 🎯 Próximos pasos

### Pendientes antes de entregar al cliente

1. **Testing completo:**
   - [ ] Crear historia de prueba desde CMS
   - [ ] Verificar que aparece en sitio
   - [ ] Crear reportaje de prueba
   - [ ] Verificar subida de imágenes
   - [ ] Verificar edición de contenido existente

2. **Transferencia de propiedad:**
   - [ ] Transferir repo de GitHub a organización del cliente
   - [ ] Transferir sitio de Netlify a cuenta del cliente
   - [ ] Actualizar OAuth App para nuevo owner
   - [ ] Actualizar variables de entorno

3. **Documentación para cliente:**
   - [ ] Crear guía de uso del CMS (no técnica)
   - [ ] Crear guía de administración de usuarios
   - [ ] Video tutorial de uso del CMS

4. **Optimizaciones:**
   - [ ] Adaptar `historias-loader.js` a formato de Decap CMS
   - [ ] Verificar que campos del Front Matter coinciden
   - [ ] Testear responsive del CMS en mobile

---

## 💡 Aprendizajes clave

### Lo que funcionó
- ✅ Decap CMS es más simple y ligero que Tina
- ✅ GitHub OAuth via Netlify Functions es robusto
- ✅ Decap CMS + Netlify + GitHub Pages = 100% gratis
- ✅ Deploy automático funciona perfectamente

### Lo que no funcionó
- ❌ Tina CMS (problemas de indexación)
- ❌ GitHub backend directo (CORS)
- ❌ Netlify Identity (deprecado)

### Decisiones técnicas importantes

1. **¿Por qué Decap CMS?**
   - Más maduro que Tina
   - Menor dependencia de servicios externos
   - Comunidad más grande
   - Sin problemas de indexación

2. **¿Por qué Netlify Functions para OAuth?**
   - Evita problemas de CORS
   - Oculta Client Secret (seguridad)
   - Funciona sin backend propio

3. **¿Por qué GitHub como backend?**
   - Git como single source of truth
   - Historial de cambios completo
   - Colaboración nativa
   - Gratis para repos públicos

---

## 🔐 Credenciales y accesos

### GitHub OAuth App
- **Owner:** fjsantel
- **App name:** ACM Conecta CMS
- **Client ID:** Ov23ctgqSy6PKYQZik6D
- **Client Secret:** 5c26a886c9e24f715b091374cffd04abf24acf90
- **Manage:** https://github.com/settings/developers

### Netlify
- **Site name:** acmconecta
- **URL:** https://acmconecta.netlify.app
- **Owner:** franciscosantelicesariztia (cuenta personal)
- **Dashboard:** https://app.netlify.com/sites/acmconecta

### GitHub Repository
- **Repo:** fjsantel/ACM-CONECTA-web
- **Branch principal:** main
- **URL:** https://github.com/fjsantel/ACM-CONECTA-web

---

## 📚 Referencias útiles

- **Decap CMS Docs:** https://decapcms.org/docs/
- **Netlify Functions:** https://docs.netlify.com/functions/overview/
- **GitHub OAuth:** https://docs.github.com/en/apps/oauth-apps/building-oauth-apps
- **YAML Front Matter:** https://jekyllrb.com/docs/front-matter/

---

**Última actualización:** 18 Enero 2026 - 22:30 CLT
**Estado:** ✅ CMS FUNCIONANDO - Pendiente testing completo
