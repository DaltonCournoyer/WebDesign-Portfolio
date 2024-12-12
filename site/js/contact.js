// outline:
//      - validate elements based off a required ID. smart, right?
//      - add validation for 

document.getElementById('contact-form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name) {
        alert('Please enter your name.');
        event.preventDefault();
    } else if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
    } else {
        alert('Thank you for reaching out! Your message has been sent.');
    }
});