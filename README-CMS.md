# 📝 Sistema de Gestión de Historias - ACM Conecta

## 🎯 Resumen

Sistema CMS con Decap para gestionar historias sin tocar código. Funciona en **cualquier dominio** (localhost, GitHub Pages, Netlify, o .cl).

---

## ⚡ Prueba Rápida (AHORA - 2 minutos)

### Instalar dependencias (solo una vez)
```bash
npm install -g decap-server
```

### Iniciar servidores
```bash
# Terminal 1: CMS Backend
decap-server

# Terminal 2: Web Server
python -m http.server 8080
```

### Abrir CMS
```
http://localhost:8080/admin
```

**Haz clic en "Login"** (modo test, no pide contraseña)

---

## 📂 Estructura del Proyecto

```
/
├── admin/
│   ├── index.html              # Interfaz CMS
│   └── config.yml              # Configuración (2 tipos de historias)
├── content/
│   ├── historias/              # Historias entrevista (.md)
│   └── reportajes/             # Reportajes extensos (.md)
├── fotos/                      # Imágenes
├── historias-cards-data.js     # Historias legacy (JS) - MANTENER
├── historias-loader.js         # Loader unificado MD + JS
├── historia-template.html      # Template entrevista
├── reportaje-template.html     # Template reportaje
└── index.html                  # Home con carrusel
```

---

## 📝 Dos Tipos de Historias

### 1. Historias - Entrevista
- Formato Q&A
- Foto + galería
- Edad, ocupación, ubicación
- Cita destacada

### 2. Historias - Reportaje Extenso
- Contenido largo tipo revista
- Editor Markdown
- Múltiples imágenes con pies de foto
- Autor y fecha

---

## 🌐 Migrar a Producción

### Para GitHub Pages

Edita `admin/config.yml`:
```yaml
backend:
  name: github
  repo: fjsantel/ACM-CONECTA-web
  branch: main
```

Luego necesitas OAuth (ver opción Netlify abajo - más fácil).

### Para Netlify (Recomendado)

1. **Conectar repo**:
   - https://app.netlify.com/signup
   - Import project → GitHub → ACM-CONECTA-web

2. **Habilitar Identity**:
   - Site settings → Identity → Enable Identity
   - Services → Git Gateway → Enable

3. **Invitarte**:
   - Identity tab → Invite users → tu email

4. **Acceder**:
   - `https://tu-sitio.netlify.app/admin`

### Para dominio .cl

**Opción A**: Apuntar .cl a Netlify
```
CNAME: tu-sitio.netlify.app
```

**Opción B**: Apuntar .cl a GitHub Pages
```
CNAME: fjsantel.github.io
```

**NO necesitas cambiar código** - Las rutas son relativas.

---

## 🔄 Sistema Retrocompatible

- ✅ Historias en `historias-cards-data.js` siguen funcionando
- ✅ Nuevas historias se crean en Markdown
- ✅ El loader combina ambas fuentes
- ✅ Prioridad: Markdown > JS

---

## 🎨 Características del CMS

- Editor visual sin código
- Upload de imágenes drag & drop
- Selector de colores predefinidos
- Preview en tiempo real
- Control de versiones (Git)
- Workflow editorial

---

## 📖 Guía de Uso para Cliente

Ver: [DECAP-CMS-GUIA.md](DECAP-CMS-GUIA.md)

---

## 🚀 Roadmap de Implementación

### Fase 1: Prueba Local (AHORA) ✅
- Modo test-repo
- Probar creación de historias
- Validar templates

### Fase 2: GitHub Pages (Prueba Online)
- Configurar OAuth con Netlify
- Publicar en fjsantel.github.io
- Probar con cliente

### Fase 3: Producción (.cl)
- Apuntar dominio .cl
- Configuración final
- Capacitación cliente

---

## 🔧 Troubleshooting

### CMS no carga
```bash
# Verificar que ambos servidores estén corriendo
ps aux | grep "decap-server"
ps aux | grep "python"
```

### Cambios no aparecen
- Refresca con `Ctrl + Shift + R` (hard reload)
- Verifica que el loader esté incluido en index.html

### Imágenes no cargan
- Verifica que estén en `/fotos/`
- Rutas son relativas: `fotos/imagen.jpg`

---

## 📞 Soporte

- Documentación completa: [DECAP-CMS-GUIA.md](DECAP-CMS-GUIA.md)
- Decap Docs: https://decapcms.org/docs/
- Issues: https://github.com/decaporg/decap-cms/issues

---

## ✅ Checklist de Migración a .cl

- [ ] Probar localmente (localhost:8080/admin)
- [ ] Crear 2-3 historias de prueba
- [ ] Verificar que aparecen en el carrusel
- [ ] Configurar Netlify + Identity
- [ ] Probar en Netlify (tudominio.netlify.app)
- [ ] Apuntar .cl a Netlify
- [ ] Capacitar al cliente
- [ ] Documentar credenciales de acceso

---

**🎉 Sistema listo para usar en cualquier entorno**
