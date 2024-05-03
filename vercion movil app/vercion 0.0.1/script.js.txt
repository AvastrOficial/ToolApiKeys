  function toggleHerramientas() {
    var herramientas = document.querySelector('.herramientas');
    if (herramientas.style.display === 'none') {
      herramientas.style.display = 'block';
    } else {
      herramientas.style.display = 'none';
    }
  }


 function toggleBurbuja1() {
    var burbuja1 = document.querySelector('.burbuja1');
    if (burbuja1.style.display === 'none') {
      burbuja1.style.display = 'block';
    } else {
      burbuja1.style.display = 'none';
    }
  }

 function toggleBurbuja2() {
    var burbuja2 = document.querySelector('.burbuja2');
    if (burbuja2.style.display === 'none') {
      burbuja2.style.display = 'block';
    } else {
      burbuja2.style.display = 'none';
    }
  }

function toggleBurbuja3() {
    var burbuja3 = document.querySelector('.burbuja3');
    if (burbuja3.style.display === 'none') {
      burbuja3.style.display = 'block';
    } else {
      burbuja3.style.display = 'none';
    }
  }
function toggleBurbuja4() {
    var burbuja4 = document.querySelector('.burbuja4');
    if (burbuja4.style.display === 'none') {
      burbuja4.style.display = 'block';
    } else {
      burbuja4.style.display = 'none';
    }
  }
function toggleBurbuja5() {
    var burbuja5 = document.querySelector('.burbuja5');
    if (burbuja5.style.display === 'none') {
      burbuja5.style.display = 'block';
    } else {
      burbuja5.style.display = 'none';
    }
  }
function toggleBurbuja6() {
    var burbuja6 = document.querySelector('.burbuja6');
    if (burbuja6.style.display === 'none') {
      burbuja6.style.display = 'block';
    } else {
      burbuja6.style.display = 'none';
    }
  }
function toggleBurbuja7() {
    var burbuja7 = document.querySelector('.burbuja7');
    if (burbuja7.style.display === 'none') {
      burbuja7.style.display = 'block';
    } else {
      burbuja7.style.display = 'none';
    }
  }

 



function toggleiniciar() {
    var iniciar = document.querySelector('.iniciar');
    if (iniciar.style.display === 'none') {
      iniciar.style.display = 'block';
    } else {
      iniciar.style.display = 'none';
    }
  }

function togglecontactar() {
    var contactar = document.querySelector('.contactar');
    if (contactar.style.display === 'none') {
      contactar.style.display = 'block';
    } else {
      contactar.style.display = 'none';
    }
  }

function toggleactualizar() {
    var actualizar = document.querySelector('.actualizar');
    if (actualizar.style.display === 'none') {
      actualizar.style.display = 'block';
    } else {
      actualizar.style.display = 'none';
    }
  }


function expandMenu() {
    var mainMenu = document.querySelector('.main-menu');
    mainMenu.classList.toggle('expanded');
  }





















        function validarYEnviar() {
            // Obtener valores de los campos
            var username = document.getElementById('usernameInput').value;
            var password = document.getElementById('passwordInput').value;

            // Validar los campos (puedes agregar lógica de validación personalizada aquí)
            if (username.trim() === '' || password.trim() === '') {
                alert('Por favor, complete todos los campos.');
            } else {
                // Enviar el formulario si la validación es exitosa
                document.getElementById('loginForm').submit();
            }
        }

        function togglePasswordVisibility() {
            var passwordInput = document.getElementById('passwordInput');
            var passwordToggle = document.querySelector('.password-toggle');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggle.textContent = 'Ocultar';
            } else {
                passwordInput.type = 'password';
                passwordToggle.textContent = 'Mostrar';
            }
        }
      
      
      
       document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const popupButton = document.getElementById("popup-button");

  let lastShownTime = 0;

  document.addEventListener("click", function () {
    const currentTime = new Date().getTime();
    if (currentTime - lastShownTime >= 3600000) { // 1 hour in milliseconds
      lastShownTime = currentTime;
      popup.style.display = "block";
    }
  });

  popupButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
});


























