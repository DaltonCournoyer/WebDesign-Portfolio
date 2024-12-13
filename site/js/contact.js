document.addEventListener("DOMContentLoaded", () => {
    // Wait for the DOM content to fully load before executing the JavaScript code.

    const form = document.getElementById("contact-form"); // Select the contact form element.
    const formError = document.getElementById("form-error"); // Select the element displaying form-level errors.
    const availabilityInput = document.getElementById("availability"); // Select the availability date input field.

    // Set minimum date for the availability input to today's date.
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format.
    availabilityInput.setAttribute("min", today); // Set the "min" attribute of the availability input field.

    // Function to validate individual fields dynamically based on user input.
    const validateField = (field, validator, message) => {
        const errorElement = field.nextElementSibling; // Select the error message element adjacent to the field.

        if (!validator(field.value)) { // Check if the field value fails validation.
            field.classList.remove("valid"); // Remove the "valid" class if present.
            field.classList.add("invalid"); // Add the "invalid" class to highlight invalid input.
            errorElement.style.display = "block"; // Display the error message.
            errorElement.textContent = message; // Set the error message text.
            return false; // Return false indicating validation failed.
        } else {
            field.classList.remove("invalid"); // Remove the "invalid" class if present.
            field.classList.add("valid"); // Add the "valid" class to highlight valid input.
            errorElement.style.display = "none"; // Hide the error message.
            return true; // Return true indicating validation succeeded.
        }
    };

    // Function to validate the radio button group for the referral source.
    const validateRadioGroup = () => {
        const radioError = document.getElementById("referral-error"); // Select the error message element for the radio group.
        const referralRadioButtons = document.getElementsByName("referral"); // Select all radio buttons in the referral group.
        let isChecked = false; // Initialize a flag to check if any radio button is selected.

        // Iterate through the radio buttons to check if any are selected.
        for (let i = 0; i < referralRadioButtons.length; i++) {
            if (referralRadioButtons[i].checked) {
                isChecked = true; // Set the flag to true if a radio button is selected.
                break; // Exit the loop as one selection is sufficient.
            }
        }

        if (isChecked) {
            radioError.style.display = "none"; // Hide the error message if a selection is made.
            return true; // Return true indicating validation succeeded.
        } else {
            radioError.style.display = "block"; // Show the error message if no selection is made.
            radioError.textContent = "Please select a referral source."; // Set the error message text.
            return false; // Return false indicating validation failed.
        }
    };

    // Function to validate the checkbox group for technologies.
    const validateCheckboxGroup = () => {
        const checkboxes = document.querySelectorAll("input[name='technologies']:checked"); // Select all checked checkboxes for technologies.
        const checkboxError = document.querySelector("#tech-html").parentElement.nextElementSibling; // Select the error message element for the checkbox group.

        if (checkboxes.length === 0) { // Check if no checkboxes are selected.
            checkboxError.style.display = "block"; // Show the error message.
            checkboxError.textContent = "Please select at least one technology."; // Set the error message text.
            return false; // Return false indicating validation failed.
        } else {
            checkboxError.style.display = "none"; // Hide the error message if at least one checkbox is selected.
            return true; // Return true indicating validation succeeded.
        }
    };

    // Add event listeners to text fields for live validation on user interaction.
    const nameField = document.getElementById("name"); // Select the name input field.
    const emailField = document.getElementById("email"); // Select the email input field.
    const companyField = document.getElementById("company"); // Select the company input field.
    const qualitiesField = document.getElementById("qualities"); // Select the qualities textarea field.

    // Validate the name field on input.
    nameField.addEventListener("input", () => {
        validateField(nameField, (value) => value.trim().length >= 3, "Please enter a name with at least 3 characters.");
    });

    // Validate the email field on input.
    emailField.addEventListener("input", () => {
        validateField(emailField, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Please enter a valid email address (e.g., example@domain.com).");
    });

    // Validate the company field on input.
    companyField.addEventListener("input", () => {
        validateField(companyField, (value) => value.trim().length >= 5, "Please enter a company name with at least 5 characters.");
    });

    // Validate the qualities field on input.
    qualitiesField.addEventListener("input", () => {
        validateField(qualitiesField, (value) => value.trim().length >= 50, "Please describe at least 50 characters.");
    });

    // Function to reset the form fields and styles after successful submission.
    const resetFormStyles = () => {
        const formFields = form.querySelectorAll("input, textarea"); // Select all input and textarea fields in the form.

        // Iterate through all form fields to reset their styles.
        formFields.forEach((field) => {
            field.classList.remove("valid", "invalid"); // Remove validation classes from fields.
            field.style.backgroundColor = ""; // Reset the background color.
            field.style.borderColor = ""; // Reset the border color.
        });

        // Hide all error messages in the form.
        form.querySelectorAll(".error-message").forEach((error) => {
            error.style.display = "none";
        });
    };

    // Form submission handler.
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.

        let isValid = true; // Initialize a flag to track overall form validity.

        // Validate the radio buttons and checkboxes.
        isValid &= validateRadioGroup(); // Validate the radio group.
        isValid &= validateCheckboxGroup(); // Validate the checkbox group.

        // Validate individual text fields.
        isValid &= validateField(nameField, (value) => value.trim().length >= 3, "Please enter a name with at least 3 characters.");
        isValid &= validateField(emailField, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), "Please enter a valid email address (e.g., example@domain.com).");
        isValid &= validateField(companyField, (value) => value.trim().length >= 5, "Please enter a company name with at least 5 characters.");
        isValid &= validateField(qualitiesField, (value) => value.trim().length >= 50, "Please describe at least 50 characters.");

        if (isValid) { // Check if all validations passed.
            alert("You've successfully reached out. Please wait to receive a message back from us in 3-5 business days."); // Show success message.
            form.reset(); // Reset the form fields.
            resetFormStyles(); // Reset the form field styles.
        } else {
            formError.style.display = "block"; // Display a general form error message.
            formError.textContent = "Please fix the errors highlighted in the form."; // Set the form error message text.
        }
    });

    // Perform initial validation for radio buttons and checkboxes on page load.
    validateRadioGroup(); // Validate radio group on page load.
    validateCheckboxGroup(); // Validate checkbox group on page load.

    // Hide all error messages on page load.
    const allErrorMessages = form.querySelectorAll(".error-message"); // Select all error message elements.
    allErrorMessages.forEach((error) => {
        error.style.display = "none"; // Hide each error message.
    });
});