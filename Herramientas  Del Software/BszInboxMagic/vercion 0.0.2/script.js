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

    // Array con URLs de imágenes
const imagesArray = [
  'https://i.imgur.com/xLpjXE0.gif',
  'https://i.imgur.com/80MHOrB.gif',
  'https://66.media.tumblr.com/cc8c5565e482137b321f3ec8ac20a00c/tumblr_inline_nl5nohPphc1sptc1c.gif',
'https://files.catbox.moe/a91ute.gif',
'https://gifs.eco.br/wp-content/uploads/2022/07/gifs-de-anime-kawaii-12.gif',
'https://pa1.aminoapps.com/6050/43baebbee36542a4ce11fbc909416b5beb4cc2ab_hq.gif',
'https://pa1.aminoapps.com/6050/24240c1bac34c3e5aacc4a81763daa5de02bc233_hq.gif',
'https://pa1.aminoapps.com/6050/a726bdd0c5a43da94aa4839fba7e888909d6f29c_hq.gif',
'https://pa1.aminoapps.com/6050/4c06ddc9120de846759cd641bdda285d5dc46a31_hq.gif',
'https://pa1.aminoapps.com/6050/a62bc89f49ef9ff43ff3c417532d0c19b479578f_hq.gif',
'https://pa1.aminoapps.com/6909/7f3b8fe34ffc10d554707df0d29a7296fb6aa9far1-360-640_hq.gif',
'https://pa1.aminoapps.com/6909/06cb70eb90c81e8e291d21e4e02055422faa2862r1-500-281_hq.gif',
'https://pa1.aminoapps.com/6909/570c321af11daad0068f3ce73f12463f290e39bcr1-320-320_hq.gif',
'https://pa1.aminoapps.com/6909/f9799f918f9bb17f91406d3d5309344c2d14eed7r1-499-500_hq.gif'
  // Añade más URLs de imágenes según sea necesario
];

function mostrarImagenAleatoria() {
  // Obtener un número aleatorio basado en la longitud del array de imágenes
  const randomIndex = Math.floor(Math.random() * imagesArray.length);

  // Obtener el elemento img y establecer su atributo src con la URL de la imagen aleatoria
  const imgElement = document.getElementById('randomImage');
  imgElement.src = imagesArray[randomIndex];
}

// Llamar a la función al cargar la página o cuando sea necesario
mostrarImagenAleatoria();
