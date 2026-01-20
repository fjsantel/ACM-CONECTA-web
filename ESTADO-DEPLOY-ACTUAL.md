# Estado Actual del Deploy - ACM Conecta

**Fecha**: 19 de Enero 2026
**Última actualización**: Commit `80d2248`

---

## 🎯 ESTRUCTURA SIMPLIFICADA

### Repositorio Único
**GitHub**: https://github.com/fjsantel/ACM-CONECTA-web

### 2 Ambientes, 2 Propósitos Claros:

#### 1️⃣ DESARROLLO (Para ti - Francisco)
- **Branch**: `gh-pages`
- **Link**: https://fjsantel.github.io/ACM-CONECTA-web/
- **Propósito**: Desarrollo, testing, preview de cambios
- **CMS**: ❌ No disponible
- **Actualización**: Automática al hacer push a `gh-pages`
- **Costo**: ✅ Gratis (GitHub Pages)

#### 2️⃣ PRODUCCIÓN (Para el cliente)
- **Branch**: `main`
- **Link**: https://acmconecta.netlify.app/
- **Propósito**: Sitio oficial del cliente con CMS
- **CMS**: ✅ Disponible en /admin/
- **Estado actual**: ⏸️ Pausado (sin plan pagado)
- **Reactivación**: Cuando el cliente pague Netlify
- **Costo**: 💰 Requiere plan Netlify (~$19/mes)

---

## 📊 Estado Técnico de Branches

### Branch `main` (Netlify - Cliente)
- **Estado**: ✅ Código actualizado y listo
- **Último commit**: `80d2248`
- **Deploy Netlify**: ⏸️ Pausado (límite build minutes gratis)
- **CMS Decap**: ✅ Configurado, listo para activar
- **Contenido actual**:
  - 4 historias legacy (en historias-cards-data.js)
  - 1 reportaje MD (modernizacion-canal-maule-sur.md)
  - Total: 5 cards en carousel

### Branch `gh-pages` (GitHub Pages - Desarrollo)
- **Estado**: ✅ Actualizado y sincronizado con main
- **Último commit**: `80d2248` (mismo que main)
- **Deploy GitHub Pages**: ✅ ACTIVO
- **URL principal**: https://fjsantel.github.io/ACM-CONECTA-web/
- **URL sin caché**: https://fjsantel.github.io/ACM-CONECTA-web/test-carousel.html
- **Propósito**: Testing visual/responsive mientras trabajas

## 🔧 Cambios Críticos Implementados

### 1. ✅ Mobile-Nav Eliminado
- **Commit**: `e00ec51`
- **Razón**: Interfería con eventos touch del carousel en mobile
- **Archivos modificados**:
  - `index.html` (152 líneas eliminadas: HTML, CSS, JS)
- **Resultado**: Carousel funciona perfectamente en mobile
- **Documentación**: Ver [PROBLEMA-MOBILE-NAV.md](PROBLEMA-MOBILE-NAV.md)

### 2. ✅ GitHub API Removido del Loader
- **Commit**: `d98fdfe`
- **Razón**: Causaba errores 404 al intentar cargar archivos MD inexistentes
- **Archivos modificados**:
  - `historias-loader.js`
- **Cambio**:
  - Antes: Usaba GitHub API para obtener lista de archivos
  - Ahora: Carga historias legacy + 1 reportaje MD conocido
- **Resultado**: Sin errores 404, carga instantánea

### 3. ✅ Touch Events del Carousel Mejorados
- **Commits**: `0a1d5ad`, `0f7c485`, `8b65867`, `f39718c`
- **Mejoras**:
  - Agregado `stopImmediatePropagation()` para evitar propagación
  - Detección mejorada de tap vs swipe (< 30px, < 300ms = tap)
  - `touch-action: pan-y` en wrapper, `pan-x` en track
  - Navegación activa deshabilitada en mobile (≤ 768px)
- **Archivos modificados**:
  - `historias-cards-carousel.js`
  - `index.html` (CSS y JS)

### 4. ✅ Console Logs de Debug
- **Commit**: `0f7c485`
- **Propósito**: Diagnosticar problemas de tap en mobile
- **Estado**: Aún activos (pueden removerse en producción final)
- **Ubicación**: `historias-cards-carousel.js` líneas 257-273

## 📁 Archivos Importantes

### Nuevos Archivos Creados:
1. **PROBLEMA-MOBILE-NAV.md** - Documentación del problema y solución futura
2. **test-carousel.html** - Copia de index.html sin caché (para testing)
3. **ESTADO-DEPLOY-ACTUAL.md** - Este archivo

### Archivos Modificados:
1. **index.html** - Mobile-nav eliminado, touch-action agregado, nav tracking condicionado
2. **historias-loader.js** - GitHub API removido, usa solo historias legacy
3. **historias-cards-carousel.js** - Touch events mejorados, debugging agregado

## 🔄 WORKFLOW DE DESARROLLO

### Cuando trabajas (desarrollo diario):

```bash
# 1. Haces cambios en archivos
# 2. Commit
git add .
git commit -m "Tu mensaje"

# 3. Push a main (actualiza ambos)
git push origin main

# 4. Merge a gh-pages para ver cambios en tu link
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main
```

### Ver tus cambios:
- **Inmediato**: https://fjsantel.github.io/ACM-CONECTA-web/
- **Si hay caché**: https://fjsantel.github.io/ACM-CONECTA-web/test-carousel.html

