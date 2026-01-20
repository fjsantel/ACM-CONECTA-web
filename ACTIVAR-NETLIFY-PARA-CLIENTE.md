# Cómo Activar Netlify para el Cliente

## 📋 Situación Actual

**Estado**: ⏸️ Netlify PAUSADO por límite de uso gratuito
**Mensaje**: "Site not available - This site was paused as it reached its usage limits"
**Link**: https://acmconecta.netlify.app/
**Tu link funcional**: https://fjsantel.github.io/ACM-CONECTA-web/

---

## 💰 Opciones para Reactivar

### Opción 1: Esperar a que se renueven los build minutes GRATIS
- **Cuándo**: 1 de Febrero 2026 (inicio del nuevo mes)
- **Límite gratis**: 300 build minutes/mes
- **Costo**: $0
- **Recomendado para**: Testing inicial del CMS

**Qué hacer el 1 de Febrero:**
1. Entrar a Netlify
2. El sitio se reactivará automáticamente
3. Verificar que funciona (ver checklist abajo)

### Opción 2: Contratar plan PAGADO de Netlify (Recomendado)
- **Plan**: Starter ($19/mes)
- **Build minutes**: Ilimitados
- **Bandwidth**: 100 GB/mes
- **Costo**: $19 USD/mes
- **Recomendado para**: Producción real con el cliente

---

## 🚀 Pasos para Activar con Plan Pagado

### 1. Entrar a Netlify
```
https://app.netlify.com/
```
- Login con tu cuenta
- O con la cuenta del cliente (si ya la tiene)

### 2. Ir a Billing
1. Click en tu avatar (esquina superior derecha)
2. Click en "Team settings"
3. Click en "Billing"

### 3. Seleccionar Plan Starter
1. Click en "Upgrade plan"
2. Seleccionar "Starter - $19/month"
3. Agregar método de pago (tarjeta de crédito)
4. Confirmar

### 4. Verificar Reactivación
Después de 2-3 minutos:
1. Ir a: https://acmconecta.netlify.app/
2. Debería cargar el sitio correctamente
3. Probar CMS: https://acmconecta.netlify.app/admin/

---

## ✅ Checklist de Verificación Post-Reactivación

Una vez que Netlify esté activo nuevamente:

### Testing Básico:
- [ ] El sitio carga en https://acmconecta.netlify.app/
- [ ] El carousel muestra las 5 historias
- [ ] Clicks en desktop funcionan
- [ ] Taps en mobile funcionan (abren historias)
- [ ] Swipes en mobile funcionan (cambian slides)

### Testing del CMS:
- [ ] CMS carga en https://acmconecta.netlify.app/admin/
- [ ] Puedes hacer login con GitHub
- [ ] Puedes ver las colecciones "Historias" y "Reportajes"
- [ ] Puedes crear una historia de prueba
- [ ] La historia aparece en el carousel
- [ ] Puedes editar la historia existente
- [ ] Puedes subir imágenes

### Testing Mobile:
- [ ] El sitio se ve bien en mobile
- [ ] Carousel funciona (taps y swipes)
- [ ] No hay scroll involuntario
- [ ] Imágenes cargan correctamente

---

## 🔧 Configuración para el Cliente

Cuando el cliente esté listo para administrar su propio sitio:

### 1. Transferir Sitio a Cuenta del Cliente

**Opción A: Cliente crea su cuenta Netlify**
```
1. Cliente se registra en https://netlify.com
2. En Netlify, ir a: Site Settings → General → Transfer site ownership
3. Ingresar email del cliente
4. Cliente acepta la transferencia
5. Cliente configura su método de pago
```

**Opción B: Mantener en tu cuenta y facturar al cliente**
- Tú pagas los $19/mes a Netlify
- Le cobras al cliente $19/mes (o lo que acuerden)
- Más simple para el cliente (no necesita cuenta Netlify)

### 2. Dar Acceso al CMS

