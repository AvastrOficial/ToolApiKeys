
  
     document.addEventListener("DOMContentLoaded", function () {
      const subirFotoLink = document.getElementById("subir-foto-link");
      const fileInput = document.getElementById("file-input");

      const originalImage = document.querySelector("#originalImage img");
      const blancoYNegroImage = document.querySelector("#blancoYNegro img");
      const sepiaImage = document.querySelector("#sepiaImage img");
      const saturateImage = document.querySelector("#saturateImage img");
      const brightnessImage = document.querySelector("#brightnessImage img");
      const contrastImage = document.querySelector("#contrastImage img");
      const blurImage = document.querySelector("#blurImage img");
      const opacityImage = document.querySelector("#opacityImage img");
      
      const blueToneImage = document.querySelector("#blueToneImage img");
      const orangeToneImage = document.querySelector("#orangeToneImage img");
      const pinkToneImage = document.querySelector("#pinkToneImage img");
      const greenToneImage = document.querySelector("#greenToneImage img");
      const purpleToneImage = document.querySelector("#purpleToneImage img");
      const yellowToneImage = document.querySelector("#yellowToneImage img");
       
       const shadowEffectImage = document.querySelector("#shadowEffectImage img");
       const rotateEffectImage = document.querySelector("#rotateEffectImage img");
       const invertEffectImage = document.querySelector("#invertEffectImage img");
       const combinationEffectImage = document.querySelector("#combinationEffectImage img");
       const filtrogris = document.querySelector("#filtrogris img");

       const rotateAnimationImage = document.querySelector("#rotateAnimationImage img");
       const scaleAnimationImage = document.querySelector("#scaleAnimationImage img");
       const opacityAnimationImage = document.querySelector("#opacityAnimationImage img");
       const translateAnimationImage = document.querySelector("#translateAnimationImage img");
       const colorChangeAnimationImage = document.querySelector("#colorChangeAnimationImage img");
       const bounceScaleAnimationImage = document.querySelector("#bounceScaleAnimationImage img");
       const filtroBrightnessImage = document.querySelector("#filtroBrightnessImage img");
       
        const filtroDistorcionGota = document.querySelector("#filtroDistorcionGota img");
    
        
       
       
      subirFotoLink.addEventListener("click", function (event) {
        event.preventDefault();
        fileInput.click();
      });

      fileInput.addEventListener("change", function () {
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
          if (files[i].type.match(/image.*/)) {
            const reader = new FileReader();

            reader.onload = function (e) {
              originalImage.src = e.target.result;
              blancoYNegroImage.src = e.target.result;
              sepiaImage.src = e.target.result;
              saturateImage.src = e.target.result;
              brightnessImage.src = e.target.result;
              contrastImage.src = e.target.result;
              blurImage.src = e.target.result;
              opacityImage.src = e.target.result;
              //separador de color
              blueToneImage.src = e.target.result;
              orangeToneImage.src = e.target.result;      
              pinkToneImage.src = e.target.result;
              greenToneImage.src = e.target.result;
              purpleToneImage.src = e.target.result;
              yellowToneImage.src = e.target.result;

              shadowEffectImage.src = e.target.result;
              rotateEffectImage.src = e.target.result;
              invertEffectImage.src = e.target.result;
              combinationEffectImage.src = e.target.result;
              filtrogris.src = e.target.result;
              
              rotateAnimationImage.src = e.target.result;
              scaleAnimationImage.src = e.target.result;
              opacityAnimationImage.src = e.target.result;
              translateAnimationImage.src = e.target.result;
              colorChangeAnimationImage.src = e.target.result;
              bounceScaleAnimationImage.src = e.target.result;
              filtroBrightnessImage.src = e.target.result;
              
              filtroDistorcionGota.src = e.target.result;
             
            };

            reader.readAsDataURL(files[i]);
          } else {
            alert("Por favor, seleccione solo imágenes.");
          }
        }
      });
    });
  
  
 document.addEventListener("DOMContentLoaded", function () {
  const botonesGuardarImagen = document.querySelectorAll(".guardarImagen");

  botonesGuardarImagen.forEach(function (boton) {
    boton.addEventListener("click", function () {
      const target = boton.getAttribute("data-target");
      const contenedorImagen = document.querySelector(target);
      const imagen = contenedorImagen.querySelector("img");

      // Crear un lienzo (canvas) con las dimensiones de la imagen
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imagen.width;
      canvas.height = imagen.height;

      // Aplicar el filtro al canvas y dibujar la imagen filtrada
      ctx.filter = getComputedStyle(imagen).getPropertyValue("filter");
      ctx.drawImage(imagen, 0, 0,  imagen.width, imagen.height);

      // Obtener la URL de la imagen desde el canvas
      const imagenURL = canvas.toDataURL(); 

      // Crear un enlace temporal para descargar la imagen
      const link = document.createElement("a");
      link.href = imagenURL;
      link.download = "Gracias_por_usar_BlazeShotZ.png";
      link.click();
    });
  });

  // Resto de tu código...
});

 function mostrarMensaje() {
    var confirmationOverlay = document.getElementById("rotateAnimationImage");
    confirmationOverlay.style.display = "flex";

    setTimeout(function () {
      confirmationOverlay.style.display = "none";
    }, 5000); // Ocultar el mensaje después de 5 segundos (puedes ajustar este valor)
  }
  
