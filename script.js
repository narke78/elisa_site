// Sélection de tous les liens de la barre de navigation
const navLinks = document.querySelectorAll('nav ul li a');

// Ajout d'un gestionnaire d'événements à chaque lien
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Empêche le comportement par défaut
        const targetId = this.getAttribute('href'); // Récupère l'id cible
        const targetSection = document.querySelector(targetId); // Sélectionne la section cible
        
        // Défilement fluide avec JavaScript
        window.scrollTo({
            top: targetSection.offsetTop, // Position de la section
            behavior: 'smooth' // Défilement fluide
        });
    });
});

// Sélection du bouton de menu et de la liste de liens
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
});
const navLinksContainer = document.querySelector('.nav-links');

// Ajouter un gestionnaire d'événements pour le clic
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('show'); // Ajouter ou supprimer la classe "show"
});

// Curseur personnalisé
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutLine = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Mettre à jour la position du curseur "dot"
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Mettre à jour la position du curseur "outline"
    cursorOutLine.style.left = `${posX}px`;
    cursorOutLine.style.top = `${posY}px`;

    // Animation du contour du curseur
    cursorOutLine.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 500, fill: "forwards"});
});

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Variables dynamiques
let visibleItems = 4; // Nombre initial d'items visibles
const totalItems = items.length; // Total des rectangles
let currentIndex = 0;

// Met à jour le nombre d'éléments visibles en fonction de la taille de l'écran
function updateVisibleItems() {
    if (window.innerWidth < 768) {
        visibleItems = 1; // 1 article visible sur mobile
    } else if (window.innerWidth < 1024) {
        visibleItems = 3; // 3 articles visibles sur tablette
    } else {
        visibleItems = 4; // 4 articles visibles sur grand écran
    }
}

// Met à jour la position du carrousel
function updateCarousel() {
    const itemWidth = items[0].offsetWidth; // Largeur d'un item
    const translateX = -currentIndex * itemWidth; // Décale par rapport au nombre d'items visible et à la largeur d'un item
    carousel.style.transform = `translateX(${translateX}px)`; // Utilisation de px au lieu de % pour un défilement plus précis
}

// Flèche gauche
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1; // Défile vers la gauche
    } else {
        currentIndex = totalItems - visibleItems; // Retourne au dernier groupe visible
    }
    updateCarousel();
});

// Flèche droite
rightArrow.addEventListener('click', () => {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex += 1; // Défile vers la droite
    } else {
        currentIndex = 0; // Retourne au début
    }
    updateCarousel();
});

// Ajoute un événement de clic à chaque rectangle
items.forEach((item) => {
    item.addEventListener('click', (event) => {
        // Récupère l'URL depuis l'attribut data-url
        const url = item.getAttribute('data-url');
        if (url) {
            // Ouvre la page dans un nouvel onglet
            window.open(url, '_blank');
        }
    });
});

// Réagit au redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    updateVisibleItems();
    if (currentIndex > totalItems - visibleItems) {
        currentIndex = totalItems - visibleItems; // Empêche le débordement
    }
    updateCarousel();
});

// Initialisation au chargement
updateVisibleItems();
updateCarousel();
