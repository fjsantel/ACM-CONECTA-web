# Estado Actual del Proyecto ACM Conecta

**Fecha:** 19 Enero 2026
**Desarrollador:** Francisco Santelices
**Cliente:** Asociación Canal Maule

---

## 🎯 Objetivo del Proyecto

Entregar un sitio web autoadministrable donde el cliente pueda:
- ✅ Crear y publicar historias (formato entrevista)
- ✅ Crear y publicar reportajes (formato extenso)
- ✅ Subir imágenes
- ✅ Ver cambios publicados automáticamente
- ⚠️ **SIN necesidad de conocimientos técnicos ni intervención del desarrollador**

---

## ✅ LO QUE ESTÁ FUNCIONANDO

### 1. Sistema de CMS (Decap CMS)

**URL Admin:** https://acmconecta.netlify.app/admin/

**Flujo de trabajo:**
```
1. Usuario → Login con GitHub (automático)
2. Usuario → Crea historia o reportaje en formulario visual
3. Usuario → Sube imágenes (drag & drop)
4. Usuario → Click "Publish"
5. Sistema → Guarda en GitHub automáticamente
6. Sistema → Netlify despliega en 1-2 minutos
7. Usuario → Ve cambios en https://acmconecta.netlify.app
```

**Status:** ✅ **FUNCIONANDO COMPLETAMENTE**

### 2. Carga Automática de Contenido

**Tecnología:** GitHub API + JavaScript loader

**Cómo funciona:**
- El sitio consulta GitHub API al cargar
- Obtiene lista de todos los archivos .md en `content/historias/` y `content/reportajes/`
- Los carga y muestra en el slider automáticamente
- Combina con historias legacy existentes

**Status:** ✅ **FUNCIONANDO COMPLETAMENTE**

### 3. Deploy Automático

**Infraestructura:**
- Hosting: Netlify (gratis)
- Deploy: GitHub Actions (automático)
- CDN: Cloudflare (cuando se agregue dominio .cl)

**Flujo:**
```
Commit en GitHub → Webhook → Netlify build → Deploy (~1-2 min)
```

**Status:** ✅ **FUNCIONANDO COMPLETAMENTE**

---

## ⚠️ PENDIENTE DE VERIFICACIÓN

### 1. Template de Reportaje
- ✅ Existe: `reportaje-template.html`
- ⚠️ **FALTA PROBAR:** ¿Muestra correctamente el contenido del reportaje?
- ⚠️ **FALTA VERIFICAR:** ¿Todas las secciones se renderizan bien?

**Acción:** Hacer clic en el reportaje de prueba y verificar que se muestra correctamente.

### 2. Subida de Imágenes
- ✅ El CMS permite subir imágenes
- ✅ Las guarda en carpeta `/fotos/`
- ⚠️ **FALTA PROBAR:** Crear una historia nueva desde cero con imagen

**Acción:** Crear una historia de prueba con imagen nueva desde el CMS.

---

## 📋 CHECKLIST DE ENTREGA AL CLIENTE

### Antes de transferir:

- [ ] **Probar creación de historia completa desde CMS**
  - Crear historia de prueba
  - Subir imagen nueva
  - Publicar
  - Verificar que aparece en sitio
  - Verificar que enlace funciona

- [ ] **Probar creación de reportaje completo desde CMS**
  - Crear reportaje de prueba
  - Subir imagen
  - Publicar
  - Verificar que aparece en sitio
  - Hacer clic y verificar que template muestra todo correctamente

- [ ] **Probar edición de contenido existente**
  - Editar historia existente
  - Cambiar texto
  - Publicar
  - Verificar cambios en sitio

- [ ] **Documentación para cliente**
  - Guía de uso del CMS (no técnica)
  - Video tutorial (opcional pero recomendado)
  - Guía de administración de usuarios

- [ ] **Transferencia de propiedad**
  - Transferir repositorio a organización del cliente
  - Transferir sitio de Netlify a cuenta del cliente
  - Actualizar OAuth App de GitHub
  - Actualizar variables de entorno en Netlify

- [ ] **Configuración de dominio .cl**
  - Configurar DNS en Cloudflare
  - Actualizar dominio en Netlify
  - Actualizar URLs en config.yml del CMS
  - Verificar HTTPS funcionando

---

## 🚀 PLAN DE ESCALABILIDAD

### Extensión a otras secciones

El sistema actual puede replicarse para:

#### Sección "Noticias"
```yaml
collections:
  - name: "noticias"
    label: "Noticias"
    folder: "content/noticias"
    create: true
    fields:
      - {label: "Título", name: "titulo"}
      - {label: "Fecha", name: "fecha", widget: "datetime"}
      - {label: "Resumen", name: "resumen"}
      - {label: "Contenido", name: "body", widget: "markdown"}
      - {label: "Imagen", name: "imagen", widget: "image"}
```

#### Sección "Proyectos"
```yaml
collections:
  - name: "proyectos"
    label: "Proyectos"
    folder: "content/proyectos"
    create: true
    fields:
      - {label: "Nombre", name: "nombre"}
      - {label: "Estado", name: "estado", widget: "select"}
      - {label: "Presupuesto", name: "presupuesto"}
      - {label: "Descripción", name: "body", widget: "markdown"}
```

