# ⚡ PROBAR CMS AHORA (Sin configurar nada)

## 🚀 Prueba en 2 minutos

### Paso 1: Instalar Decap Server (solo una vez)
```bash
npm install -g decap-server
```

### Paso 2: Iniciar servidor local
```bash
cd "/Users/franciscosantelicesariztia/Documents/EMPRESA FSA/CCOMUNICA/Asociación Canal Maule/web /ACM CONECTA"

# Iniciar el servidor CMS
decap-server &

# Iniciar servidor web
python -m http.server 8080
```

### Paso 3: Abrir CMS
Abre en tu navegador:
```
http://localhost:8080/admin
```

### Paso 4: Usar el CMS
1. Haz clic en "Login" (no pide contraseña en modo test)
2. Ve a "Historias - Entrevista" o "Historias - Reportaje Extenso"
3. Crea una historia de prueba
4. Guarda
5. Verás que se crea un archivo en `content/historias/` o `content/reportajes/`

---

## 🌐 Para Producción (GitHub Pages o .cl)

Cuando estés listo para producción, solo cambias 3 líneas en `admin/config.yml`:

```yaml
backend:
  name: github
  repo: fjsantel/ACM-CONECTA-web
  branch: main
  # Para .cl en el futuro, solo cambias el repo si es necesario
```

**TODO LO DEMÁS QUEDA IGUAL** - Las rutas son relativas y funcionan en cualquier dominio.

---

## 📋 Configuración para Producción

### Opción 1: Netlify (Recomendado - 5 min)
1. Conecta el repo en Netlify
2. Habilita Identity + Git Gateway
3. Listo - funciona en `tudominio.netlify.app` y luego puedes usar tu `.cl`

### Opción 2: Dominio .cl directo
1. Apunta tu dominio .cl a GitHub Pages o Netlify
2. Actualiza `admin/config.yml` con OAuth si usas GitHub Pages
3. Listo

---

## ✅ Ventajas de esta configuración

- ✅ Funciona en localhost (AHORA)
- ✅ Funciona en GitHub Pages (prueba)
- ✅ Funcionará en .cl (producción)
- ✅ No necesitas cambiar código al migrar
- ✅ Rutas relativas - no hay hardcoded domains

---

## 🎯 Resumen

**AHORA**: Modo test local - prueba todo
**LUEGO**: Cambias 3 líneas en config.yml para producción
**DESPUÉS**: Apuntas tu .cl al hosting (GitHub Pages o Netlify)

**¡Pruébalo ahora!** 👆
