# 📖 Sistema de Historias Cards con Carrusel

## ✨ Características

- **Carrusel automático** con transiciones suaves
- **Controles de navegación**: botones prev/next, indicadores y teclado
- **Diseño responsive** para desktop, tablet y móvil
- **Fácil de actualizar**: solo edita un archivo de datos
- **Estructura ordenada**: imagen, nombre, ubicación y descripción bien organizados

---

## 📁 Archivos del Sistema

- **historias-cards-data.js** → Datos de las personas (¡edita este archivo!)
- **historias-cards-carousel.js** → Lógica del carrusel (no tocar)
- **historias-cards-ejemplo.js** → Ejemplos y paleta de colores
- **index.html** → Estructura y estilos (ya incluido)

---

## 🚀 Cómo Agregar una Nueva Historia

### 1. Prepara la imagen
- Guarda la foto en la carpeta `fotos/`
- Formato recomendado: JPG o PNG
- Ratio recomendado: 3:4 (vertical)
- Nombre sugerido: `Nombre Apellido.jpg`

### 2. Edita `historias-cards-data.js`

Agrega un nuevo objeto al array `storiesData`:

```javascript
const storiesData = [
    // ... historias existentes ...

    {
        name: "Ana Silva",
        location: "Curicó",
        description: "Transformó 5 hectáreas de secano en un viñedo premium gracias a los fondos CNR.",
        image: "fotos/Ana Silva.jpg",
        gradientColors: "rgba(98, 52, 18, 0.7) 0%, rgba(168, 117, 77, 0.8) 100%"
    }
];
```

### 3. Guarda el archivo
El carrusel se actualizará automáticamente al recargar la página.

---

## 🎨 Cómo Elegir los Colores del Gradiente

El gradiente crea una capa de color sobre la imagen para mejorar la legibilidad.

**Formato:**
```
"rgba(R, G, B, 0.7) 0%, rgba(R, G, B, 0.8) 100%"
```

**Ejemplos de paletas:**

| Color Base | Gradiente |
|-----------|-----------|
| 🟢 Verde tierra | `rgba(45, 80, 22, 0.7) 0%, rgba(127, 176, 105, 0.8) 100%` |
| 🟡 Dorado | `rgba(139, 105, 20, 0.7) 0%, rgba(196, 163, 90, 0.8) 100%` |
| 🔵 Azul agua | `rgba(10, 37, 64, 0.7) 0%, rgba(26, 95, 122, 0.8) 100%` |
| 🟤 Café tierra | `rgba(98, 52, 18, 0.7) 0%, rgba(168, 117, 77, 0.8) 100%` |
| 🔴 Terracota | `rgba(120, 40, 31, 0.7) 0%, rgba(192, 86, 74, 0.8) 100%` |

**Herramienta recomendada para generar colores:**
- [Coolors.co](https://coolors.co/) - Generador de paletas
- [Adobe Color](https://color.adobe.com/) - Explorador de color

---

## ⚙️ Configuración del Carrusel

### Cambiar velocidad del autoplay

Edita `historias-cards-carousel.js`, línea 8:

```javascript
this.autoplayDelay = 5000; // 5 segundos (5000ms)
```

### Desactivar autoplay

Comenta las líneas en `historias-cards-carousel.js`:

```javascript
// this.startAutoplay();

// Pausar autoplay al hacer hover
// this.container.addEventListener('mouseenter', () => this.stopAutoplay());
// this.container.addEventListener('mouseleave', () => this.startAutoplay());
```

---

## 🎯 Controles de Navegación

- **← →** (flechas del teclado): Navegar entre historias
- **Botones circulares**: Prev/Next
- **Indicadores**: Click en cualquier línea para ir directo
- **Hover**: Pausa el autoplay automáticamente

---

## 📱 Responsive

- **Desktop**: Muestra 3 cards a la vez
- **Tablet**: Muestra 2 cards a la vez
- **Móvil**: Muestra 1 card completa

---

## 🐛 Troubleshooting

### Las imágenes no cargan
- Verifica que la ruta en `image` sea correcta
- Asegúrate de que el archivo exista en la carpeta `fotos/`

### El carrusel no aparece
- Verifica que los scripts estén incluidos al final del `index.html`:
  ```html
  <script src="historias-cards-data.js"></script>
  <script src="historias-cards-carousel.js"></script>
  ```

### La descripción no se ve
- Haz hover sobre la card activa
- En móvil, la descripción se muestra automáticamente

---

## 💡 Tips

1. **Imágenes consistentes**: Usa fotos con iluminación y estilo similar
2. **Descripciones breves**: 1-2 líneas máximo para mejor legibilidad
3. **Nombres claros**: Usa nombres completos o "Familia [Apellido]"
4. **Testing**: Prueba en diferentes dispositivos y tamaños de pantalla

---

## 📞 Soporte

¿Necesitas ayuda? Revisa:
- El código comentado en `historias-cards-carousel.js`
- Los ejemplos en `historias-cards-ejemplo.js`
- Consulta con el desarrollador
