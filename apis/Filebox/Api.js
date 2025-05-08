let files = [];
let cachedLinks = JSON.parse(localStorage.getItem('cachedLinks')) || [];

// Mostrar historial de enlaces guardados
function displayCachedLinks() {
  const cachedLinksContainer = document.getElementById('cachedLinks');
  cachedLinksContainer.innerHTML = '<strong>Enlaces guardados:</strong><br>';
  cachedLinks.forEach(savedLink => {
    const date = new Date(savedLink.date);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    cachedLinksContainer.innerHTML += `
      <div style="margin-bottom:10px;padding:10px;border:1px solid #ddd;border-radius:5px;">
        <p><strong>Fecha:</strong> ${formattedDate}</p>
        <p><strong>Archivo:</strong> ${savedLink.name}</p>
        <p><strong>Peso:</strong> ${savedLink.size} bytes</p>
        <a href="${savedLink.link}" target="_blank">${savedLink.link}</a>
      </div>
    `;
  });
}

// Guardar enlace en cache local
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

// Limpiar historial de enlaces
function clearCache() {
  localStorage.removeItem('cachedLinks');
  cachedLinks = [];
  displayCachedLinks();
}

// Subir archivos a Catbox o Litterbox
async function subirArchivos() {
  const uploadType = document.getElementById('uploadType').value;
  const formData = new FormData();

  if (uploadType === 'litterbox') {
    formData.append('reqtype', 'fileupload');
    formData.append('time', '1h'); // 1 hora
  } else {
    formData.append('reqtype', 'fileupload');
    formData.append('userhash', '');
  }

  files.forEach(file => formData.append('fileToUpload', file));

  const endpoint = uploadType === 'litterbox'
    ? 'https://cors-anywhere.herokuapp.com/https://litterbox.catbox.moe/resources/internals/api.php'
    : 'https://cors-anywhere.herokuapp.com/https://catbox.moe/user/api.php';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: uploadType === 'litterbox' ? { 'Origin': location.origin } : undefined
    });

    const link = await response.text();
    if (link.startsWith('http')) {
      document.getElementById('linkContainer').style.display = 'block';
      document.getElementById('link').innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
      files.forEach(file => saveLinksToCache(link, file));
    } else {
      alert('Error al subir: ' + link);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al subir el archivo.');
  }
}

// Verificar si CORS Anywhere está habilitado
async function verificarCORS() {
  const corsStatusBtn = document.getElementById('corsStatusBtn');
  const corsBtn = document.getElementById('corsBtn'); // Referencia al botón CORS

  try {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://example.com', {
      method: 'GET'
    });

    if (res.ok) {
      corsStatusBtn.style.backgroundColor = 'green';
      corsStatusBtn.textContent = 'CORS Anywhere ACTIVADO';
      corsBtn.style.display = 'none'; // Ocultar botón CORS
    } else {
      throw new Error('No activo');
    }
  } catch {
    corsStatusBtn.style.backgroundColor = 'red';
    corsStatusBtn.textContent = 'CORS Anywhere NO ACTIVADO';
    corsBtn.style.display = 'inline-block'; // Mostrar el botón para activar CORS
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Crear contenedor principal
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.maxWidth = '600px';
  container.style.margin = 'auto';
  container.style.fontFamily = 'Arial, sans-serif';

  // Selector de tipo de subida
  const selectLabel = document.createElement('label');
  selectLabel.textContent = 'Selecciona el servidor:';
  selectLabel.style.display = 'block';
  selectLabel.style.marginBottom = '5px';

  const select = document.createElement('select');
  select.id = 'uploadType';
  select.style.marginBottom = '10px';
  select.style.padding = '5px';
  select.innerHTML = `
    <option value="catbox">Catbox (permanente)</option>
    <option value="litterbox">Litterbox (temporal)</option>
  `;

  // Input de archivos
  const input = document.createElement('input');
  input.type = 'file';
  input.id = 'fileInput';
  input.multiple = true;
  input.style.display = 'block';
  input.style.margin = '10px 0';

  // Botón de subir
  const uploadBtn = document.createElement('button');
  uploadBtn.textContent = 'Subir archivos';
  uploadBtn.style.padding = '10px 20px';
  uploadBtn.style.backgroundColor = '#4CAF50';
  uploadBtn.style.color = 'white';
  uploadBtn.style.border = 'none';
  uploadBtn.style.borderRadius = '5px';
  uploadBtn.style.cursor = 'pointer';
  uploadBtn.onclick = subirArchivos;

  // Botón de limpiar historial
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Limpiar historial';
  clearBtn.style.marginLeft = '10px';
  clearBtn.style.padding = '10px 20px';
  clearBtn.style.backgroundColor = '#f44336';
  clearBtn.style.color = 'white';
  clearBtn.style.border = 'none';
  clearBtn.style.borderRadius = '5px';
  clearBtn.style.cursor = 'pointer';
  clearBtn.onclick = clearCache;

  // Contenedor de enlaces generados
  const linkContainer = document.createElement('div');
  linkContainer.id = 'linkContainer';
  linkContainer.style.display = 'none';
  linkContainer.style.marginTop = '15px';

  const linkElement = document.createElement('div');
  linkElement.id = 'link';
  linkElement.style.wordBreak = 'break-all';
  linkContainer.appendChild(linkElement);

  // Insertar salto de línea (br)
  const lineBreak = document.createElement('br');
  linkContainer.appendChild(lineBreak);

  // Botón para activar CORS Anywhere
  const corsBtn = document.createElement('button');
  corsBtn.id = 'corsBtn';
  corsBtn.textContent = 'Ir a activar CORS Anywhere';
  corsBtn.style.marginTop = '15px';
  corsBtn.style.padding = '10px 20px';
  corsBtn.style.backgroundColor = '#2196F3';
  corsBtn.style.color = 'white';
  corsBtn.style.border = 'none';
  corsBtn.style.borderRadius = '5px';
  corsBtn.style.cursor = 'pointer';
  corsBtn.onclick = () => window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank');

  // Botón que muestra el estado de CORS
  const corsStatusBtn = document.createElement('button');
  corsStatusBtn.id = 'corsStatusBtn';
  corsStatusBtn.textContent = 'Verificando CORS...';
  corsStatusBtn.style.marginTop = '10px';
  corsStatusBtn.style.padding = '10px 20px';
  corsStatusBtn.style.border = 'none';
  corsStatusBtn.style.borderRadius = '5px';
  corsStatusBtn.style.color = 'white';
  corsStatusBtn.style.cursor = 'default';
  corsStatusBtn.style.backgroundColor = 'gray';

  linkContainer.appendChild(corsBtn);
  linkContainer.appendChild(corsStatusBtn);

  // Historial de enlaces
  const cachedLinksDiv = document.createElement('div');
  cachedLinksDiv.id = 'cachedLinks';
  cachedLinksDiv.style.marginTop = '20px';

  // Agregar elementos al contenedor
  container.appendChild(selectLabel);
  container.appendChild(select);
  container.appendChild(input);
  container.appendChild(uploadBtn);
  container.appendChild(clearBtn);
  container.appendChild(corsBtn); // Mostrar el botón CORS
  container.appendChild(corsStatusBtn); // Mostrar el estado de CORS
  container.appendChild(linkContainer);
  container.appendChild(cachedLinksDiv);

  document.body.appendChild(container);

  input.addEventListener('change', function () {
    files = Array.from(this.files);
  });

  displayCachedLinks();
  verificarCORS(); // Comprobar el estado de CORS
});
