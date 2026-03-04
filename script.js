// 1. Configuração do Typewriter (Efeito de Escrita)
const textElement = document.getElementById("typing-text");
const phrases = [
    "Desenvolvedor FullStack", 
    "Estudante de Computação", 
    "o Futuro do Brasil"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; 
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; 
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

// 2. Scroll suave para o botão
function scrollToProjects() {
    document.getElementById("projetos").scrollIntoView({ behavior: "smooth" });
}

// 3. Efeito da Navbar ao rolar
window.addEventListener("scroll", function() {
    const nav = document.querySelector("#navbar");
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

// 4. Intersection Observer para animações de entrada (Cards e Skills)
const elements = document.querySelectorAll('.card, .skill-box, .contact-container');
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }, index * 150); 
        }
    });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));

// 5. Inicialização de tudo ao carregar a página
window.onload = function() {
    // Inicia o efeito de escrita
    typeEffect();


    // Inicia as partículas
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#38bdf8" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#38bdf8",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false},
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            }
        },
        "retina_detect": true
    });
};

function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("active");
} 

window.addEventListener("scroll", () => {
    const scrollSection = document.querySelector(".horizontal-scroll-wrapper");
    const track = document.querySelector(".projects-track");
    
    if (scrollSection && track) {
        const bounding = scrollSection.getBoundingClientRect();
        const sectionHeight = scrollSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Verifica se a seção está visível na tela
        if (bounding.top <= 0 && bounding.bottom >= windowHeight) {
            // Calcula quanto do scroll já passou dentro da seção (0 a 1)
            const progress = -bounding.top / (sectionHeight - windowHeight);
            
            // Calcula a distância máxima que o track pode percorrer
            const maxMove = track.offsetWidth - window.innerWidth + (window.innerWidth * 0.2);
            
            // Aplica a transformação
            track.style.transform = `translateX(-${progress * maxMove}px)`;
        }
    }
});