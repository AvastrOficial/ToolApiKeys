const MASTER_KEY = "$2a$10$w.nRHqE5ZoYbxGH0rowdjOFLsEVe8T7Co4GHFsLVDhEh0AUWvhZE6";

document.getElementById('save-button').addEventListener('click', () => {
  const url = document.getElementById('input-url').value.trim();
  if (!url) return alert('Por favor, escribe una URL.');

  fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': MASTER_KEY
    },
    body: JSON.stringify({ url })
  })
  .then(res => res.json())
  .then(data => {
    const binId = data.metadata.id;
    const shareLink = `${window.location.origin}${window.location.pathname}?id=${binId}`;
    document.getElementById('generated-link').value = shareLink;
    document.getElementById('link-container').style.display = 'block';
  })
  .catch(err => {
    console.error(err);
    alert('Error al generar el enlace.');
  });
});

document.getElementById('copy-button').addEventListener('click', () => {
  const input = document.getElementById('generated-link');
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand('copy');
  alert('¡Enlace copiado!');
});

// Función para crear y mostrar el iframe fullscreen con la URL o video de YouTube
function mostrarIframe(url) {
  // Limpiar el contenido del body
  document.body.innerHTML = '';

  // Crear iframe
  const iframe = document.createElement('iframe');

  // Estilos para que ocupe toda la pantalla
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';

  // Permisos para YouTube y multimedia
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');

  // Detectar si es URL de YouTube para usar embed
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1].split('&')[0];
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be/')) {
    // También soporte para URLs cortas de YouTube
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    // Carga directa de la URL
    iframe.src = url;
  }

  // Manejador de error en caso que la URL no permita carga en iframe
  iframe.onerror = () => {
    document.body.innerHTML = `
      <h2 style="text-align:center; margin-top: 2rem;">No se puede mostrar aquí</h2>
      <p style="text-align:center;">Este sitio no permite ser cargado en un frame. Redirigiendo en 3 segundos...</p>
      <p style="text-align:center;"><a href="${url}" target="_blank" rel="noopener noreferrer">Haz clic aquí si no te redirige automáticamente</a></p>
    `;
    setTimeout(() => {
      window.location.href = url;
    }, 3000);
  };

  document.body.appendChild(iframe);
}

// Al cargar la página, si hay parámetro id, buscar la URL y mostrar iframe
window.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(window.location.search).get('id');
  if (id) {
    fetch(`https://api.jsonbin.io/v3/b/${id}/latest`, {
      headers: { 'X-Master-Key': MASTER_KEY }
    })
    .then(res => res.json())
    .then(data => {
      const url = data.record.url;
      mostrarIframe(url);
    })
    .catch(err => {
      console.error(err);
      alert('Error al cargar la URL original.');
    });
  }
});
