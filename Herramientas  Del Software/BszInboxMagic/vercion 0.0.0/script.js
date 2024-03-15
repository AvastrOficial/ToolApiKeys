document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateEmail");
    const viewMessagesLink = document.getElementById("viewMessages");
    const generatedEmailElement = document.getElementById("email");
    const messagesContainer = document.getElementById("messages");
    const messagesListElement = document.getElementById("messagesList");

    let currentEmail;
    let messageCount = 0;

    generateButton.addEventListener("click", async function() {
        try {
            const response = await fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
            const data = await response.json();
            currentEmail = data[0];
            generatedEmailElement.textContent = currentEmail;
            messageCount = 0;
            updateNotificationBadge();
        } catch (error) {
            console.error("Error al generar el correo desechable:", error);
        }
    });

    viewMessagesLink.addEventListener("click", function(event) {
        event.preventDefault();

        if (!currentEmail) {
            alert("Primero genera un correo desechable.");
            return;
        }

        // Obtén el login desde el correo generado
        const atIndex = currentEmail.indexOf('@');
        if (atIndex === -1) {
            alert("El correo generado no es válido.");
            return;
        }

        const login = currentEmail.slice(0, atIndex);
        const selectedDomain = currentEmail.slice(atIndex + 1);

        const buzzerUrl = `https://www.1secmail.com/?login=${login}&domain=${selectedDomain}`;
        messagesContainer.innerHTML = `<p>Enlace al buzón generado con exito:</p> <a href="${buzzerUrl}" target="_blank">${buzzerUrl}</a></p>`;
    });

    function updateNotificationBadge() {
        const notificationBadge = document.getElementById("notificationBadge");
        if (messageCount > 0) {
            notificationBadge.textContent = messageCount;
            notificationBadge.style.display = "block";
        } else {
            notificationBadge.style.display = "none";
        }
    }
});

