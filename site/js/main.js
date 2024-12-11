function scrollToSection() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

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