#### Sección "Documentos"
```yaml
collections:
  - name: "documentos"
    label: "Documentos"
    folder: "content/documentos"
    create: true
    fields:
      - {label: "Título", name: "titulo"}
      - {label: "Categoría", name: "categoria"}
      - {label: "Archivo PDF", name: "archivo", widget: "file"}
```

**Ventaja:** Solo agregar al `admin/config.yml` y crear el loader correspondiente.

---

## 💰 COSTOS (Mensual)

| Servicio | Costo Actual | Costo Futuro |
|----------|--------------|--------------|
| Hosting (Netlify) | **$0** | $0 (hasta 100GB tráfico) |
| CMS (Decap) | **$0** | $0 (open source) |
| GitHub | **$0** | $0 (repo público) |
| Dominio .cl | N/A | ~$15.000 CLP/año |
| Cloudflare CDN | N/A | **$0** (plan free) |
| **TOTAL** | **$0/mes** | **~$1.250 CLP/mes** |

**Nota:** 100% gratuito excepto el dominio.

---

## 🔐 CREDENCIALES Y ACCESOS

### Actual (Desarrollador)
- **Repositorio:** fjsantel/ACM-CONECTA-web
- **Netlify:** franciscosantelicesariztia (cuenta personal)
- **GitHub OAuth App:** fjsantel

### Post-Transferencia (Cliente)
- **Repositorio:** [org-cliente]/ACM-CONECTA-web
- **Netlify:** [cuenta-cliente]
- **GitHub OAuth App:** [org-cliente]

**Acción requerida:** Crear organización de GitHub para el cliente.

---

## ⚙️ ARQUITECTURA TÉCNICA

### Stack
```
Frontend:
- HTML/CSS/JavaScript puro (no frameworks)
- Sitio 100% estático

CMS:
- Decap CMS 3.0 (CDN)
- GitHub como backend
- OAuth via Netlify Functions

Hosting:
- Netlify (static hosting + functions)
- GitHub Pages (alternativa si cambian)

CDN:
- Cloudflare (cuando se agregue dominio)
```

### Flujo de Datos
```
[Usuario en CMS]
    ↓
[GitHub API - Commits]
    ↓
[GitHub Webhook]
    ↓
[Netlify Build]
    ↓
[Deploy a CDN]
    ↓
[Sitio consulta GitHub API]
    ↓
[Carga contenido dinámicamente]
```

---

## 🎓 CAPACITACIÓN REQUERIDA PARA CLIENTE

### Nivel Básico (Imprescindible)
- ✅ Cómo hacer login en el CMS
- ✅ Cómo crear una historia
- ✅ Cómo crear un reportaje
- ✅ Cómo subir imágenes
- ✅ Cómo publicar cambios

**Tiempo estimado:** 30 minutos

### Nivel Intermedio (Recomendado)
- Ver cambios en el sitio después de publicar
- Editar contenido existente
- Borrar contenido
- Agregar usuarios editores

**Tiempo estimado:** 1 hora

### Nivel Avanzado (Opcional)
- Entender cómo funciona Git
- Revertir cambios si algo sale mal
- Modificar colecciones del CMS

**Tiempo estimado:** 2-3 horas

---

## 📝 DOCUMENTOS A ENTREGAR

1. ✅ **PROCESO-MIGRACION-DECAP-CMS.md** (técnico, para desarrollador)
2. ⏳ **ESTADO-ACTUAL-PROYECTO.md** (este documento)
3. ⏳ **GUIA-USUARIO-CMS.md** (no técnico, para cliente)
4. ⏳ **GUIA-TRANSFERENCIA.md** (pasos para transferir propiedad)
5. ⏳ **GUIA-DOMINIO-CL.md** (configurar dominio personalizado)

---

## 🐛 ISSUES CONOCIDOS

### Ninguno crítico detectado hasta el momento

**Posibles mejoras futuras:**
- Agregar preview del sitio antes de publicar
- Agregar búsqueda de historias
- Agregar filtros por categoría
- Optimizar carga de imágenes (lazy loading)

---

## 📞 SOPORTE POST-ENTREGA

### Responsabilidades del desarrollador:
- ❌ NO gestionar contenido
- ❌ NO crear historias/reportajes
- ✅ Solucionar bugs técnicos
- ✅ Agregar nuevas secciones (si se solicita)
- ✅ Actualizar CMS si hay vulnerabilidades

### Responsabilidades del cliente:
- ✅ Crear y gestionar contenido
- ✅ Agregar/remover usuarios editores
- ✅ Renovar dominio anualmente
- ❌ NO modificar código sin consultar

---

## ✅ CRITERIOS DE ÉXITO

El proyecto estará **100% completo** cuando:

1. ✅ Cliente puede crear historias sin ayuda técnica
2. ✅ Cliente puede crear reportajes sin ayuda técnica
3. ✅ Los cambios aparecen automáticamente en el sitio
4. ✅ El sitio está en dominio .cl del cliente
5. ✅ Cliente tiene control total del repositorio y hosting
6. ✅ Existe documentación clara para usuarios no técnicos

**Status actual:** 3/6 completados (50%)

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **Probar el reportaje** - Hacer clic y verificar que se muestra correctamente
2. **Crear historia de prueba completa** - Desde CMS con imagen nueva
3. **Verificar que todo funciona end-to-end**
4. **Crear documentación de usuario** (no técnica)
5. **Preparar transferencia al cliente**

---

**Última actualización:** 19 Enero 2026 - 23:00 CLT
**Status general:** 🟡 Funcional pero pendiente de verificación completa
