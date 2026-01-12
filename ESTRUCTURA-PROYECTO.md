# 📁 Estructura del Proyecto ACM Conecta

## 🗂️ Organización de Archivos

```
ACM CONECTA/
│
├── 📄 index.html                      → Página principal (HTML + CSS inline)
│
├── 🎨 ASSETS
│   ├── fotos/                         → Imágenes de las historias cards
│   │   ├── María González.jpg
│   │   ├── Pedro Muñoz.jpg
│   │   └── Familia Soto.jpg
│   │
│   └── videos/                        → Videos del sitio
│       └── mix agua.mp4
│
├── 💼 HISTORIAS CARDS (Sistema de Carrusel)
│   ├── historias-cards-data.js        → ✏️ DATOS - Edita aquí para agregar personas
│   ├── historias-cards-carousel.js    → 🔧 LÓGICA - No tocar
│   ├── historias-cards-ejemplo.js     → 📘 EJEMPLOS - Paleta de colores y guía
│   └── HISTORIAS-CARDS-README.md      → 📖 DOCUMENTACIÓN - Cómo usar el sistema
│
├── 🧪 TESTING
│   └── test-hover.html                → Prueba del efecto hover
│
└── 📚 DOCUMENTACIÓN
    └── ESTRUCTURA-PROYECTO.md         → Este archivo
```

---

## 📋 Descripción de Archivos

### **Archivos Principales**

| Archivo | Descripción | ¿Editar? |
|---------|-------------|----------|
| `index.html` | Página principal del sitio. Contiene HTML, CSS y JS | ✅ Solo para cambios de estructura |
| `fotos/` | Carpeta con imágenes de personas | ✅ Agrega fotos aquí |
| `videos/` | Carpeta con videos del sitio | ✅ Agrega videos aquí |

### **Sistema Historias Cards**

| Archivo | Descripción | ¿Editar? |
|---------|-------------|----------|
| `historias-cards-data.js` | **DATOS** de las personas (nombre, foto, descripción) | ✅ **SÍ** - Edita aquí |
| `historias-cards-carousel.js` | **LÓGICA** del carrusel (navegación, animaciones) | ❌ **NO** - No tocar |
| `historias-cards-ejemplo.js` | **EJEMPLOS** y paleta de colores | 📘 Solo consulta |
| `HISTORIAS-CARDS-README.md` | **DOCUMENTACIÓN** completa del sistema | 📖 Solo lectura |

---

## 🚀 Guías Rápidas

### ➕ Agregar una Nueva Historia

1. **Agrega la foto** en `fotos/`
   - Formato: JPG o PNG
   - Ratio: 3:4 (vertical)
   - Nombre: `Nombre Apellido.jpg`

2. **Edita** `historias-cards-data.js`
   - Copia el formato de una persona existente
   - Modifica: nombre, ubicación, descripción, imagen y colores

3. **Recarga** la página
   - El carrusel se actualizará automáticamente

**Documentación completa:** `HISTORIAS-CARDS-README.md`

---

### 🎨 Elegir Colores del Gradiente

Consulta `historias-cards-ejemplo.js` para:
- Paleta de colores predefinidos
- Ejemplos de combinaciones
- Tips para elegir colores según la foto

---

### 🔧 Configurar el Carrusel

**Cambiar velocidad del autoplay:**
```javascript
// En historias-cards-carousel.js, línea 26
this.autoplayDelay = 5000; // milisegundos (5000 = 5 segundos)
```

**Cambiar número de cards visibles:**
```javascript
// En historias-cards-carousel.js, línea 28-36
updateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
        this.cardsPerView = 1;  // Móvil: 1 card
    } else if (width <= 1200) {
        this.cardsPerView = 2;  // Tablet: 2 cards
    } else {
        this.cardsPerView = 3;  // Desktop: 3 cards
    }
}
```

---

## 🎯 Flujo de Trabajo Recomendado

### Para Editores de Contenido:
1. Solo edita `historias-cards-data.js`
2. Agrega fotos en `fotos/`
3. Consulta `HISTORIAS-CARDS-README.md` si tienes dudas

### Para Desarrolladores:
1. Estructura HTML/CSS: `index.html`
2. Lógica del carrusel: `historias-cards-carousel.js`
3. Testing: `test-hover.html`

---

## 📦 Nomenclatura de Archivos

Todos los archivos relacionados con el sistema de historias usan el prefijo `historias-cards-`:

- `historias-cards-data.js` → Datos
- `historias-cards-carousel.js` → Carrusel
- `historias-cards-ejemplo.js` → Ejemplos
- `HISTORIAS-CARDS-README.md` → Documentación

**Ventajas:**
- ✅ Fácil de identificar archivos relacionados
- ✅ Se agrupan alfabéticamente
- ✅ Evita confusiones con otros módulos
- ✅ Nomenclatura clara para nuevos colaboradores

---

## 🐛 Troubleshooting

### El carrusel no aparece
→ Verifica que los scripts estén en `index.html`:
```html
<script src="historias-cards-data.js"></script>
<script src="historias-cards-carousel.js"></script>
```

### Las imágenes no cargan
→ Verifica la ruta en `historias-cards-data.js`:
```javascript
image: "fotos/Nombre Apellido.jpg"  // ✅ Correcto
image: "fotos/nombre apellido.jpg"  // ❌ Case-sensitive en algunos servidores
```

### El hover no funciona
→ Limpia el caché del navegador: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows)

---

## 📞 Soporte

¿Necesitas ayuda?

1. **Lee la documentación:** `HISTORIAS-CARDS-README.md`
2. **Consulta los ejemplos:** `historias-cards-ejemplo.js`
3. **Prueba el hover:** `test-hover.html`
4. **Contacta al desarrollador**

---

**Última actualización:** Enero 2026
**Versión:** 1.0
**Proyecto:** ACM Conecta - Asociación Canal Maule
