document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to toggle the navigation menu
    document.getElementById('hamburgerMenu').addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('show'); // Add/remove 'show' class to display menu
    });

    // Code only executes for the home.html page
    if (window.location.pathname === '/site/pages/home.html') {
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
    }

    // Code only executes for the about.html page
    if (window.location.pathname === '/site/pages/about.html')
    {
        // Select the tilt container
        const tiltContainer = document.querySelector('.tilt-container');
        const tiltImage = tiltContainer.querySelector('.profile-pic');

        // Function to calculate and apply tilt effect
        function handleMouseMove(event) {
            const { width, height, left, top } = tiltContainer.getBoundingClientRect();

            // Calculate the cursor's position within the container
            const x = event.clientX - left; 
            const y = event.clientY - top;

            // Map the cursor position to rotation angles
            const rotateX = ((y / height) - 0.5) * 40; // Tilts along X-axis
            const rotateY = ((x / width) - 0.5) * -40; // Tilts along Y-axis

            // Apply the tilt effect to the image
            tiltImage.style.transform = `scale(1.07) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        // Reset the tilt effect when the mouse leaves
        function resetTilt() {
            tiltImage.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        }

        // Event listeners for hover and mouse move
        tiltContainer.addEventListener('mousemove', handleMouseMove);
        tiltContainer.addEventListener('mouseleave', resetTilt);
    }
});
