    let files = [];
    let cachedLinks = JSON.parse(localStorage.getItem('cachedLinks')) || [];

    function displayCachedLinks() {
      const cachedLinksContainer = document.getElementById('cachedLinks');
      cachedLinksContainer.innerHTML = '<strong>Enlaces guardados:</strong><br>';

      cachedLinks.forEach(savedLink => {
        const date = new Date(savedLink.date);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        cachedLinksContainer.innerHTML += `
          <div class="savedLink">
            <p>Fecha y hora: ${formattedDate}</p>
            <p>Nombre del archivo: ${savedLink.name}</p>
            <p>Peso del archivo: ${savedLink.size} bytes</p>
            <a href="${savedLink.link}" target="_blank">${savedLink.link}</a>
          </div>
          <br>
        `;
      });
    }

    function saveLinksToCache(link, file) {
      cachedLinks.push({
        link,
        date: new Date(),
        name: file.name,
        size: file.size
      });
      localStorage.setItem('cachedLinks', JSON.stringify(cachedLinks));
      displayCachedLinks();
    }

    function clearCache() {
      localStorage.removeItem('cachedLinks');
      cachedLinks = [];
      displayCachedLinks();
    }

    async function subirArchivos() {
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

      try {
        const response = await fetch('https://file.io/?expires=1w', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.success) {
          document.getElementById('linkContainer').style.display = 'block';
          const link = data.link;
          document.getElementById('link').innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
          files.forEach(file => saveLinksToCache(link, file));
        } else {
          console.error('Error al subir archivos');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    document.getElementById('fileInput').addEventListener('change', function() {
      files = Array.from(this.files);
    });

    displayCachedLinks();
    
    function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('show-menu');
}

    
    
    
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


  <a href="https://www.foroactivo.com" target="_blank"></a>

<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="56103a6e-1647-49f1-bebd-4200c16d2c66";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</scritp>
