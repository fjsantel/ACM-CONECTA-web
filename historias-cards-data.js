/**
 * ========================================
 * HISTORIAS CARDS - DATOS
 * ========================================
 *
 * Este archivo contiene los datos de las personas que aparecen
 * en el carrusel de historias de la página principal.
 *
 * Para agregar una nueva historia, copia el formato de cualquier
 * objeto existente y modifica los valores.
 *
 * Consulta: HISTORIAS-CARDS-README.md para más información
 * Ejemplos: historias-cards-ejemplo.js
 */

const storiesData = [
    {
        name: "María González",
        location: "San Clemente",
        description: "Primera presidenta de su comunidad de regantes. Hoy lidera a 50 familias en la gestión eficiente del agua.",
        image: "fotos/María González.jpg?v=3",
        gradientColors: "rgba(45, 80, 22, 0.7) 0%, rgba(127, 176, 105, 0.8) 100%",
        slug: "maria-gonzalez",
        age: 48,
        occupation: "Presidenta Comunidad de Regantes",
        story: {
            intro: "En San Clemente, María González se convirtió en la primera mujer en presidir una comunidad de regantes, rompiendo décadas de tradición masculina en el liderazgo del agua.",
            interview: [
                {
                    question: "¿Cómo llegaste a presidir la comunidad de regantes?",
                    answer: "Llevo 25 años trabajando la tierra que heredé de mi padre. Siempre participé en las asambleas, pero nunca había habido una mujer presidenta. En 2019, varios socios me propusieron y acepté el desafío. Al principio hubo resistencia, pero hoy lideramos 50 familias con transparencia y eficiencia."
                },
                {
                    question: "¿Qué cambios has implementado?",
                    answer: "Digitalizamos todo el sistema de turnos de riego. Ahora cada socio puede ver en tiempo real cuándo le toca su turno, cuánta agua hay disponible y cómo está la situación del embalse. También creamos un fondo solidario para ayudar a familias que necesitan tecnificar su riego."
                },
                {
                    question: "¿Qué mensaje le darías a otras mujeres del campo?",
                    answer: "Que no tengan miedo de alzar la voz. El agua es vida, y las mujeres tenemos mucho que aportar en su gestión. Nosotras también trabajamos la tierra, también conocemos las necesidades. Es hora de que seamos parte de las decisiones."
                }
            ],
            quote: "El agua no discrimina. Riega por igual el campo del hombre y el de la mujer. ¿Por qué las decisiones sobre ella deberían ser diferentes?",
            additionalImages: [
                "fotos/María González.jpg?v=3",
                "fotos/María González.jpg?v=3",
                "fotos/María González.jpg?v=3"
            ]
        }
    },
    {
        name: "Pedro Muñoz",
        location: "Talca",
        description: "A sus 72 años, adoptó el riego por goteo y duplicó la producción de sus viñedos familiares.",
        image: "fotos/Pedro Muñoz.jpg?v=3",
        gradientColors: "rgba(139, 105, 20, 0.7) 0%, rgba(196, 163, 90, 0.8) 100%",
        slug: "pedro-munoz",
        age: 72,
        occupation: "Viticultor",
        story: {
            intro: "Pedro Muñoz desafió el mito de que 'perro viejo no aprende trucos nuevos'. A sus 72 años, revolucionó sus viñedos familiares con tecnología de riego por goteo.",
            interview: [
                {
                    question: "¿Por qué decidiste cambiar tu sistema de riego tradicional?",
                    answer: "Llevo 50 años en esto. Siempre regué por surco, como mi padre y mi abuelo. Pero con las sequías de los últimos años, el agua ya no alcanzaba. Mis nietos me convencieron de probar el goteo. Al principio pensé que era mucha plata y mucho lío, pero me equivoqué."
                },
                {
                    question: "¿Qué resultados has visto?",
                    answer: "El primer año ya noté la diferencia. Las parras están más sanas, la uva viene más pareja. Y lo mejor: duplicamos la producción usando menos agua. Ahora mis vecinos vienen a preguntarme cómo lo hice. Yo les digo: nunca es tarde para aprender."
                },
                {
                    question: "¿Qué consejo le darías a otros agricultores mayores?",
                    answer: "Que no tengan miedo al cambio. Uno puede pensar que ya está viejo para estas cosas, pero la tierra no perdona. Si no nos adaptamos, nos quedamos atrás. Y hay ayuda: la Asociación Canal Maule nos orientó en todo el proceso y postulamos a fondos CNR que cubrieron gran parte de la inversión."
                }
            ],
            quote: "A mis 72 años aprendí que nunca es tarde para cuidar mejor nuestra tierra. El agua es un regalo, y hay que usarla con sabiduría.",
            additionalImages: [
                "fotos/Pedro Muñoz.jpg?v=3",
                "fotos/Pedro Muñoz.jpg?v=3",
                "fotos/Pedro Muñoz.jpg?v=3"
            ]
        }
    },
    {
        name: "Familia Soto",
        location: "Pelarco",
        description: "Tres generaciones trabajando la tierra. Hoy sus nietos lideran la innovación con tecnología de riego inteligente.",
        image: "fotos/Familia Soto.jpg",
        gradientColors: "rgba(10, 37, 64, 0.7) 0%, rgba(26, 95, 122, 0.8) 100%",
        slug: "familia-soto",
        age: null,
        occupation: "Agricultores Familiares",
        story: {
            intro: "En Pelarco, tres generaciones de la familia Soto trabajan juntas la misma tierra. Los abuelos aportan la experiencia, los padres la gestión, y los nietos traen la innovación tecnológica.",
            interview: [
                {
                    question: "¿Cómo logran trabajar juntos tres generaciones?",
                    answer: "ABUELO ROBERTO: Yo les enseñé a mis hijos a leer la tierra, a conocer cuándo necesita agua. HIJO RODRIGO: Y nosotros modernizamos la gestión, llevamos registros, planificamos las siembras. NIETA VALENTINA: Y nosotros llegamos con la tecnología: sensores de humedad, riego programado desde el celular, análisis de datos."
                },
                {
                    question: "¿Qué es el riego inteligente que implementaron?",
                    answer: "VALENTINA: Instalamos sensores en el suelo que miden la humedad en tiempo real. El sistema calcula cuánta agua necesita cada sector y programa el riego automáticamente. Ya no regamos por intuición o por calendario, sino por datos reales. Ahorramos 35% de agua y las plantas están más sanas."
                },
                {
                    question: "¿Cómo ven el futuro de la agricultura familiar?",
                    answer: "RODRIGO: El futuro es combinar lo mejor de cada generación. La experiencia de mi padre nos dice qué plantar y cuándo. Nuestra gestión mantiene el negocio viable. Y la tecnología que traen mis hijos nos hace más eficientes y sostenibles. Así se construye un legado."
                }
            ],
            quote: "Tres generaciones, una tierra, un mismo sueño: cuidar el agua para que haya cosecha por muchos años más.",
            additionalImages: [
                "fotos/Familia Soto.jpg",
                "fotos/Familia Soto.jpg",
                "fotos/Familia Soto.jpg"
            ]
        }
    },
    {
        name: "Carlos Rojas",
        location: "Curicó",
        description: "Pequeño productor de hortalizas que transformó su sistema de riego tradicional, aumentando su producción en un 40%.",
        image: "fotos/Carlos Rojas.jpg",
        gradientColors: "rgba(88, 24, 69, 0.7) 0%, rgba(144, 78, 119, 0.8) 100%",
        slug: "carlos-rojas",
        age: 54,
        occupation: "Productor de Hortalizas",
        story: {
            intro: "Carlos Rojas cultiva hortalizas en Curicó desde hace 30 años. Su transformación de riego tradicional a tecnificado lo convirtió en un ejemplo para pequeños productores de la región.",
            interview: [
                {
                    question: "¿Cómo era tu sistema de riego antes?",
                    answer: "Regaba por tendido, como siempre se ha hecho. Abría la compuerta y el agua corría por los surcos. Perdía mucha agua, se encharcaba en algunas partes y otras quedaban secas. Con las lechugas y tomates eso es un problema: necesitan agua pareja y constante."
                },
                {
                    question: "¿Qué te motivó a cambiar?",
                    answer: "Las cuentas no me cuadraban. Pagaba mucha agua y las cosechas eran irregulares. Un técnico de la Asociación Canal Maule me visitó y me mostró los números: podía ahorrar agua y producir más. Me costó creerlo, pero decidí arriesgar en una hectárea para probar."
                },
                {
                    question: "¿Cuáles fueron los resultados?",
                    answer: "En esa hectárea de prueba, la producción subió 40% y usé menos de la mitad del agua. Las hortalizas salen más uniformes, más sanas. Al año siguiente tecnifiqué todo. Hoy produzco más, gasto menos agua, y mis productos tienen mejor precio en el mercado porque la calidad es superior."
                }
            ],
            quote: "No hay que tener miedo a invertir en mejorar. Una hectárea de prueba me cambió la vida y el futuro de mi familia.",
            additionalImages: [
                "fotos/Carlos Rojas.jpg",
                "fotos/Carlos Rojas.jpg",
                "fotos/Carlos Rojas.jpg"
            ]
        }
    }

    /* ================================================
     * PARA AGREGAR UNA NUEVA HISTORIA:
     * ================================================
     * 1. Coloca la foto en la carpeta: fotos/
     * 2. Copia el formato de arriba y pega aquí abajo
     * 3. Agrega una coma (,) después del último objeto
     * 4. Modifica los valores según la nueva persona
     * 5. Consulta historias-cards-ejemplo.js para paleta de colores
     * ================================================
     */
];
