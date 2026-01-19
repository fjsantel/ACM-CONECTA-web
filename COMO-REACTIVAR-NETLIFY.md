# Cómo Reactivar Netlify y Aplicar Cambios Pendientes

**Fecha:** 19 Enero 2026
**Situación:** Netlify pausado por límite de créditos
**Solución:** Se reactiva automáticamente el 1 de febrero 2026

---

## 🚨 ESTADO ACTUAL

### Netlify está PAUSADO
**Razón:** "This team has exceeded the credit limit"
**Fecha límite:** Se reactiva el **1 de Febrero 2026**

### Cambios pendientes de deploy:
```
✅ Commit 8232354 - CRÍTICO: Arreglar funcionalidad mobile
  - Carousel: threshold swipe 10px→20px, 50px→80px
  - Grid pilares responsive
  - Touch targets 44x44px
  - Padding mobile 20px
  - Font-sizes legibles

✅ Commit 419eda7 - Actualizar historia-template para GitHub API

✅ Commit 2111c7f - Reducir opacidad gradientes (YA DESPLEGADO)
```

**Total de commits pendientes:** 2

---

## 📅 QUÉ PASARÁ EL 1 DE FEBRERO

### Automático (Sin intervención)
1. ✅ Netlify se reactiva automáticamente
2. ✅ Detecta los 2 commits nuevos en `main`
3. ✅ Ejecuta build automático
4. ✅ Despliega nueva versión
5. ✅ Sitio actualizado en ~2 minutos

**NO necesitas hacer nada**, solo esperar.

---

## ✅ CHECKLIST POST-REACTIVACIÓN

### Día 1 de Febrero (o cuando se reactive):

#### 1. Verificar que Netlify está activo
- [ ] Ir a: https://app.netlify.com/sites/acmconecta
- [ ] Verificar que NO dice "Project has been paused"
- [ ] Ver que dice "Published" en verde

#### 2. Verificar nuevo deploy
- [ ] Ir a: https://app.netlify.com/sites/acmconecta/deploys
- [ ] Ver que hay un nuevo deploy en progreso o completado
- [ ] Commit debe ser `8232354` "CRÍTICO: Arreglar funcionalidad mobile"

#### 3. Testear sitio en producción
- [ ] Abrir: https://acmconecta.netlify.app
- [ ] Refrescar con `Ctrl + Shift + R`
- [ ] Verificar que la versión es nueva (ver en consola si hay logs)

#### 4. Testear mobile (CRÍTICO)
- [ ] Abrir sitio en celular
- [ ] Ir a sección "Las voces del Maule"
- [ ] **TAP en una historia** → ¿Se abre correctamente? ✅/❌
- [ ] **SWIPE horizontal** → ¿Cambia de historia? ✅/❌
- [ ] Verificar que padding es de 20px (no 14px)
- [ ] Verificar que textos son legibles (16px mínimo)

#### 5. Testear CMS
- [ ] Ir a: https://acmconecta.netlify.app/admin/
- [ ] **Login con GitHub** → ¿Funciona? ✅/❌
- [ ] Crear historia de prueba
- [ ] Publicar
- [ ] Verificar que aparece en el sitio (esperar 2 min)

#### 6. Verificar reportaje de prueba
- [ ] Abrir sitio
- [ ] Hacer clic en reportaje "Modernización del Canal Maule Sur"
- [ ] **¿Se abre la página completa?** ✅/❌
- [ ] **¿Se muestra todo el contenido?** ✅/❌
- [ ] **¿Las imágenes cargan?** ✅/❌

---

## 🐛 SI ALGO FALLA

### Deploy no se ejecuta automáticamente

**Solución 1: Trigger manual**
```bash
# En tu terminal:
git checkout main
git commit --allow-empty -m "Trigger deploy"
git push origin main
```

**Solución 2: Desde Netlify**
1. Ir a: https://app.netlify.com/sites/acmconecta/deploys
2. Click en "Trigger deploy" → "Deploy site"

