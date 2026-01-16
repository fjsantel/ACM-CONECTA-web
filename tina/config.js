import { defineConfig } from "tinacms";

// Configuración de Tina CMS para ACM Conecta
export default defineConfig({
  // Branch que usará Tina (tu rama principal)
  branch: process.env.HEAD || "main",

  // Cliente ID de Tina Cloud (se configurará después)
  clientId: process.env.TINA_CLIENT_ID || null,

  // Token de Tina Cloud (se configurará después)
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "",
  },

  // Configuración de medios (imágenes)
  media: {
    tina: {
      mediaRoot: "fotos",
      publicFolder: "",
    },
  },

  // Definición de colecciones de contenido
  schema: {
    collections: [
      // Colección 1: Historias - Entrevista
      {
        name: "historias",
        label: "Historias - Entrevista",
        path: "content/historias",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug?.toLowerCase().replace(/ /g, '-');
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nombre",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
            description: "Solo minúsculas, números y guiones. Ejemplo: juan-ramirez",
          },
          {
            type: "string",
            name: "location",
            label: "Ubicación",
            required: true,
          },
          {
            type: "number",
            name: "age",
            label: "Edad",
            required: false,
          },
          {
            type: "string",
            name: "occupation",
            label: "Ocupación",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descripción Corta",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "1-2 líneas para la tarjeta en el carrusel",
          },
          {
            type: "image",
            name: "image",
            label: "Imagen Principal",
            required: true,
          },
          {
            type: "string",
            name: "gradientColors",
            label: "Colores del Gradiente",
            required: true,
            options: [
              {
                value: "rgba(34, 87, 50, 0.7) 0%, rgba(87, 166, 105, 0.8) 100%",
                label: "Verde Oscuro (agricultura)",
              },
              {
                value: "rgba(76, 175, 80, 0.7) 0%, rgba(139, 195, 74, 0.8) 100%",
                label: "Verde Claro",
              },
              {
                value: "rgba(85, 107, 47, 0.7) 0%, rgba(143, 170, 81, 0.8) 100%",
                label: "Verde Oliva",
              },
              {
                value: "rgba(101, 67, 33, 0.7) 0%, rgba(141, 110, 68, 0.8) 100%",
                label: "Marrón Tierra (rural)",
              },
              {
                value: "rgba(139, 90, 43, 0.7) 0%, rgba(184, 134, 78, 0.8) 100%",
                label: "Ocre",
              },
              {
                value: "rgba(120, 40, 31, 0.7) 0%, rgba(192, 86, 74, 0.8) 100%",
                label: "Terracota",
              },
              {
                value: "rgba(10, 37, 64, 0.7) 0%, rgba(26, 95, 122, 0.8) 100%",
                label: "Azul Agua",
              },
              {
                value: "rgba(41, 128, 185, 0.7) 0%, rgba(52, 152, 219, 0.8) 100%",
                label: "Azul Cielo",
              },
              {
                value: "rgba(44, 62, 80, 0.7) 0%, rgba(71, 96, 120, 0.8) 100%",
                label: "Azul Oscuro",
              },
              {
                value: "rgba(139, 105, 20, 0.7) 0%, rgba(196, 163, 90, 0.8) 100%",
                label: "Dorado (sol/cosecha)",
              },
              {
                value: "rgba(191, 87, 0, 0.7) 0%, rgba(230, 126, 34, 0.8) 100%",
                label: "Naranja",
              },
              {
                value: "rgba(180, 90, 0, 0.7) 0%, rgba(220, 140, 50, 0.8) 100%",
                label: "Ámbar",
              },
              {
                value: "rgba(103, 58, 183, 0.7) 0%, rgba(142, 94, 201, 0.8) 100%",
                label: "Morado (uvas)",
              },
              {
                value: "rgba(106, 27, 62, 0.7) 0%, rgba(159, 53, 96, 0.8) 100%",
                label: "Vino",
              },
              {
                value: "rgba(52, 73, 94, 0.7) 0%, rgba(108, 122, 137, 0.8) 100%",
                label: "Gris Oscuro",
              },
            ],
          },
          {
            type: "string",
            name: "template",
            label: "Tipo de Historia",
            required: true,
            ui: {
              component: () => null, // Campo oculto
            },
            default: "entrevista",
          },
          {
            type: "string",
            name: "intro",
            label: "Introducción",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "Párrafo introductorio de 2-3 líneas",
          },
          {
            type: "object",
            name: "interview",
            label: "Preguntas y Respuestas",
            required: true,
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.question || "Nueva pregunta" };
              },
              min: 1,
              max: 6,
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Pregunta",
                required: true,
              },
              {
                type: "string",
                name: "answer",
                label: "Respuesta",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "string",
            name: "quote",
            label: "Cita Destacada",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "Una frase memorable de la persona",
          },
          {
            type: "image",
            name: "additionalImages",
            label: "Imágenes Adicionales",
            required: true,
            list: true,
            ui: {
              min: 3,
              max: 6,
            },
          },
        ],
      },
      // Colección 2: Reportajes Extensos
      {
        name: "reportajes",
        label: "Historias - Reportaje Extenso",
        path: "content/reportajes",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug?.toLowerCase().replace(/ /g, '-');
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Título",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
            description: "Solo minúsculas, números y guiones",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtítulo",
            required: true,
          },
          {
            type: "string",
            name: "location",
            label: "Ubicación",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descripción Corta",
            required: true,
            ui: {
              component: "textarea",
            },
            description: "1-2 líneas para la tarjeta en el carrusel",
          },
          {
            type: "image",
            name: "image",
            label: "Imagen Principal",
            required: true,
          },
          {
            type: "string",
            name: "gradientColors",
            label: "Colores del Gradiente",
            required: true,
            options: [
              {
                value: "rgba(34, 87, 50, 0.7) 0%, rgba(87, 166, 105, 0.8) 100%",
                label: "Verde Oscuro (agricultura)",
              },
              {
                value: "rgba(76, 175, 80, 0.7) 0%, rgba(139, 195, 74, 0.8) 100%",
                label: "Verde Claro",
              },
              {
                value: "rgba(85, 107, 47, 0.7) 0%, rgba(143, 170, 81, 0.8) 100%",
                label: "Verde Oliva",
              },
              {
                value: "rgba(101, 67, 33, 0.7) 0%, rgba(141, 110, 68, 0.8) 100%",
                label: "Marrón Tierra (rural)",
              },
              {
                value: "rgba(139, 90, 43, 0.7) 0%, rgba(184, 134, 78, 0.8) 100%",
                label: "Ocre",
              },
              {
                value: "rgba(120, 40, 31, 0.7) 0%, rgba(192, 86, 74, 0.8) 100%",
                label: "Terracota",
              },
              {
                value: "rgba(10, 37, 64, 0.7) 0%, rgba(26, 95, 122, 0.8) 100%",
                label: "Azul Agua",
              },
              {
                value: "rgba(41, 128, 185, 0.7) 0%, rgba(52, 152, 219, 0.8) 100%",
                label: "Azul Cielo",
              },
              {
                value: "rgba(44, 62, 80, 0.7) 0%, rgba(71, 96, 120, 0.8) 100%",
                label: "Azul Oscuro",
              },
              {
                value: "rgba(139, 105, 20, 0.7) 0%, rgba(196, 163, 90, 0.8) 100%",
                label: "Dorado (sol/cosecha)",
              },
              {
                value: "rgba(191, 87, 0, 0.7) 0%, rgba(230, 126, 34, 0.8) 100%",
                label: "Naranja",
              },
              {
                value: "rgba(180, 90, 0, 0.7) 0%, rgba(220, 140, 50, 0.8) 100%",
                label: "Ámbar",
              },
              {
                value: "rgba(103, 58, 183, 0.7) 0%, rgba(142, 94, 201, 0.8) 100%",
                label: "Morado (uvas)",
              },
              {
                value: "rgba(106, 27, 62, 0.7) 0%, rgba(159, 53, 96, 0.8) 100%",
                label: "Vino",
              },
              {
                value: "rgba(52, 73, 94, 0.7) 0%, rgba(108, 122, 137, 0.8) 100%",
                label: "Gris Oscuro",
              },
            ],
          },
          {
            type: "string",
            name: "template",
            label: "Tipo de Historia",
            required: true,
            ui: {
              component: () => null,
            },
            default: "reportaje",
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
            required: false,
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha de Publicación",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido del Reportaje",
            required: true,
            description: "Contenido completo del reportaje en formato revista",
            isBody: true,
          },
          {
            type: "object",
            name: "articleImages",
            label: "Imágenes del Reportaje",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.caption || "Nueva imagen" };
              },
              min: 1,
              max: 10,
            },
            fields: [
              {
                type: "image",
                name: "image",
                label: "Imagen",
                required: true,
              },
              {
                type: "string",
                name: "caption",
                label: "Pie de foto",
                required: false,
              },
            ],
          },
          {
            type: "string",
            name: "quote",
            label: "Cita Destacada",
            required: false,
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
