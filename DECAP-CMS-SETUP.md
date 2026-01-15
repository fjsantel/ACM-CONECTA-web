# 🔧 Configuración Técnica: Decap CMS

## 📋 Resumen

Este documento explica cómo configurar Decap CMS para el sitio ACM Conecta. El sistema permite gestionar historias sin tocar código, con dos templates diferentes:
- **Template Entrevista**: Formato Q&A con galería de fotos
- **Template Reportaje**: Artículo extenso tipo revista con Markdown

---

## 🏗️ Estructura del Proyecto

```
/
├── admin/
│   ├── index.html          # Interfaz de Decap CMS
│   └── config.yml          # Configuración de colecciones
├── content/
│   ├── historias/          # Historias tipo entrevista (.md)
│   └── reportajes/         # Historias tipo reportaje (.md)
├── fotos/                  # Media folder (imágenes)
├── historias-cards-data.js # Datos legacy (JS)
├── historias-loader.js     # Loader unificado MD + JS
├── historias-cards-carousel.js  # Carrusel
├── historia-template.html  # Template entrevista
├── reportaje-template.html # Template reportaje
└── index.html              # Página principal
```

---

## ⚙️ Configuración de Backend

### Opción 1: GitHub Pages (Producción)

#### 1. Habilitar Git Gateway

En tu repositorio de GitHub:

1. Ve a **Settings > Integrations**
2. Busca **Netlify Identity** o configura manualmente Git Gateway

#### 2. Configurar Netlify Identity (recomendado)

```bash
# 1. Crea una cuenta en Netlify
https://app.netlify.com/signup

# 2. Conecta tu repositorio de GitHub

# 3. Ve a Identity > Enable Identity

# 4. Configura Git Gateway:
Settings > Identity > Services > Git Gateway > Enable
```

#### 3. Actualizar config.yml

```yaml
backend:
  name: git-gateway
  branch: main
```

#### 4. Agregar script de identidad en admin/index.html

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

### Opción 2: GitHub Backend (Sin Netlify)

Si no quieres usar Netlify Identity, puedes usar el backend de GitHub directamente:

#### 1. Actualizar config.yml

```yaml
backend:
  name: github
  repo: tu-usuario/tu-repositorio
  branch: main
```

#### 2. Crear OAuth App en GitHub

1. Ve a GitHub Settings > Developer settings > OAuth Apps
2. Clic en "New OAuth App"
3. Completa:
   - **Application name**: ACM Conecta CMS
   - **Homepage URL**: https://tu-usuario.github.io/tu-repositorio
   - **Authorization callback URL**: https://api.netlify.com/auth/done

4. Guarda el **Client ID** y **Client Secret**

#### 3. Configurar en Netlify

Aunque no uses Netlify para hosting, puedes usar su servicio OAuth:

1. Ve a Netlify > Site settings > Access control > OAuth
2. Agrega **GitHub Provider**
3. Ingresa tu Client ID y Client Secret

---

## 🧪 Desarrollo Local

### 1. Instalar Decap CMS Proxy

```bash
npm install -g decap-server
```

### 2. Ejecutar servidor local

```bash
# En el directorio raíz del proyecto
decap-server
```

### 3. Ejecutar servidor web local

```bash
# Opción 1: Python
python -m http.server 8080

# Opción 2: Node.js
npx http-server -p 8080
```

### 4. Acceder al CMS

```
http://localhost:8080/admin
```

---

## 📝 Cómo Funciona el Sistema

### 1. Flujo de Datos

```
┌─────────────────┐
│  Decap CMS UI   │ (admin/index.html)
└────────┬────────┘
         │ guarda en
         ↓
┌─────────────────┐
│ Archivos .md    │ (content/historias/ o content/reportajes/)
└────────┬────────┘
         │ se cargan con
         ↓
┌─────────────────┐
│ historias-loader.js │ (parsea Markdown + combina con JS legacy)
└────────┬────────┘
         │ alimenta a
         ↓
┌─────────────────┐
│ Carrusel        │ (historias-cards-carousel.js)
└─────────────────┘
```

