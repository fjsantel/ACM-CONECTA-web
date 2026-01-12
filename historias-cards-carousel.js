/**
 * ========================================
 * HISTORIAS CARDS - CARRUSEL
 * ========================================
 *
 * Sistema de carrusel automático para las historias cards.
 * Este archivo maneja la lógica del carrusel, navegación y animaciones.
 *
 * ⚠️ NO EDITAR ESTE ARCHIVO A MENOS QUE SEPAS LO QUE ESTÁS HACIENDO
 *
 * Para modificar los datos de las historias:
 * → Edita: historias-cards-data.js
 *
 * Para ver ejemplos y paleta de colores:
 * → Consulta: historias-cards-ejemplo.js
 *
 * Documentación completa:
 * → Lee: HISTORIAS-CARDS-README.md
 */

class StoriesCarousel {
    constructor(storiesData) {
        this.stories = storiesData;
        this.currentIndex = 0;
        this.container = document.querySelector('.stories-carousel-container');
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 segundos
        this.cardsPerView = 3; // Siempre mostrar 3 cards

        this.init();
    }

    init() {
        this.render();
        this.setupControls();
        this.updateCardsPerView();
        this.startAutoplay();

        // Pausar autoplay al hacer hover o touch
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
        this.container.addEventListener('touchstart', () => this.stopAutoplay());
        this.container.addEventListener('touchend', () => {
            setTimeout(() => this.startAutoplay(), 3000);
        });

        // Actualizar en resize
        window.addEventListener('resize', () => this.updateCardsPerView());
    }

    updateCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            this.cardsPerView = 1;
        } else if (width <= 1200) {
            this.cardsPerView = 2;
        } else {
            this.cardsPerView = 3;
        }
        this.goToSlide(this.currentIndex);
    }

    render() {
        // Generar las cards
        const cardsHTML = this.stories.map((story, index) => `
            <a href="historia-template.html?historia=${story.slug}"
               class="story-card ${index === 0 ? 'active' : ''}"
               data-index="${index}"
               role="link"
               aria-label="Ver historia de ${story.name}">
                <div class="story-card-bg"
                     style="background-image: url('${story.image}');
                            background-size: cover;
                            background-position: center;">
                </div>
                <div class="story-card-gradient"
                     style="background: linear-gradient(135deg, ${story.gradientColors});">
                </div>
                <div class="story-overlay">
                    <div class="story-content">
                        <span class="story-location">${story.location}</span>
                        <h3 class="story-name">${story.name}</h3>
                        <p class="story-description">${story.description}</p>
                    </div>
                </div>
            </a>
        `).join('');

        // Generar los indicadores
        const indicatorsHTML = this.stories.map((_, index) => `
            <button class="carousel-indicator ${index === 0 ? 'active' : ''}"
                    data-index="${index}"
                    aria-label="Ir a historia ${index + 1}">
            </button>
        `).join('');

        // Insertar en el DOM
        this.container.innerHTML = `
            <div class="stories-carousel-wrapper">
                <div class="stories-carousel-track">
                    ${cardsHTML}
                </div>

                <button class="carousel-control prev" aria-label="Historia anterior">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button class="carousel-control next" aria-label="Siguiente historia">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div class="carousel-indicators">
                    ${indicatorsHTML}
                </div>
            </div>
        `;
    }

    setupControls() {
        // Botones prev/next
        const prevBtn = this.container.querySelector('.carousel-control.prev');
        const nextBtn = this.container.querySelector('.carousel-control.next');

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prev();
        });
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.next();
        });

        // Touch events for buttons
        prevBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.prev();
        });
        nextBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.next();
        });

        // Indicadores
        const indicators = this.container.querySelectorAll('.carousel-indicator');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
            indicator.addEventListener('touchend', (e) => {
                e.preventDefault();
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Swipe support for mobile
        this.setupSwipe();
    }

    setupSwipe() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isSwiping = false;
        const track = this.container.querySelector('.stories-carousel-track');
        const cards = this.container.querySelectorAll('.story-card');

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = false;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;

            const diffX = Math.abs(startX - endX);
            const diffY = Math.abs(startY - endY);

            // If horizontal movement is greater than vertical, it's a swipe
            if (diffX > diffY && diffX > 10) {
                isSwiping = true;
                // Prevent card links from activating during swipe
                e.preventDefault();
            }
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isSwiping) {
                // This is a tap, not a swipe - let the link work
                return;
            }

            const diff = startX - endX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(diff) > threshold) {
                e.preventDefault();
                if (diff > 0) {
                    // Swipe left - next
                    this.next();
                } else {
                    // Swipe right - prev
                    this.prev();
                }
            }

            isSwiping = false;
        });
    }

    goToSlide(index) {
        const cards = this.container.querySelectorAll('.story-card');
        const indicators = this.container.querySelectorAll('.carousel-indicator');
        const track = this.container.querySelector('.stories-carousel-track');

        // Calcular el índice máximo permitido (para que siempre se vean 3 cards completas)
        const maxIndex = Math.max(0, this.stories.length - this.cardsPerView);

        // Si el índice excede el máximo, volver al inicio
        if (index > maxIndex) {
            index = 0;
        } else if (index < 0) {
            index = maxIndex;
        }

        // Remover active de todos
        cards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        // Agregar active a las cards visibles
        for (let i = index; i < Math.min(index + this.cardsPerView, this.stories.length); i++) {
            cards[i].classList.add('active');
        }
        indicators[index].classList.add('active');

        // Calcular el desplazamiento
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // 1.5rem
        const offset = -(index * (cardWidth + gap));

        track.style.transform = `translateX(${offset}px)`;

        this.currentIndex = index;
    }

    next() {
        const maxIndex = Math.max(0, this.stories.length - this.cardsPerView);
        let nextIndex = this.currentIndex + 1;

        // Si llegamos al final, volver al inicio
        if (nextIndex > maxIndex) {
            nextIndex = 0;
        }

        this.goToSlide(nextIndex);
    }

    prev() {
        const maxIndex = Math.max(0, this.stories.length - this.cardsPerView);
        let prevIndex = this.currentIndex - 1;

        // Si estamos al inicio, ir al final
        if (prevIndex < 0) {
            prevIndex = maxIndex;
        }

        this.goToSlide(prevIndex);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new StoriesCarousel(storiesData);
});
