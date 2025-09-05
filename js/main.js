// Configuration des animations Lottie
const lottieConfig = {
    hero: {
        container: document.getElementById('heroAnimation'),
        path: 'animations/hero.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
    },
    webDev: {
        container: document.getElementById('webDevAnimation'),
        path: 'animations/web-dev.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
    },
    network: {
        container: document.getElementById('networkAnimation'),
        path: 'animations/network.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
    },
    security: {
        container: document.getElementById('securityAnimation'),
        path: 'animations/security.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
    },
    about: {
        container: document.getElementById('aboutAnimation'),
        path: 'animations/about.json',
        loop: true,
        autoplay: true,
        renderer: 'svg'
    }
};

// Initialisation des animations Lottie avec gestion d'erreur
Object.entries(lottieConfig).forEach(([key, config]) => {
    if (config.container) {
        try {
            const animation = lottie.loadAnimation(config);
            animation.addEventListener('DOMLoaded', () => {
                config.container.classList.add('scale-in');
            });
        } catch (error) {
            console.error(`Erreur lors du chargement de l'animation ${key}:`, error);
        }
    }
});

// Gestion du menu mobile améliorée
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu hidden';
mobileMenu.innerHTML = `
    <div class="p-4">
        <button class="absolute top-4 right-4 hover:scale-110 transition-transform" id="closeMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <div class="flex flex-col space-y-4 mt-8">
            <a href="index.html" class="text-xl hover:text-blue-600 transition-colors">Accueil</a>
            <a href="services.html" class="text-xl hover:text-blue-600 transition-colors">Services</a>
            <a href="apropos.html" class="text-xl hover:text-blue-600 transition-colors">À propos</a>
            <a href="contact.html" class="text-xl hover:text-blue-600 transition-colors">Contact</a>
        </div>
    </div>
`;
document.body.appendChild(mobileMenu);

// Animation du menu mobile
menuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
        mobileMenu.style.transform = 'translateX(0)';
        mobileMenu.style.opacity = '1';
    }, 10);
});

document.getElementById('closeMenu').addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(100%)';
    mobileMenu.style.opacity = '0';
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
});

// Animations au scroll améliorées
const revealElements = document.querySelectorAll('.reveal, .scroll-fade');
let lastScrollY = window.scrollY;

const revealOnScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (scrollDirection === 'down') {
            if (elementTop < windowHeight - 100) {
                element.classList.add('active', 'visible');
            }
        } else {
            if (elementBottom > 100) {
                element.classList.add('active', 'visible');
            } else {
                element.classList.remove('active', 'visible');
            }
        }
    });
    
    lastScrollY = currentScrollY;
};

// Optimisation des performances avec requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            revealOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});
window.addEventListener('load', revealOnScroll);

// Effet de parallax amélioré
const parallaxElements = document.querySelectorAll('.parallax-bg');
if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Transitions de page améliorées
const pageTransition = document.createElement('div');
pageTransition.className = 'page-transition';
document.body.appendChild(pageTransition);

// Gestion des liens internes avec animation
document.querySelectorAll('a[href^="index.html"], a[href^="services.html"], a[href^="apropos.html"], a[href^="contact.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        
        // Animation de sortie
        pageTransition.classList.add('active');
        
        // Sauvegarde de la position de défilement
        sessionStorage.setItem('scrollPosition', window.scrollY);
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    });
});

// Animation de chargement de page
window.addEventListener('load', () => {
    pageTransition.classList.remove('active');
    
    // Restauration de la position de défilement
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// Micro-interactions sur les cartes de service
document.querySelectorAll('.service-card, .hover-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation du formulaire améliorée
const form = document.querySelector('form');
if (form) {
    const formInputs = form.querySelectorAll('input, textarea, select');
    let isSubmitting = false;

    formInputs.forEach(input => {
        // Animation au focus
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('scale-105');
            input.parentElement.style.zIndex = '1';
        });

        // Animation à la perte du focus
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('scale-105');
            input.parentElement.style.zIndex = '0';
        });

        // Validation en temps réel
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
        });
    });

    // Gestion du formulaire avec animation
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        isSubmitting = true;
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Animation de soumission
        submitButton.innerHTML = `
            <span class="loading-spinner"></span>
            Envoi en cours...
        `;
        submitButton.disabled = true;
        
        try {
            // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Animation de succès
            submitButton.innerHTML = 'Message envoyé !';
            submitButton.classList.add('bg-green-600');
            
            // Réinitialisation du formulaire
            setTimeout(() => {
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('bg-green-600');
                isSubmitting = false;
            }, 2000);
        } catch (error) {
            // Animation d'erreur
            submitButton.innerHTML = 'Erreur, réessayez';
            submitButton.classList.add('bg-red-600');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('bg-red-600');
                isSubmitting = false;
            }, 2000);
        }
    });
}

// Gestion du menu actif avec animation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        // Animation d'entrée pour la page active
        document.body.classList.add('page-loaded');
    }
});

// Animation des icônes au survol
document.querySelectorAll('.icon-hover').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Animation des titres
document.querySelectorAll('.title-animate').forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.style.transform = 'scale(1.02)';
    });

    title.addEventListener('mouseleave', () => {
        title.style.transform = 'scale(1)';
    });
}); 