### Cuando el cliente active Netlify:
- Los cambios en `main` se deployan automáticamente a https://acmconecta.netlify.app/
- El cliente puede usar el CMS en /admin/

---

## 🌐 LINKS ÚNICOS DEL PROYECTO

### Para TI (Desarrollo):
**Link único**: https://fjsantel.github.io/ACM-CONECTA-web/
- ✅ Gratis
- ✅ Actualizado con cada push a gh-pages
- ❌ Sin CMS

### Para el CLIENTE (Producción):
**Link único**: https://acmconecta.netlify.app/
- ⏸️ Pausado (requiere pago)
- ✅ Con CMS en /admin/
- 💰 ~$19/mes Netlify

**Total**: 2 links, 2 propósitos, 1 repositorio

## ✅ Funcionalidades Verificadas

### Desktop:
- ✅ Carousel con swipe horizontal
- ✅ Navegación activa (nav-pill se mueve según sección)
- ✅ Smooth scroll en links del nav
- ✅ 5 historias/reportajes cargando correctamente
- ✅ Tap en cards abre historias

### Mobile:
- ✅ Carousel con swipe horizontal
- ✅ Tap en cards abre historias (ARREGLADO)
- ✅ Sin scroll involuntario (ARREGLADO)
- ✅ Touch targets de 44x44px
- ✅ Font-size mínimo 16px (previene zoom iOS)
- ❌ No hay menú de navegación (eliminado temporalmente)

## 🐛 Issues Conocidos

### 1. Caché de GitHub Pages
- **Descripción**: `index.html` puede servirse desde caché por 10-30 minutos
- **Solución temporal**: Usar `test-carousel.html` para testing
- **Solución permanente**: Esperar propagación de caché o usar Netlify

### 2. Mobile-Nav Ausente
- **Descripción**: No hay menú hamburguesa en mobile
- **Impacto**: Los usuarios mobile deben hacer scroll manual para navegar
- **Estado**: Eliminado temporalmente
- **Solución futura**: Implementar según [PROBLEMA-MOBILE-NAV.md](PROBLEMA-MOBILE-NAV.md)

### 3. Console Logs Activos
- **Descripción**: Hay console.logs de debug en carousel
- **Impacto**: Mínimo (solo visible en DevTools)
- **Ubicación**: `historias-cards-carousel.js` líneas 257-273, 286
- **Solución**: Remover antes de entrega final al cliente

### 4. Solo 1 Reportaje MD
- **Descripción**: Solo existe `modernizacion-canal-maule-sur.md`
- **Impacto**: Resto de contenido es legacy (hardcoded)
- **Estado**: Normal - el CMS agregará más cuando Netlify reactive
- **Archivos legacy**: 4 historias en `historias-cards-data.js`

## 📋 Checklist Pre-Entrega al Cliente

Cuando Netlify reactive (1 Feb 2026), verificar:

- [ ] Netlify build exitoso
- [ ] CMS accesible en /admin/
- [ ] Crear 2-3 historias de prueba desde CMS
- [ ] Verificar que historias nuevas aparecen en carousel
- [ ] Testing mobile completo:
  - [ ] Tap en cards funciona
  - [ ] Swipe funciona
  - [ ] No hay scroll involuntario
- [ ] Decidir si restaurar mobile-nav (ver PROBLEMA-MOBILE-NAV.md)
- [ ] Remover console.logs de debug
- [ ] Configurar dominio .cl (si aplica)
- [ ] Transferir repo y Netlify a cuenta del cliente

## 📞 Próximos Pasos

### Inmediato (ahora):
1. ✅ Deploy en gh-pages funcionando
2. ✅ Documentación completa creada
3. ⏸️ Esperar reactivación de Netlify (1 Feb 2026)

### Cuando Netlify Reactive (1 Feb):
1. Verificar que deploy funciona
2. Testing completo de CMS
3. Decidir sobre mobile-nav
4. Limpiar console.logs
5. Entrega al cliente

### Opcional (Mejoras Futuras):
1. Restaurar mobile-nav según guía en PROBLEMA-MOBILE-NAV.md
2. Agregar más historias/reportajes desde CMS
3. Configurar dominio personalizado
4. Optimizar imágenes
5. Agregar analytics

## 📚 Documentación Disponible

1. **PROBLEMA-MOBILE-NAV.md** - Guía completa del problema y solución
2. **WORKFLOW-DESARROLLO.md** - Cómo trabajar con branches main/gh-pages
3. **COMO-REACTIVAR-NETLIFY.md** - Qué hacer cuando Netlify reactive
4. **ESTADO-DEPLOY-ACTUAL.md** - Este archivo (estado actual)
5. **SETUP-DECAP-CMS.md** - Configuración original de Decap CMS
6. **ARQUITECTURA-PROYECTO.md** - Arquitectura del proyecto (si existe)

## 🔗 Links Útiles

- **Repositorio GitHub**: https://github.com/fjsantel/ACM-CONECTA-web
- **GitHub Pages**: https://fjsantel.github.io/ACM-CONECTA-web/
- **Netlify (pausado)**: https://acmconecta.netlify.app/
- **Issues**: https://github.com/fjsantel/ACM-CONECTA-web/issues

---

**Última verificación**: 19 Enero 2026
**Próxima revisión**: 1 Febrero 2026 (reactivación Netlify)
**Estado general**: ✅ Funcional y listo para testing
