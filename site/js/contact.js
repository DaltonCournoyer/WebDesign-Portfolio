// outline:
//      - validate elements based off a required ID.
//      - add validation for 

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const formError = document.getElementById("form-error");
    const availabilityInput = document.getElementById("availability");

    // Set the minimum date for the "availability" input to today's date
    const today = new Date().toISOString().split("T")[0];  // Get current date in YYYY-MM-DD format
    availabilityInput.setAttribute("min", today);

    // Track user interaction with a field
    function markFieldTouched(field) {
        if (!field.classList.contains("touched")) {
            field.classList.add("touched");
        }
    }

    // Add validation styles based on the field's validity
    function validateField(field, message) {
        const errorMessage = field.nextElementSibling;

        if (!field.checkValidity()) {
            if (field.classList.contains("touched")) {
                errorMessage.textContent = message;
                errorMessage.style.display = "block";
                field.classList.add("invalid");
                field.classList.remove("valid");
            }
        } else {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
            field.classList.add("valid");
            field.classList.remove("invalid");
        }
    }

    // Add event listeners for `blur` to validate fields only after interaction
    const fieldsToValidate = [
        { id: "name", message: "Name is required." },
        { id: "email", message: "Valid email is required." },
        { id: "qualities", message: "Please provide your response." }
    ];

    fieldsToValidate.forEach(({ id, message }) => {
        const field = document.getElementById(id);

        // Mark as touched on input or blur
        field.addEventListener("input", () => markFieldTouched(field));
        field.addEventListener("blur", () => validateField(field, message));
    });

    // Validate checkboxes and radio buttons on change
    function validateCheckboxGroup() {
        const technologiesChecked = form.querySelectorAll("input[name='technologies']:checked").length > 0;
        const techError = form.querySelector("#tech-html").parentElement.nextElementSibling;

        if (!technologiesChecked) {
            techError.textContent = "Please select at least one technology.";
            techError.style.display = "block";
        } else {
            techError.textContent = "";
            techError.style.display = "none";
        }
    }

    function validateRadioGroup() {
        const referralChecked = form.querySelectorAll("input[name='referral']:checked").length > 0;
        const referralError = form.querySelector("#referral-linkedin").parentElement.nextElementSibling;

        if (!referralChecked) {
            referralError.textContent = "Please select a referral source.";
            referralError.style.display = "block";
        } else {
            referralError.textContent = "";
            referralError.style.display = "none";
        }
    }

    const techCheckboxes = form.querySelectorAll("input[name='technologies']");
    techCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", validateCheckboxGroup);
    });

    const referralRadios = form.querySelectorAll("input[name='referral']");
    referralRadios.forEach((radio) => {
        radio.addEventListener("change", validateRadioGroup);
    });

    // Form submit validation
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission

        let isValid = true;

        // Validate all fields on submit
        fieldsToValidate.forEach(({ id, message }) => {
            const field = document.getElementById(id);
            markFieldTouched(field); // Ensure the field is marked as touched
            validateField(field, message);
            if (!field.checkValidity()) {
                isValid = false;
            }
        });

        // Validate checkboxes and radio buttons
        validateCheckboxGroup();
        validateRadioGroup();

        if (!form.querySelector("input[name='technologies']:checked")) {
            isValid = false;
        }
        if (!form.querySelector("input[name='referral']:checked")) {
            isValid = false;
        }

        // General form error
        if (!isValid) {
            formError.style.display = "block";
            formError.textContent = "Please fix the errors highlighted in the form.";
        } else {
            formError.style.display = "none";
            alert("Form submitted successfully!");
            form.reset(); // Reset the form on successful submission
            form.querySelectorAll("input, textarea").forEach((field) => {
                field.classList.remove("valid", "invalid", "touched");
            });
        }
    });
});