### 2. Front Matter Parsing

El loader (`historias-loader.js`) parsea automáticamente archivos Markdown con formato:

```markdown
---
name: Juan Pérez
slug: juan-perez
location: Talca
# ... más campos
---
Contenido del artículo...
```

### 3. Templates Dinámicos

El carrusel detecta el campo `template` y redirige al HTML correcto:
- `template: entrevista` → `historia-template.html`
- `template: reportaje` → `reportaje-template.html`

---

## 🔄 Migración de Datos Existentes

Las historias actuales en `historias-cards-data.js` siguen funcionando. El sistema es **retrocompatible**:

1. **Historias JS**: Se cargan desde `historias-cards-data.js`
2. **Historias MD**: Se cargan desde `content/historias/*.md`
3. **Prioridad**: Si existe la misma historia en MD y JS, se usa la versión MD

### Migrar manualmente

Para convertir una historia JS a MD, copia el contenido a un archivo `.md` con el formato del front matter.

---

## 🎨 Personalizar el CMS

### Agregar nuevos campos

Edita `admin/config.yml`:

```yaml
fields:
  - { label: "Nuevo Campo", name: "nuevo_campo", widget: "string" }
```

### Widgets disponibles:
- `string`: Texto corto
- `text`: Texto largo
- `markdown`: Editor Markdown
- `number`: Números
- `datetime`: Fecha y hora
- `image`: Subir imágenes
- `select`: Menú desplegable
- `list`: Lista de items

[Más widgets](https://decapcms.org/docs/widgets/)

---

## 🚨 Troubleshooting

### Error: "Failed to load config"

**Causa**: Archivo `config.yml` mal formateado

**Solución**:
1. Verifica la indentación (YAML es sensible a espacios)
2. Usa un validador YAML: https://www.yamllint.com/

### Error: "Cannot read properties of undefined"

**Causa**: Falta un campo obligatorio en el front matter

**Solución**:
1. Revisa que todos los campos obligatorios estén presentes
2. Verifica que los nombres coincidan con el config.yml

### Las imágenes no cargan

**Causa**: Ruta incorrecta

**Solución**:
1. Asegúrate de que `media_folder` sea `"fotos"`
2. Verifica que las imágenes estén en `/fotos/`

### Los cambios no aparecen

**Causa**: Cache del navegador o GitHub Pages no actualizado

**Solución**:
1. Limpia cache: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
2. Espera 2-5 minutos (GitHub Pages tarda en actualizar)

---

## 🔐 Seguridad

### Limitar acceso al CMS

1. Usa Netlify Identity para controlar quién puede editar
2. Configura roles y permisos en Netlify Identity
3. **No compartas** tus credenciales OAuth

### Backup automático

Todo el contenido está en GitHub, así que tienes backup automático:
- Cada cambio crea un commit
- Historial completo de versiones
- Puedes revertir cambios en cualquier momento

---

## 📚 Recursos

- [Decap CMS Docs](https://decapcms.org/docs/intro/)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [YAML Syntax](https://yaml.org/spec/1.2/spec.html)

---

## 🎯 Próximos Pasos

1. ✅ Sistema implementado
2. 📝 Configurar backend (GitHub o Netlify)
3. 🔐 Configurar autenticación
4. 📤 Deploy a GitHub Pages
5. 👥 Capacitar al equipo con `DECAP-CMS-GUIA.md`

---

## 📞 Soporte Técnico

Si tienes problemas técnicos más allá de lo cubierto aquí, consulta:
- Issues del proyecto: https://github.com/decaporg/decap-cms/issues
- Stack Overflow: https://stackoverflow.com/questions/tagged/decap-cms

---

**✨ Sistema listo para usar. ¡Feliz creación de contenido!**
