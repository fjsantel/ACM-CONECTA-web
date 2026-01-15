/**
 * ========================================
 * HISTORIAS LOADER - Sistema Unificado
 * ========================================
 *
 * Este loader carga historias desde dos fuentes:
 * 1. Archivos Markdown creados con Decap CMS
 * 2. Datos legacy del archivo historias-cards-data.js
 */

// Función para parsear Front Matter de archivos Markdown
function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);

    if (!match) {
        return { frontMatter: {}, content: markdown };
    }

    const frontMatterText = match[1];
    const content = match[2];

    // Parse YAML-like front matter
    const frontMatter = {};
    const lines = frontMatterText.split('\n');

    let currentKey = null;
    let currentList = null;
    let inMultiline = false;
    let multilineContent = '';

    lines.forEach(line => {
        // Handle list items
        if (line.trim().startsWith('- ')) {
            if (currentList) {
                const item = line.trim().substring(2);

                // Check if it's an object item
                if (item.includes(':')) {
                    const [key, value] = item.split(':').map(s => s.trim());
                    const lastItem = currentList[currentList.length - 1] || {};
                    lastItem[key] = value.replace(/^["']|["']$/g, '');
                    if (currentList.length === 0) {
                        currentList.push(lastItem);
                    }
                } else {
                    currentList.push(item.replace(/^["']|["']$/g, ''));
                }
            }
        }
        // Handle key-value pairs
        else if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes
            value = value.replace(/^["']|["']$/g, '');

            // Check if this starts a list
            if (value === '') {
                currentKey = key;
                currentList = [];
                frontMatter[key] = currentList;
            } else {
                frontMatter[key] = value;
                currentKey = key;
                currentList = null;
            }
        }
    });

    return { frontMatter, content };
}

// Función para cargar archivos Markdown
async function loadMarkdownStories() {
    const stories = [];

    try {
        // Intentar cargar historias de entrevista
        const interviewFiles = [
            'maria-gonzalez',
            'pedro-munoz',
            'familia-soto',
            'carlos-rojas'
        ];

        for (const slug of interviewFiles) {
            try {
                const response = await fetch(`content/historias/${slug}.md`);
                if (response.ok) {
                    const markdown = await response.text();
                    const { frontMatter, content } = parseFrontMatter(markdown);

                    // Convertir a formato de historia
                    const story = {
                        name: frontMatter.name,
                        slug: frontMatter.slug || slug,
                        location: frontMatter.location,
                        age: frontMatter.age ? parseInt(frontMatter.age) : null,
                        occupation: frontMatter.occupation,
                        description: frontMatter.description,
                        image: frontMatter.image,
                        gradientColors: frontMatter.gradientColors,
                        template: 'entrevista',
                        story: {
                            intro: frontMatter.intro,
                            interview: frontMatter.interview || [],
                            quote: frontMatter.quote,
                            additionalImages: frontMatter.additionalImages || []
                        }
                    };

                    stories.push(story);
                }
            } catch (err) {
                console.log(`No se pudo cargar ${slug}.md`);
            }
        }

        // Intentar cargar reportajes
        const reportajeFiles = [
            // Agregar slugs de reportajes aquí cuando se creen
        ];

        for (const slug of reportajeFiles) {
            try {
                const response = await fetch(`content/reportajes/${slug}.md`);
                if (response.ok) {
                    const markdown = await response.text();
                    const { frontMatter, content } = parseFrontMatter(markdown);

                    const story = {
                        name: frontMatter.name,
                        slug: frontMatter.slug || slug,
                        location: frontMatter.location,
                        subtitle: frontMatter.subtitle,
                        description: frontMatter.description,
                        image: frontMatter.image,
                        gradientColors: frontMatter.gradientColors,
                        template: 'reportaje',
                        author: frontMatter.author,
                        date: frontMatter.date,
                        content: content,
                        articleImages: frontMatter.articleImages || [],
                        quote: frontMatter.quote
                    };

                    stories.push(story);
                }
            } catch (err) {
                console.log(`No se pudo cargar reportaje ${slug}.md`);
            }
        }
    } catch (error) {
        console.error('Error cargando historias desde Markdown:', error);
    }

    return stories;
}

// Función principal para cargar todas las historias
async function loadStoryData() {
    // Cargar historias desde Markdown (Decap CMS)
    const markdownStories = await loadMarkdownStories();

    // Cargar historias legacy desde JS (si existe)
    let legacyStories = [];
    if (typeof storiesData !== 'undefined') {
        legacyStories = storiesData.map(story => ({
            ...story,
            template: story.template || 'entrevista'
        }));
    }

    // Combinar ambas fuentes (Markdown tiene prioridad)
    const allStories = [...markdownStories];

    // Agregar historias legacy que no estén en Markdown
    legacyStories.forEach(legacyStory => {
        if (!allStories.find(s => s.slug === legacyStory.slug)) {
            allStories.push(legacyStory);
        }
    });

    return allStories;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.loadStoryData = loadStoryData;
}