El cliente necesitará:
1. **Cuenta GitHub** (si no tiene, crear en https://github.com)
2. **Agregar como colaborador** al repositorio:
   ```
   GitHub → Settings → Collaborators → Add people
   Email del cliente
   ```
3. **Configurar OAuth App** para el nuevo usuario (si es necesario)

### 3. Configurar Dominio Personalizado (Opcional)

Si el cliente quiere un dominio como `www.acmconecta.cl`:

1. Cliente compra dominio .cl en NIC Chile o similar
2. En Netlify: Site Settings → Domain management → Add custom domain
3. Agregar: `www.acmconecta.cl` y `acmconecta.cl`
4. Netlify dará las DNS records a configurar
5. En el proveedor del dominio, configurar DNS:
   ```
   A record:    @ → 75.2.60.5
   CNAME:       www → [tu-sitio].netlify.app
   ```
6. Esperar propagación DNS (24-48 horas)
7. Netlify configurará SSL automáticamente

---

## 💡 Recomendaciones

### Para Desarrollo/Testing (Ahora):
✅ **Usar tu link de GitHub Pages**: https://fjsantel.github.io/ACM-CONECTA-web/
- Gratis
- Actualizado en tiempo real
- Perfecto para mostrar avances al cliente

### Para Producción con Cliente:
✅ **Activar Netlify con plan pagado**
- Cliente necesita el CMS para administrar contenido
- Link profesional: acmconecta.netlify.app
- Posibilidad de dominio personalizado .cl

### Flujo Recomendado:
1. **Mostrar al cliente** usando GitHub Pages
2. **Cliente aprueba el sitio** y quiere el CMS
3. **Cliente contrata Netlify** ($19/mes)
4. **Tú transfieres el sitio** a su cuenta
5. **Cliente administra su contenido** desde el CMS

---

## 📞 Contacto con el Cliente

Cuando presentes el proyecto, explica:

### Dos Opciones de Hosting:

**Opción 1: Solo Sitio Web (Sin CMS)**
- Costo: Gratis (GitHub Pages)
- Link: https://fjsantel.github.io/ACM-CONECTA-web/
- Contenido: Lo actualizas tú manualmente
- Ideal para: Sitio estático que no cambia mucho

**Opción 2: Sitio + CMS (Recomendado)**
- Costo: $19 USD/mes (Netlify)
- Link: https://acmconecta.netlify.app/ (+ dominio .cl opcional)
- Contenido: Cliente lo actualiza desde /admin/
- Ideal para: Cliente quiere autonomía para agregar historias/reportajes

### Script para el Cliente:
> "El sitio está funcionando perfectamente en GitHub Pages de forma gratuita.
> Si quieren poder administrar el contenido ustedes mismos (agregar historias,
> cambiar fotos, etc.) sin depender de mí, necesitamos activar el CMS.
> Esto tiene un costo de $19 dólares al mes en Netlify.
> También podemos configurar un dominio .cl propio como www.acmconecta.cl
> (el dominio se contrata aparte, cuesta alrededor de $8.000 pesos chilenos al año).
>
> ¿Qué prefieren? ¿Quieren manejar el contenido ustedes o prefiero manejarlo yo?"

---

## 🐛 Solución de Problemas

### Netlify sigue pausado después de pagar:
1. Esperar 5 minutos (propagación)
2. Hacer un "Clear cache and deploy site" en Netlify
3. Si persiste, contactar soporte de Netlify

### CMS no carga después de reactivar:
1. Verificar variables de entorno en Netlify:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
2. Verificar que OAuth App esté activa en GitHub
3. Probar en modo incógnito (limpiar cookies)

### Sitio carga pero sin historias nuevas:
1. Verificar que archivos .md existen en `content/historias/`
2. Hacer un nuevo deploy en Netlify (trigger deploy)
3. Limpiar caché del navegador

---

## 📚 Documentos Relacionados

- [ESTADO-DEPLOY-ACTUAL.md](ESTADO-DEPLOY-ACTUAL.md) - Estado completo del proyecto
- [COMO-REACTIVAR-NETLIFY.md](COMO-REACTIVAR-NETLIFY.md) - Checklist técnico
- [PROBLEMA-MOBILE-NAV.md](PROBLEMA-MOBILE-NAV.md) - Si necesitas restaurar mobile-nav
- [WORKFLOW-DESARROLLO.md](WORKFLOW-DESARROLLO.md) - Tu workflow diario

---

**Última actualización**: 19 Enero 2026
**Estado Netlify**: ⏸️ Pausado (esperando pago o renovación mensual)
**Tu link activo**: https://fjsantel.github.io/ACM-CONECTA-web/
