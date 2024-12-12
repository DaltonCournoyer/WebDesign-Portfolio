function scrollToSection() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// JavaScript to toggle the navigation menu
document.getElementById('hamburgerMenu').addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show'); // Add/remove 'show' class to display menu
});

// JavaScript to toggle the intro tab
document.getElementById('whoAmIButton').addEventListener('click', () => {
    const introTab = document.getElementById('introTab');
    const isVisible = introTab.classList.toggle('show');
    const heroSection = document.getElementById('heroSection');
    if (introTab.style.maxHeight) {
        introTab.style.maxHeight = null;
        introTab.style.padding = '0 20px';
        heroSection.style.height = '100vh'; 
    } else {
        introTab.style.maxHeight = '600px'; /* Adjust to match the content size */
        introTab.style.padding = '20px';

        function myFunction(viewHeight) {
            if (viewHeight.matches) { // If media query matches
                heroSection.style.height = '160vh';
            }
        }
          
        var viewHeight = window.matchMedia("(max-width: 768px)")
          
        myFunction(viewHeight);
          
        // Attach listener function on state changes
        viewHeight.addEventListener("change", function() {
            myFunction(viewHeight);
        });
    }

    if (isVisible) {
        // Ensure the tab is fully visible by dynamically adjusting spacing
        const tabRect = introTab.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (tabRect.bottom > viewportHeight) {
            const offset = tabRect.bottom - viewportHeight;

            // Scroll the page up if necessary to show the full content
            window.scrollBy({ top: offset + 20, behavior: 'smooth' });
        }
    }
});

// Form validation example
function validateContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!name || !email) {
            e.preventDefault();
            alert('Please fill out all required fields!');
        }
    });
}