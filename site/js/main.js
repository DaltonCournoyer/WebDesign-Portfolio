document.addEventListener('DOMContentLoaded', () => {
    // Wait until the DOM content is fully loaded before executing JavaScript.

    // JavaScript to toggle the navigation menu
    document.getElementById('hamburgerMenu').addEventListener('click', () => {
        // Add a click event listener to the hamburger menu button.
        const navLinks = document.getElementById('navLinks'); // Get the navigation links container.
        navLinks.classList.toggle('show'); // Toggle the 'show' class to display or hide the menu.
    });

    // Code only executes for the home.html page
    if (window.location.pathname === '/site/pages/home.html') {
        // Check if the current page's path matches home.html.

        // JavaScript to toggle the intro tab
        document.getElementById('whoAmIButton').addEventListener('click', () => {
            // Add a click event listener to the "Who Am I" button.
            const introTab = document.getElementById('introTab'); // Get the intro tab element.
            const isVisible = introTab.classList.toggle('show'); // Toggle the 'show' class to display or hide the tab.
            const heroSection = document.getElementById('heroSection'); // Get the hero section element.

            if (introTab.style.maxHeight) {
                // If the tab already has a max height set (i.e., it is visible):
                introTab.style.maxHeight = null; // Reset the max height to collapse the tab.
                introTab.style.padding = '0 20px'; // Adjust padding for the collapsed state.
                heroSection.style.height = '100vh'; // Reset the hero section height to full viewport height.
            } else {
                // If the tab is being expanded:
                introTab.style.maxHeight = '600px'; // Set the max height to fit the content.
                introTab.style.padding = '20px'; // Add padding for the expanded state.

                function myFunction(viewHeight) {
                    // Function to adjust the hero section height based on screen size.
                    if (viewHeight.matches) {
                        // If the screen width is 768px or less:
                        heroSection.style.height = '160vh'; // Adjust hero section height for smaller screens.
                    }
                }

                var viewHeight = window.matchMedia("(max-width: 768px)"); // Set up a media query.
                myFunction(viewHeight); // Call the function with the current media query state.

                // Attach a listener to update the layout when the screen size changes.
                viewHeight.addEventListener("change", function() {
                    myFunction(viewHeight); // Reapply adjustments when the screen size changes.
                });
            }

            if (isVisible) {
                // If the tab is visible after toggling:
                const tabRect = introTab.getBoundingClientRect(); // Get the tab's bounding rectangle.
                const viewportHeight = window.innerHeight; // Get the viewport height.

                if (tabRect.bottom > viewportHeight) {
                    // If the tab's bottom edge is outside the visible area:
                    const offset = tabRect.bottom - viewportHeight; // Calculate the amount to scroll.
                    window.scrollBy({ top: offset + 20, behavior: 'smooth' }); // Scroll to bring the tab into view.
                }
            }
        });
    }

    // Code only executes for the about.html page
    if (window.location.pathname === '/site/pages/about.html') {
        // Check if the current page's path matches about.html.

        const tiltContainer = document.querySelector('.tilt-container'); // Select the container for the tilt effect.
        const tiltImage = tiltContainer.querySelector('.profile-pic'); // Select the image inside the container.

        function handleMouseMove(event) {
            // Function to calculate and apply the tilt effect based on mouse movement.
            const { width, height, left, top } = tiltContainer.getBoundingClientRect(); // Get the container's dimensions and position.

            const x = event.clientX - left; // Calculate the X position relative to the container.
            const y = event.clientY - top; // Calculate the Y position relative to the container.

            const rotateX = ((y / height) - 0.5) * 40; // Map the Y position to a tilt angle along the X-axis.
            const rotateY = ((x / width) - 0.5) * -40; // Map the X position to a tilt angle along the Y-axis.

            tiltImage.style.transform = `scale(1.07) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; // Apply the tilt effect.
        }

        function resetTilt() {
            // Reset the tilt effect when the mouse leaves the container.
            tiltImage.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)'; // Reset the image's transform properties.
        }

        tiltContainer.addEventListener('mousemove', handleMouseMove); // Apply the tilt effect on mouse movement.
        tiltContainer.addEventListener('mouseleave', resetTilt); // Reset the tilt effect when the mouse leaves.
    }

    if (window.location.pathname === '/site/pages/projects.html') {
        // Check if the current page's path matches projects.html.

        const toggleButtons = document.querySelectorAll(".toggle-card-btn"); // Get all buttons with the "toggle-card-btn" class.

        toggleButtons.forEach(button => {
            // Add an event listener to each button.
            button.addEventListener("click", function() {
                const projectCard = button.closest(".project-card"); // Find the parent project card of the button.

                const projectContent = projectCard.querySelector(".project-content"); // Get the content section of the project card.
                const isHidden = projectContent.classList.contains("hidden"); // Check if the content is currently hidden.

                if (isHidden) {
                    button.classList.remove("glide-up"); // Ensure the button is back to its original position.
                    button.classList.add("glide-down"); // Move the button down to show the content.
                } else {
                    button.classList.remove("glide-down"); // Remove the downward movement.
                    button.classList.add("glide-up"); // Move the button up to hide the content.
                }

                projectContent.classList.toggle("hidden"); // Toggle the "hidden" class to show or hide the content.

                if (isHidden) {
                    button.textContent = "Hide Project"; // Change button text to "Hide Project" when content is visible.
                } else {
                    button.textContent = "Show Project"; // Change button text to "Show Project" when content is hidden.
                }
            });
        });
    }
});
