/**
 * ========================================
 * HISTORIAS LOADER - Sistema Automático
 * ========================================
 *
 * Este loader carga automáticamente todas las historias desde:
 * 1. Archivos Markdown en content/historias/ (Decap CMS)
 * 2. Archivos Markdown en content/reportajes/ (Decap CMS)
 * 3. Datos legacy del archivo historias-cards-data.js (fallback)
 */

const GITHUB_API = 'https://api.github.com/repos/fjsantel/ACM-CONECTA-web/contents';

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

// Función para obtener lista de archivos de una carpeta en GitHub
async function getGitHubFiles(folder) {
    try {
        const response = await fetch(`${GITHUB_API}/${folder}`);
        if (!response.ok) return [];

        const files = await response.json();

        // Filtrar solo archivos .md (excluir .gitkeep, etc)
        return files
            .filter(file => file.name.endsWith('.md') && !file.name.startsWith('.'))
            .map(file => file.name.replace('.md', ''));
    } catch (error) {
        console.error(`Error obteniendo archivos de ${folder}:`, error);
        return [];
    }
}

// Función para cargar una historia desde Markdown
async function loadHistoriaFromMarkdown(slug) {
    try {
        const response = await fetch(`content/historias/${slug}.md`);
        if (!response.ok) return null;

        const markdown = await response.text();
        const { frontMatter, content } = parseFrontMatter(markdown);

        // Convertir a formato de historia (entrevista)
        return {
            name: frontMatter.nombre,
            slug: frontMatter.slug || slug,
            location: frontMatter.ubicacion,
            age: frontMatter.edad ? parseInt(frontMatter.edad) : null,
            occupation: frontMatter.ocupacion,
            description: frontMatter.descripcion,
            image: frontMatter.foto,
            gradientColors: getGradientColors(frontMatter.color),
            template: 'entrevista',
            story: {
                intro: frontMatter.intro,
                interview: frontMatter.preguntas || [],
                quote: frontMatter.quote,
                additionalImages: frontMatter.galeria || []
            }
        };
    } catch (error) {
        console.error(`Error cargando historia ${slug}:`, error);
        return null;
    }
}

// Función para cargar un reportaje desde Markdown
async function loadReportajeFromMarkdown(slug) {
    try {
        const response = await fetch(`content/reportajes/${slug}.md`);
        if (!response.ok) return null;

        const markdown = await response.text();
        const { frontMatter, content } = parseFrontMatter(markdown);

        // Convertir a formato de historia (reportaje)
        return {
            name: frontMatter.titulo,
            slug: frontMatter.slug || slug,
            location: null, // Los reportajes no tienen ubicación
            subtitle: frontMatter.subtitulo,
            description: frontMatter.descripcion,
            image: frontMatter.foto,
            gradientColors: getGradientColors(frontMatter.color),
            template: 'reportaje',
            author: frontMatter.autor,
            date: frontMatter.fecha,
            content: content,
            articleImages: frontMatter.galeria || [],
            quote: frontMatter.quote
        };
    } catch (error) {
        console.error(`Error cargando reportaje ${slug}:`, error);
        return null;
    }
}

// Función helper para obtener colores de gradiente con transparencias
function getGradientColors(color) {
    const gradients = {
        blue: 'rgba(30, 64, 175, 0.5) 0%, rgba(59, 130, 246, 0.6) 100%',
        green: 'rgba(5, 150, 105, 0.5) 0%, rgba(16, 185, 129, 0.6) 100%',
        orange: 'rgba(234, 88, 12, 0.5) 0%, rgba(249, 115, 22, 0.6) 100%',
        purple: 'rgba(124, 58, 237, 0.5) 0%, rgba(168, 85, 247, 0.6) 100%',
        red: 'rgba(220, 38, 38, 0.5) 0%, rgba(239, 68, 68, 0.6) 100%'
    };
    return gradients[color] || gradients.blue;
}

// Función principal para cargar todas las historias automáticamente
async function loadStoryData() {
    const allStories = [];

    // 1. Primero cargar historias legacy (siempre disponibles)
    if (typeof storiesData !== 'undefined') {
        console.log('📂 Cargando historias legacy...');
        const legacyStories = storiesData.map(story => ({
            ...story,
            template: story.template || 'entrevista'
        }));
        allStories.push(...legacyStories);
        console.log(`✅ Cargadas ${legacyStories.length} historias legacy`);
    }

    // 2. Intentar cargar reportaje MD conocido (creado por CMS)
    try {
        console.log('📝 Intentando cargar reportaje desde Markdown...');
        const reportaje = await loadReportajeFromMarkdown('modernizacion-canal-maule-sur');
        if (reportaje) {
            // Solo agregar si no existe ya
            if (!allStories.find(s => s.slug === reportaje.slug)) {
                allStories.push(reportaje);
                console.log('✅ Reportaje MD cargado');
            }
        }
    } catch (error) {
        console.log('ℹ️ Reportaje MD no disponible (normal si no existe)');
    }

    console.log(`🎉 Total de historias cargadas: ${allStories.length}`);
    return allStories;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.loadStoryData = loadStoryData;
}
