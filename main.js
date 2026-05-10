// Completely scrapped WebGL. Using Vanilla Tilt to provide actual DOM-based 3D interactions.

document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize VanillaTilt for the menu cards
    // This gives a highly realistic 3D physical effect to the food cards!
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,            // Maximum tilt rotation (degrees)
        speed: 400,         // Speed of the enter/exit transition
        glare: true,        // Add a glass-like glare effect
        "max-glare": 0.3,   // Max glare opacity
        scale: 1.05         // Slightly zoom in when hovering
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});