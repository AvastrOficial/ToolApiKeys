document.addEventListener("DOMContentLoaded", function() {
  const generateButton = document.getElementById("generateEmail");
  const showTableButton = document.getElementById("showTableButton");
  const viewMessagesLink = document.getElementById("viewMessages");
  const dataTable = document.getElementById("dataTable");
  const dataTableBody = document.getElementById("dataBody");
  const generatedEmailElement = document.getElementById("email");
  const messagesContainer = document.getElementById("messages");
  const alertElement = document.getElementById("alert");
  const tabla = document.querySelector('.tabla');

  let currentEmail;
  let messageCount = 0;

  generateButton.addEventListener("click", async function() {
    const name = document.getElementById("name").value.trim();
    if (!name) {
      showAlert("Por favor ingresa un nombre.");
      return;
    }

    const selectedDomain = document.getElementById("domain").value;
    if (selectedDomain === "Seleciona tu Dominio") {
      showAlert("Por favor selecciona un dominio válido.");
      return;
    }

    try {
      const response = await fetch(`https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1&domain=${selectedDomain}`);
      const data = await response.json();
      const login = data[0].split('@')[0];
      currentEmail = `${name}_${login}@${selectedDomain}`;
      generatedEmailElement.textContent = currentEmail;
      messageCount = 0;
      updateNotificationBadge();

      // Agregar datos a la tabla
      addToTable(name, login, selectedDomain);
    } catch (error) {
      console.error("Error al generar el correo desechable:", error);
    }
  });

  showTableButton.addEventListener("click", function() {
    // Alternar la visibilidad de la tabla
    tabla.style.display = tabla.style.display === "none" ? "block" : "none";
  });

  viewMessagesLink.addEventListener("click", function(event) {
    event.preventDefault();

    if (!currentEmail) {
      showAlert("Primero genera un correo desechable.");
      return;
    }

    const atIndex = currentEmail.indexOf('@');
    if (atIndex === -1) {
      showAlert("El correo generado no es válido.");
      return;
    }

    const login = currentEmail.slice(0, atIndex);
    const selectedDomain = currentEmail.slice(atIndex + 1);

    const buzzerUrl = `https://www.1secmail.com/?login=${login}&domain=${selectedDomain}`;
    messagesContainer.innerHTML = `
      <p><strong>Generado Con Éxito:</strong>
      <button onclick="window.open('${buzzerUrl}', '_blank')">Buzón en línea</button></p>
    `;
  });

  function addToTable(name, login, domain) {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><button class="deleteBtn customBtn">Borrar</button></td>
      <td>${++messageCount}</td>
      <td>${currentEmail}</td>
      <td>${name}</td>
      <td><button class="openBuzonBtn" data-login="${login}" data-domain="${domain}">Buzón</button></td>
      <td>${formattedDate}</td>
    `;

    dataTableBody.appendChild(newRow);

    // Agregar evento click a los botones de la tabla
    const openBuzonBtns = document.querySelectorAll('.openBuzonBtn');
    openBuzonBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const login = this.getAttribute('data-login');
        const domain = this.getAttribute('data-domain');
        openBuzon(login, domain);
      });
    });

    // Agregar evento click a los botones de eliminar
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest("tr");
        row.parentNode.removeChild(row);
      });
    });
  }
  
  

  function openBuzon(login, domain) {
    const buzzerUrl = `https://www.1secmail.com/?login=${login}&domain=${domain}`;
    window.open(buzzerUrl, '_blank');
  }

  function updateNotificationBadge() {
    const notificationBadge = document.getElementById("notificationBadge");
    notificationBadge.textContent = messageCount;
    notificationBadge.style.display = messageCount > 0 ? "block" : "none";
  }

  function showAlert(message) {
    alertElement.textContent = message;
    alertElement.style.display = "block";
    setTimeout(function() {
      alertElement.style.display = "none";
    }, 2000); // Oculta la alerta después de 2 segundos
  }

  const closeTableButton = document.querySelector(".close-btn");

  showTableButton.addEventListener("click", function() {
    // Mostrar la tabla
    tabla.style.display = "block";
  });

  closeTableButton.addEventListener("click", function() {
    // Ocultar la tabla al hacer clic en el botón de cierre
    tabla.style.display = "none";
  });
});







    // Array con URLs de imágenes
const imagesArray = [
  'https://i.imgur.com/xLpjXE0.gif',
  'https://aniyuki.com/wp-content/uploads/2021/05/aniyuki-anime-dance-gif-87.gif',
  'https://th.bing.com/th/id/R.def0b505caff9c9160c22dabc987d4ca?rik=pvmA5Wq8AHYpwg&pid=ImgRaw&r=0',
'https://i.pinimg.com/originals/b6/6b/df/b66bdfe012a030c61f8e59dac0a68a22.gif',
'https://gifs.eco.br/wp-content/uploads/2022/07/gifs-de-anime-kawaii-12.gif',
'https://aniyuki.com/wp-content/uploads/2021/05/aniyuki-anime-dance-gif-81.gif',
'https://pa1.aminoapps.com/6050/24240c1bac34c3e5aacc4a81763daa5de02bc233_hq.gif',
'https://pa1.aminoapps.com/6050/a726bdd0c5a43da94aa4839fba7e888909d6f29c_hq.gif',
'https://aniyuki.com/wp-content/uploads/2021/05/aniyuki-anime-dance-gif-8.gif',
'https://usagif.com/wp-content/uploads/gify/49-anime-dance.gif',
'https://pa1.aminoapps.com/6909/7f3b8fe34ffc10d554707df0d29a7296fb6aa9far1-360-640_hq.gif',
'https://pa1.aminoapps.com/6909/06cb70eb90c81e8e291d21e4e02055422faa2862r1-500-281_hq.gif',
'https://pa1.aminoapps.com/6909/570c321af11daad0068f3ce73f12463f290e39bcr1-320-320_hq.gif',
'https://media.tenor.com/images/f0dda1f24bd7647ebab8060df502b061/tenor.gif',  'https://66.media.tumblr.com/25643dc7b50221bcc4cd31637f6f48d9/tumblr_ni8lwidwsW1t00j3vo1_400.gif',
  'https://usagif.com/wp-content/uploads/gify/48-anime-dance.gif',
  'https://th.bing.com/th/id/R.3a443087febf321bc6b0077af7e6f139?rik=4fGFyz1cIQ07ow&pid=ImgRaw&r=0',
  'https://pa1.narvii.com/6543/6b895a9a6aa03259e064be720b31e4b38cc9de55_hq.gif',
  'https://i.imgur.com/kauSpmL.gif',
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

