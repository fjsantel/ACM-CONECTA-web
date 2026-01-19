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

// Función helper para obtener colores de gradiente
function getGradientColors(color) {
    const gradients = {
        blue: ['#1e40af', '#3b82f6'],
        green: ['#059669', '#10b981'],
        orange: ['#ea580c', '#f97316'],
        purple: ['#7c3aed', '#a855f7'],
        red: ['#dc2626', '#ef4444']
    };
    return gradients[color] || gradients.blue;
}

// Función principal para cargar todas las historias automáticamente
async function loadStoryData() {
    const allStories = [];

    try {
        // 1. Obtener lista de archivos desde GitHub API
        console.log('🔍 Obteniendo lista de historias desde GitHub...');
        const [historiaSlugs, reportajeSlugs] = await Promise.all([
            getGitHubFiles('content/historias'),
            getGitHubFiles('content/reportajes')
        ]);

        console.log(`📚 Encontradas ${historiaSlugs.length} historias y ${reportajeSlugs.length} reportajes`);

        // 2. Cargar todas las historias
        const historiaPromises = historiaSlugs.map(slug => loadHistoriaFromMarkdown(slug));
        const historias = await Promise.all(historiaPromises);

        // 3. Cargar todos los reportajes
        const reportajePromises = reportajeSlugs.map(slug => loadReportajeFromMarkdown(slug));
        const reportajes = await Promise.all(reportajePromises);

        // 4. Combinar y filtrar nulos
        allStories.push(...historias.filter(h => h !== null));
        allStories.push(...reportajes.filter(r => r !== null));

        console.log(`✅ Cargadas ${allStories.length} historias/reportajes desde Markdown`);

    } catch (error) {
        console.error('❌ Error cargando historias desde GitHub API:', error);
    }

    // 5. Cargar historias legacy desde JS y combinar (evitar duplicados)
    if (typeof storiesData !== 'undefined') {
        console.log('📂 Combinando con historias legacy...');
        const legacyStories = storiesData.map(story => ({
            ...story,
            template: story.template || 'entrevista'
        }));

        // Solo agregar historias legacy que no estén ya en allStories
        legacyStories.forEach(legacyStory => {
            if (!allStories.find(s => s.slug === legacyStory.slug)) {
                allStories.push(legacyStory);
            }
        });
    }

    console.log(`🎉 Total de historias cargadas: ${allStories.length}`);
    return allStories;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.loadStoryData = loadStoryData;
}
