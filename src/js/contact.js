document.getElementById('contact-form').addEventListener('submit', function(event) {
    const buttonSubmit = document.querySelector(".button-submit");
    buttonSubmit.classList.add("blocked")
    event.preventDefault();

    fetch('https://leodvweb.tech/email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            issue: document.getElementById('issue').value,
            text: document.getElementById('text').value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const messageElement = document.getElementById('message');
        if (data.status === 'success') {
            messageElement.textContent = data.message;
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = data.message;
            messageElement.style.color = 'red';
        }
        buttonSubmit.classList.remove("blocked")
        setTimeout(() => {
            messageElement.textContent = "";
        }, 5000);
    })
    .catch(error => {
        const messageElement = document.getElementById('message');
        messageElement.textContent = 'Hubo un error al enviar el mensaje.';
        messageElement.style.color = 'red';
        console.error('Error:', error);
    });
});

const inputs = document.querySelectorAll(".input");

for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function() {
        if(this.value.length >= 1) {
            this.nextElementSibling.classList.add("pin-text");
        } else {
            this.nextElementSibling.classList.remove("pin-text");
        }
    })
}
