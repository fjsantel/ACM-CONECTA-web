# Problema Mobile-Nav y Solución

## 📋 Resumen del Problema

El **mobile-nav** (menú hamburguesa en dispositivos móviles) estaba causando interferencia masiva con los eventos touch del carousel, haciendo que:

- ❌ Los taps en las cards del carousel no abrieran las historias
- ❌ Tocar cualquier parte del sitio causaba scroll involuntario hacia anclas
- ❌ Los eventos touch se interpretaban como navegación en lugar de clicks

## 🔍 Causa Raíz Identificada

El problema tenía múltiples capas:

### 1. **Anclas HTML en Mobile-Nav**
```html
<!-- PROBLEMÁTICO -->
<nav class="mobile-nav">
    <a href="#inicio">Inicio</a>
    <a href="#pilares">Pilares</a>
    <a href="#webserie">Web Serie</a>
    <a href="#historias">Historias</a>
    <a href="#recursos">Recursos</a>
    <a href="#contacto">Contacto</a>
</nav>
```

Los links con `href="#historias"` causaban que el navegador mobile interpretara CUALQUIER touch como un intento de navegación a esas anclas.

### 2. **Scroll Behavior Smooth Global**
```css
html {
    scroll-behavior: smooth;
}
```

Combinado con las anclas, esto hacía que cualquier cambio de hash activara scroll suave, interfiriendo con el carousel.

### 3. **Event Listeners Globales**
```javascript
// Script de navegación activa que se ejecutaba en mobile
window.addEventListener('scroll', () => {
    // Actualizaba nav-pill según scroll position
    // Se ejecutaba CONSTANTEMENTE en mobile
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Bloqueaba navegación normal
        // Smooth scroll...
    });
});
```

Estos listeners capturaban eventos antes que el carousel pudiera procesarlos.

### 4. **Mobile-Menu-Overlay con z-index Alto**
```css
.mobile-menu-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 999;
    /* Aunque tenía display: none, aún podía interceptar eventos */
}
```

Incluso inactivo, el overlay podía interferir con eventos touch.

## ✅ Solución Temporal (Estado Actual)

**Se eliminó completamente el mobile-nav:**

### Archivos modificados:
- **index.html**: Eliminado HTML, CSS y JavaScript del mobile-nav
- **Commits**:
  - `e00ec51` - ELIMINAR: Mobile-nav completo (HTML, CSS, JS)
  - `bd1f374` - Agregar test-carousel.html - archivo nuevo sin caché

### Resultado:
- ✅ Carousel funciona perfectamente en mobile
- ✅ Taps abren historias correctamente
- ✅ Swipes cambian slides
- ✅ Sin scroll involuntario
- ❌ No hay menú de navegación en mobile (solo scroll manual)

## 🔧 Solución Permanente - Cómo Implementar Mobile-Nav Correctamente

Si necesitas restaurar el mobile-nav en el futuro, sigue estas guías:

### **1. NO usar anclas HTML directas**

❌ **MAL:**
```html
<nav class="mobile-nav">
    <a href="#historias">Historias</a>
</nav>
```

✅ **BIEN - Opción A: Usar JavaScript void**
```html
<nav class="mobile-nav">
    <a href="javascript:void(0)" data-target="historias">Historias</a>
</nav>
```

✅ **BIEN - Opción B: Usar buttons**
```html
<nav class="mobile-nav">
    <button data-target="historias">Historias</button>
</nav>
```

### **2. Manejar scroll 100% con JavaScript**

```javascript
const mobileNavLinks = document.querySelectorAll('.mobile-nav [data-target]');

mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Cerrar menú primero
            closeMobileMenu();

            // Scroll después de un pequeño delay
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
});

function closeMobileMenu() {
    document.getElementById('mobileMenuToggle').classList.remove('active');
    document.getElementById('mobileMenuOverlay').classList.remove('active');
    document.body.style.overflow = '';
}
```

### **3. Asegurar pointer-events correcto**

