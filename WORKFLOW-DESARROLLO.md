# Workflow de Desarrollo - ACM Conecta

**Fecha:** 19 Enero 2026
**Propósito:** Guía clara para trabajar con dos entornos (GitHub Pages + Netlify)

---

## 🌳 ESTRUCTURA DE BRANCHES

### `main` - PRODUCCIÓN CON CMS (Netlify)
**URL:** https://acmconecta.netlify.app
**Contiene:**
- ✅ Todo el código completo
- ✅ CMS (Decap) configurado
- ✅ Netlify Functions (OAuth)
- ✅ Variables de entorno
- ✅ Sistema completo funcional

**Cuándo usar:**
- Desarrollo de nuevas features del CMS
- Agregar nuevas colecciones
- Cambios en contenido desde el CMS
- Deploy a producción final

**Deploy:**
- Automático cuando haces `git push origin main`
- Netlify detecta el push y despliega
- Tarda ~1-2 minutos

### `gh-pages` - TESTING VISUAL (GitHub Pages)
**URL:** https://fjsantel.github.io/ACM-CONECTA-web/
**Contiene:**
- ✅ Solo archivos estáticos (HTML, CSS, JS)
- ✅ Sin carpeta `netlify/`
- ✅ Sin configuración de CMS
- ⚠️ CMS NO funciona aquí

**Cuándo usar:**
- Testear cambios visuales/responsive
- Debugging de CSS/JavaScript
- Cuando Netlify está pausado
- Preview rápido sin gastar build minutes

**Deploy:**
- Automático cuando haces `git push origin gh-pages`
- GitHub Pages despliega automáticamente
- Tarda ~30 segundos

---

## 🔄 FLUJO DE TRABAJO DIARIO

### Escenario 1: Cambios Visuales (CSS/HTML)

```bash
# 1. Trabajar en main
git checkout main
git pull origin main

# 2. Hacer cambios en index.html, CSS, etc.
# (editar archivos)

# 3. Commit
git add .
git commit -m "Descripción del cambio"

# 4. Push a main (se desplegará en Netlify cuando se reactive)
git push origin main

# 5. SI NECESITAS TESTEAR AHORA (Netlify pausado):
# Copiar cambios a gh-pages
git checkout gh-pages
git merge main
git push origin gh-pages

# 6. Volver a main
git checkout main
```

### Escenario 2: Cambios en el CMS

```bash
# 1. SOLO trabajar en main
git checkout main
git pull origin main

# 2. Editar archivos del CMS
# - admin/config.yml
# - netlify/functions/
# - historias-loader.js

# 3. Commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# 4. NO COPIAR A GH-PAGES
# (gh-pages es solo visual, no tiene CMS)
```

### Escenario 3: Testear Mobile AHORA (Netlify pausado)

```bash
# 1. Hacer cambios en main
git checkout main
# (hacer cambios)
git add .
git commit -m "Fix responsive mobile"
git push origin main

# 2. Copiar a gh-pages para testear
git checkout gh-pages
git merge main
git push origin gh-pages

# 3. Abrir en celular:
# https://fjsantel.github.io/ACM-CONECTA-web/

# 4. Volver a main
git checkout main
```

---

## ⚠️ REGLAS IMPORTANTES

### ✅ HACER:
- Siempre trabajar cambios en `main` primero
- Hacer commits descriptivos
- Testear localmente antes de push
- Mergear de `main` a `gh-pages` cuando necesites preview
- Mantener `main` como source of truth

### ❌ NO HACER:
- Nunca hacer cambios directamente en `gh-pages`
- Nunca mergear de `gh-pages` a `main`
- Nunca borrar carpeta `netlify/` de `main`
- Nunca borrar `admin/` de `main`
- No hacer commits separados en cada branch (siempre desde main)

---

## 🔧 COMANDOS ÚTILES

### Ver en qué branch estás
```bash
git branch
# El branch actual tiene un *
```

