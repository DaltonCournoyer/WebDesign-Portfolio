document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const formError = document.getElementById("form-error");
    const availabilityInput = document.getElementById("availability");
    
    // Set minimum date for the availability input
    const today = new Date().toISOString().split("T")[0];
    availabilityInput.setAttribute("min", today);

    // Function to validate individual fields with live interaction
    const validateField = (field, validator, message) => {
        const errorElement = field.nextElementSibling;

        if (!validator(field.value)) {
            field.classList.remove("valid");
            field.classList.add("invalid"); // Add 'invalid' class for invalid input
            errorElement.style.display = "block"; // Show error message
            errorElement.textContent = message;
            return false;
        } else {
            field.classList.remove("invalid");
            field.classList.add("valid"); // Add 'valid' class for valid input
            errorElement.style.display = "none"; // Hide error message
            return true;
        }
    };

    // Function to validate radio button group (referral source)
    const validateRadioGroup = () => {
        const radioError = document.getElementById("referral-error");
        const referralRadioButtons = document.getElementsByName("referral");
        let isChecked = false;

        // Check if any radio button is selected
        for (let i = 0; i < referralRadioButtons.length; i++) {
            if (referralRadioButtons[i].checked) {
                isChecked = true;
                break;
            }
        }

        if (isChecked) {
            radioError.style.display = "none"; // Hide error if a selection is made
            return true;
        } else {
            radioError.style.display = "block"; // Show error if no selection
            radioError.textContent = "Please select a referral source.";
            return false;
        }
    };

    // Function to validate checkbox group
    const validateCheckboxGroup = () => {
        const checkboxes = document.querySelectorAll("input[name='technologies']:checked");
        const checkboxError = document.querySelector("#tech-html").parentElement.nextElementSibling;

        if (checkboxes.length === 0) {
            checkboxError.style.display = "block"; // Show error if no checkboxes are selected
            checkboxError.textContent = "Please select at least one technology.";
            return false;
        } else {
            checkboxError.style.display = "none"; // Hide error if at least one checkbox is selected
            return true;
        }
    };

    // Add event listeners for live validation on text fields (after interaction)
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const companyField = document.getElementById("company");
    const qualitiesField = document.getElementById("qualities");

    // Only validate after user interacts with the field (input event)
    nameField.addEventListener("input", () => {
        validateField(nameField, (value) => value.trim().length >= 3, "Please enter a name with at least 3 characters.");
    });

    emailField.addEventListener("input", () => {
        validateField(emailField, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Please enter a valid email address (e.g., example@domain.com).");
    });

    companyField.addEventListener("input", () => {
        validateField(companyField, (value) => value.trim().length >= 5, "Please enter a company name with at least 5 characters.");
    });

    qualitiesField.addEventListener("input", () => {
        validateField(qualitiesField, (value) => value.trim().length >= 50, "Please describe at least 50 characters.");
    });

    // Reset the form fields' background and border to default on successful submission
    const resetFormStyles = () => {
        const formFields = form.querySelectorAll("input, textarea");

        formFields.forEach((field) => {
            field.classList.remove("valid", "invalid"); // Remove validation classes
            field.style.backgroundColor = ""; // Reset background color
            field.style.borderColor = ""; // Reset border color
        });

        // Reset the error messages
        form.querySelectorAll(".error-message").forEach((error) => {
            error.style.display = "none";
        });
    };

    // Form submission handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate radio buttons and checkboxes immediately (on page load)
        isValid &= validateRadioGroup();
        isValid &= validateCheckboxGroup();

        // Validate individual fields after user interaction
        isValid &= validateField(nameField, (value) => value.trim().length >= 3, "Please enter a name with at least 3 characters.");
        isValid &= validateField(emailField, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Please enter a valid email address (e.g., example@domain.com).");
        isValid &= validateField(companyField, (value) => value.trim().length >= 5, "Please enter a company name with at least 5 characters.");
        isValid &= validateField(qualitiesField, (value) => value.trim().length >= 50, "Please describe at least 50 characters.");

        // Handle submission
        if (isValid) {
            alert("You've successfully reached out. Please wait to receive a message back from us in 3-5 business days.");
            form.reset(); // Reset the form values
            resetFormStyles(); // Reset the styles for all form fields
        } else {
            formError.style.display = "block";
            formError.textContent = "Please fix the errors highlighted in the form.";
        }
    });

    // Initial validation for radio buttons and checkboxes on page load
    validateRadioGroup();
    validateCheckboxGroup();

    // Hide error messages on page load by default
    const allErrorMessages = form.querySelectorAll(".error-message");
    allErrorMessages.forEach((error) => {
        error.style.display = "none";
    });
});