```css
.mobile-menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: none; /* O visibility: hidden */
    pointer-events: none; /* CRÍTICO: no intercepta clicks cuando inactivo */
    opacity: 0;
    transition: opacity 0.3s ease;
}

.mobile-menu-overlay.active {
    display: block; /* O visibility: visible */
    pointer-events: auto; /* Solo permite clicks cuando está abierto */
    opacity: 1;
}
```

### **4. Condicionar navegación activa solo para desktop**

```javascript
const isDesktop = () => window.innerWidth > 768;

// Scroll listener - SOLO desktop
window.addEventListener('scroll', () => {
    if (!isDesktop()) return; // No ejecutar en mobile

    // Actualizar nav-pill según sección activa...
});

// Click handlers - comportamiento diferente según dispositivo
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!isDesktop()) {
            // En mobile: dejar navegación default de anclas
            return;
        }

        // En desktop: preventDefault y smooth scroll
        e.preventDefault();
        // ...smooth scroll logic
    });
});
```

### **5. Usar touch-action para evitar conflictos**

```css
/* En el carousel */
.stories-carousel-wrapper {
    touch-action: pan-y; /* Solo scroll vertical de página */
}

.stories-carousel-track {
    touch-action: pan-x; /* Solo swipe horizontal del carousel */
}

/* En el mobile-menu-overlay */
.mobile-menu-overlay {
    touch-action: none; /* No permite gestures del navegador */
}

.mobile-nav {
    touch-action: auto; /* Permite clicks normales en links */
}
```

## 📝 Checklist de Implementación

Cuando implementes el mobile-nav, verifica:

- [ ] **No hay anclas HTML** (`href="#..."`) en mobile-nav
- [ ] **Scroll es 100% JavaScript** usando `scrollIntoView()` o `scrollTo()`
- [ ] **pointer-events: none** cuando overlay está inactivo
- [ ] **z-index no interfiere** con carousel (carousel > mobile-nav cuando activo)
- [ ] **touch-action configurado** correctamente en ambos elementos
- [ ] **Event listeners condicionados** - diferentes para mobile vs desktop
- [ ] **Navegación activa deshabilitada** en mobile (scroll listener)
- [ ] **stopPropagation() usado** en handlers críticos del carousel

## 🧪 Testing

Después de implementar, prueba en mobile real:

1. **Tap en carousel** → debe abrir historia (no scroll)
2. **Swipe en carousel** → debe cambiar slides (no abrir historia)
3. **Abrir mobile menu** → debe mostrar overlay
4. **Click en link del menu** → debe cerrar menu y hacer scroll suave
5. **Tocar fuera del carousel** → NO debe causar scroll involuntario
6. **Scroll vertical normal** → debe funcionar sin interferencia

## 📚 Archivos Relacionados

- `index.html` - HTML principal (mobile-nav eliminado en líneas 1787-1812)
- `historias-cards-carousel.js` - Lógica de carousel con touch events
- `WORKFLOW-DESARROLLO.md` - Guía de desarrollo del proyecto
- `test-carousel.html` - Versión de prueba sin mobile-nav (funcional)

## 🔗 Referencias

- **Commits importantes**:
  - `8b65867` - FIX CRÍTICO MOBILE: Deshabilitar nav tracking
  - `f39718c` - CRÍTICO MOBILE: Agregar touch-action CSS
  - `e00ec51` - ELIMINAR: Mobile-nav completo

- **Branches**:
  - `main` - Código de producción (sin mobile-nav)
  - `gh-pages` - Deploy en GitHub Pages

## ⚠️ Notas Importantes

1. **No usar comentarios HTML** para deshabilitar - elimina completamente o implementa correctamente
2. **GitHub Pages tiene caché agresivo** - usa `test-carousel.html` o espera 10-30 minutos
3. **Mobile-nav es opcional** - el sitio funciona perfectamente sin él (scroll manual)
4. **Si restauras mobile-nav**, DEBE pasar todos los tests de arriba antes de deploy

---

**Fecha de documentación**: 19 de Enero 2026
**Estado actual**: Sitio funcional sin mobile-nav
**Próximo paso**: Implementar mobile-nav corregido según guías de arriba (opcional)