### Mobile sigue sin funcionar correctamente

**Verificar que desplegó la versión correcta:**
1. Abrir sitio en celular
2. Abrir consola del navegador (Chrome mobile: Menú → More tools → Developer tools)
3. Buscar en consola: "🔍 Obteniendo lista de historias desde GitHub..."
4. Si NO aparece, significa que desplegó versión antigua

**Solución:**
```bash
# Forzar nuevo deploy
git checkout main
git pull origin main
git push origin main --force
```

### CMS no funciona (error de login)

**Posibles causas:**
1. Variables de entorno perdidas
2. OAuth App desconfigurada

**Verificar variables de entorno:**
1. Ir a: https://app.netlify.com/sites/acmconecta/configuration/env
2. Verificar que existen:
   - `GITHUB_CLIENT_ID=Ov23ctgqSy6PKYQZik6D`
   - `GITHUB_CLIENT_SECRET=[debe estar configurado]`

**Si faltan, re-crear:**
```
Key: GITHUB_CLIENT_ID
Value: Ov23ctgqSy6PKYQZik6D
Scopes: All scopes

Key: GITHUB_CLIENT_SECRET
Value: [ver en GitHub Settings → Developer settings → OAuth Apps]
Scopes: All scopes
Secret: ✓ (marcar)
```

### Gradientes muy oscuros

**Esto es normal si desplegó commit antiguo**

Verificar versión:
```bash
git log --oneline -1
# Debe mostrar: 8232354 o más reciente
```

Si es anterior, forzar redeploy (ver arriba).

---

## 💰 EVITAR FUTURAS PAUSAS

### Opciones:

#### Opción A: Usar GitHub Pages para desarrollo
- Testear cambios en: https://fjsantel.github.io/ACM-CONECTA-web/
- Solo usar Netlify para producción final
- Ver: `WORKFLOW-DESARROLLO.md`

#### Opción B: Optimizar builds de Netlify
- Usar Netlify solo para deploy final
- Desarrollo en local: `npx http-server`
- Menos builds = menos créditos usados

#### Opción C: Upgrade a plan Pro ($19/mes)
- 300 build minutes/mes (vs 100 en free)
- Recomendado si cliente usa CMS frecuentemente

---

## 📊 MONITOREO DE USO

### Ver créditos restantes:
1. Ir a: https://app.netlify.com/teams/[tu-team]/billing
2. Ver sección "Build minutes"
3. Idealmente mantener < 80% de uso mensual

### Calcular uso:
- Cada deploy = ~1 minuto de build
- Plan Free = 100 minutos/mes
- Si haces 3 deploys al día = 90 minutos/mes (OK)
- Si haces 5+ deploys al día = pausará

---

## 🎯 RESUMEN EJECUTIVO

**Qué hacer el 1 de Febrero:**

1. ✅ Netlify se reactiva solo
2. ✅ Esperar 2 minutos a que despliegue
3. ✅ Testear mobile: tap y swipe
4. ✅ Testear CMS: login y crear contenido
5. ✅ Verificar reportaje abre correctamente

**Si algo falla:**
- Trigger deploy manual
- Verificar variables de entorno
- Forzar push a main

**Prevenir futuras pausas:**
- Usar GitHub Pages para testing
- Solo Netlify para producción
- O upgrade a plan Pro

---

## 📞 CONTACTOS ÚTILES

**Netlify Support:**
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support/

**Repositorio:**
- GitHub: https://github.com/fjsantel/ACM-CONECTA-web
- Issues: https://github.com/fjsantel/ACM-CONECTA-web/issues

**URLs del Proyecto:**
- Producción: https://acmconecta.netlify.app
- Admin: https://acmconecta.netlify.app/admin/
- Testing: https://fjsantel.github.io/ACM-CONECTA-web/

---

**Última actualización:** 19 Enero 2026
**Próxima revisión:** 1 Febrero 2026