### Cambiar de branch
```bash
git checkout main
# o
git checkout gh-pages
```

### Ver diferencias entre branches
```bash
git diff main gh-pages
```

### Ver commits pendientes de deploy
```bash
git log origin/main..main
# Muestra commits que están en local pero no en GitHub
```

### Forzar sync de gh-pages con main
```bash
git checkout gh-pages
git reset --hard main
git push origin gh-pages --force
```

---

## 📊 TABLA DE DECISIÓN

| Necesito... | Branch | Comando |
|-------------|--------|---------|
| Agregar nueva colección al CMS | `main` | `git checkout main` |
| Cambiar colores/fonts | `main` → `gh-pages` | Merge después |
| Arreglar bug responsive | `main` → `gh-pages` | Merge después |
| Testear mobile AHORA | `gh-pages` | Merge desde main |
| Deploy a producción | `main` | Solo push |
| Modificar OAuth | `main` | SOLO main |

---

## 🚀 CUANDO NETLIFY SE REACTIVE (1 Febrero)

### Paso 1: Verificar que main está actualizado
```bash
git checkout main
git pull origin main
git log --oneline -5
# Deberías ver todos tus commits recientes
```

### Paso 2: Netlify desplegará automáticamente
- Ir a: https://app.netlify.com/sites/acmconecta/deploys
- Verás un nuevo deploy automático
- Esperar ~1-2 minutos
- Sitio actualizado en: https://acmconecta.netlify.app

### Paso 3: Verificar que CMS funciona
- Ir a: https://acmconecta.netlify.app/admin/
- Login con GitHub
- Crear una historia de prueba
- Verificar que se guarda correctamente

### Paso 4: (Opcional) Eliminar gh-pages
Si ya no necesitas GitHub Pages:
```bash
git branch -d gh-pages
git push origin --delete gh-pages
```

---

## 🆘 TROUBLESHOOTING

### "No puedo cambiar de branch, tengo cambios sin guardar"
```bash
# Guardar cambios temporalmente
git stash

# Cambiar de branch
git checkout gh-pages

# Recuperar cambios (opcional)
git stash pop
```

### "Merge conflicts al mergear main a gh-pages"
```bash
# Si pasa esto, simplemente forzar:
git checkout gh-pages
git reset --hard main
git push origin gh-pages --force
```

### "¿En qué branch estoy?"
```bash
git branch
# El que tiene * es el actual
```

### "Quiero deshacer el último commit"
```bash
git reset --soft HEAD~1
# Mantiene los cambios, solo deshace el commit
```

---

## 📝 CHECKLIST ANTES DE PUSH

Antes de cada `git push`, verificar:

- [ ] ¿Estoy en el branch correcto?
- [ ] ¿He probado los cambios localmente?
- [ ] ¿El commit message es descriptivo?
- [ ] ¿Los cambios son solo visuales o afectan al CMS?
- [ ] Si afecta CMS: ¿estoy en `main`?
- [ ] Si solo visual: ¿necesito copiar a `gh-pages`?

---

## 🎯 RESUMEN RÁPIDO

**Para desarrollo normal:**
```bash
git checkout main
# hacer cambios
git add .
git commit -m "Descripción"
git push origin main
```

**Para testear en GitHub Pages:**
```bash
git checkout gh-pages
git merge main
git push origin gh-pages
# Abrir: https://fjsantel.github.io/ACM-CONECTA-web/
git checkout main
```

**URLs importantes:**
- Producción (CMS): https://acmconecta.netlify.app
- Testing: https://fjsantel.github.io/ACM-CONECTA-web/
- Admin CMS: https://acmconecta.netlify.app/admin/
- Netlify Dashboard: https://app.netlify.com/sites/acmconecta
- GitHub Repo: https://github.com/fjsantel/ACM-CONECTA-web

---

**Última actualización:** 19 Enero 2026
**Mantener este documento actualizado con cambios en el workflow**
