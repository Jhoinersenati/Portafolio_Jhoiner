let menuVisible = false;

// Función que oculta o muestra el menu
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList.remove("responsive");
        menuVisible = false;
    } else {
        nav.classList.add("responsive");
        menuVisible = true;
    }
}

// Función que aplica las animaciones de las habilidades
function efectoHabilidades() {
    const skills = document.getElementById("Skill-y-Otros");
    if(!skills) return;
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        const habilidades = document.getElementsByClassName("progress-fill");
        // Las animaciones se disparan por CSS gracias a la transición y el ancho definido en el HTML
    }
}

// Scroll Spy para actualizar el link activo basado en la sección visible
function scrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// Controladores de eventos
window.onscroll = function() {
    efectoHabilidades();
    scrollSpy();
    
    // Actualizar barra de progreso
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if(progressBar) {
        progressBar.style.width = scrolled + "%";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    scrollSpy();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            alert('¡Gracias ' + data.nombre + '! Tu mensaje ha sido enviado correctamente.');
            this.reset();
        });
    }

    // Smooth scroll y manejo de menú
    // Smooth scroll y manejo de menú
    document.querySelectorAll('#nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ocultar el menu en modo responsivo
            document.getElementById("nav").classList.remove("responsive");
            menuVisible = false;

            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Efecto Zoom en la imagen de perfil
    const imgContainer = document.querySelector('.contenedor-img');
    if (imgContainer) {
        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        document.body.appendChild(overlay);

        imgContainer.addEventListener('click', () => {
            imgContainer.classList.toggle('zoomed');
            overlay.classList.toggle('active');
            document.body.style.overflow = imgContainer.classList.contains('zoomed') ? 'hidden' : 'auto';
        });

        overlay.addEventListener('click', () => {
            imgContainer.classList.remove('zoomed');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Efecto Typewriter (Máquina de escribir)
    const text = "Estudiante de Ingeniería de Software con Inteligencia Artificial - SENATI";
    const typewriterElement = document.getElementById("typewriter");
    let i = 0;

    function speedType() {
        if (i < text.length) {
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(speedType, 80);
        } else {
            // Eliminar el cursor (borde derecho) cuando termine de escribir
            typewriterElement.style.borderRight = "none";
            typewriterElement.style.animation = "none";
        }
    }

    if (typewriterElement) {
        setTimeout(speedType, 1000); // Empezar después de 1 segundo
    }
});
