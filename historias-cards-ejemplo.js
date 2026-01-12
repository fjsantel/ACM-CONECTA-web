/*
 * 📝 EJEMPLO: Cómo agregar una nueva historia
 *
 * Copia este código y pégalo en stories-data.js dentro del array storiesData
 */

// PASO 1: Asegúrate de tener la imagen en la carpeta fotos/
// Por ejemplo: fotos/Juan-Ramirez.jpg

// PASO 2: Copia este bloque y ajusta los valores:

{
    // Nombre completo de la persona
    name: "Juan Ramírez",

    // Ciudad o comuna
    location: "Linares",

    // Breve descripción de su historia (1-2 líneas)
    description: "Recuperó 200 acciones de agua familiar e instaló riego tecnificado en sus 12 hectáreas de cerezos.",

    // Ruta de la imagen (relativa a index.html)
    image: "fotos/Juan-Ramirez.jpg",

    // Gradiente de color (puedes usar uno de los ejemplos del README o crear el tuyo)
    // Formato: "rgba(R, G, B, opacidad) posición%, rgba(R, G, B, opacidad) posición%"
    gradientColors: "rgba(52, 73, 94, 0.7) 0%, rgba(108, 122, 137, 0.8) 100%"
}

// PASO 3: Asegúrate de agregar una coma después del último elemento
// del array ANTES de pegar este nuevo elemento

// ❌ INCORRECTO (falta coma):
// const storiesData = [
//     {
//         name: "María González",
//         ...
//     }  // <- FALTA COMA AQUÍ
//     {
//         name: "Nueva Persona",
//         ...
//     }
// ];

// ✅ CORRECTO (con coma):
// const storiesData = [
//     {
//         name: "María González",
//         ...
//     },  // <- COMA PRESENTE
//     {
//         name: "Nueva Persona",
//         ...
//     }
// ];

/*
 * 🎨 PALETA DE COLORES SUGERIDOS
 *
 * Copia y pega el gradientColors que más te guste:
 */

const PALETA_COLORES = {
    // Tonos verdes (agricultura)
    verdeOscuro: "rgba(34, 87, 50, 0.7) 0%, rgba(87, 166, 105, 0.8) 100%",
    verdeClaro: "rgba(76, 175, 80, 0.7) 0%, rgba(139, 195, 74, 0.8) 100%",
    verdeOliva: "rgba(85, 107, 47, 0.7) 0%, rgba(143, 170, 81, 0.8) 100%",

    // Tonos tierra (rural)
    marronTierra: "rgba(101, 67, 33, 0.7) 0%, rgba(141, 110, 68, 0.8) 100%",
    ocre: "rgba(139, 90, 43, 0.7) 0%, rgba(184, 134, 78, 0.8) 100%",
    terracota: "rgba(120, 40, 31, 0.7) 0%, rgba(192, 86, 74, 0.8) 100%",

    // Tonos azules (agua)
    azulAgua: "rgba(10, 37, 64, 0.7) 0%, rgba(26, 95, 122, 0.8) 100%",
    azulCielo: "rgba(41, 128, 185, 0.7) 0%, rgba(52, 152, 219, 0.8) 100%",
    azulOscuro: "rgba(44, 62, 80, 0.7) 0%, rgba(71, 96, 120, 0.8) 100%",

    // Tonos cálidos (sol, cosecha)
    dorado: "rgba(139, 105, 20, 0.7) 0%, rgba(196, 163, 90, 0.8) 100%",
    naranja: "rgba(191, 87, 0, 0.7) 0%, rgba(230, 126, 34, 0.8) 100%",
    ambar: "rgba(180, 90, 0, 0.7) 0%, rgba(220, 140, 50, 0.8) 100%",

    // Tonos morados/vino (uvas)
    morado: "rgba(103, 58, 183, 0.7) 0%, rgba(142, 94, 201, 0.8) 100%",
    vino: "rgba(106, 27, 62, 0.7) 0%, rgba(159, 53, 96, 0.8) 100%",

    // Neutros elegantes
    grisOscuro: "rgba(52, 73, 94, 0.7) 0%, rgba(108, 122, 137, 0.8) 100%",
    negroSuave: "rgba(30, 30, 30, 0.7) 0%, rgba(80, 80, 80, 0.8) 100%"
};

/*
 * 💡 TIPS PRO:
 *
 * 1. Para elegir colores que combinen con la foto:
 *    - Abre la foto en un editor
 *    - Usa el cuentagotas para obtener un color dominante
 *    - Convierte ese color a RGB
 *    - Usa ese RGB en el gradiente
 *
 * 2. Herramientas útiles:
 *    - ImageColorPicker.com - Extrae colores de imágenes
 *    - Coolors.co - Genera paletas armónicas
 *    - RGBA Color Picker - Convierte colores a formato RGBA
 *
 * 3. Mantén consistencia:
 *    - Usa opacidad 0.7 para el primer color
 *    - Usa opacidad 0.8 para el segundo
 *    - Esto asegura buena legibilidad del texto
 */
