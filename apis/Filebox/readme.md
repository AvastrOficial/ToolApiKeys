# 📦 Subida de Archivos a Catbox / Litterbox con Historial Local

Este proyecto permite subir archivos a los servicios **Catbox** (permanente) y **Litterbox** (temporal) desde el navegador. Ofrece una interfaz automática para seleccionar el servicio, subir archivos, mostrar enlaces generados y guardar un historial local. También incluye verificación del proxy **CORS Anywhere** para evitar errores de seguridad.

---

## 🚀 Cómo usar

Carga el script en tu HTML insertando la siguiente línea:

```html
<script src="https://appbsz.crearforo.net/14692.js"></script>
```

Una vez cargado, se generará automáticamente una interfaz amigable que permite:

    Seleccionar el servidor (Catbox o Litterbox)

    Subir múltiples archivos

    Ver el enlace generado tras cada subida

    Guardar el historial localmente en localStorage

    Limpiar el historial

    Verificar si CORS Anywhere está activo

## 📁 Funciones principales

    subirArchivos(): Sube los archivos seleccionados a Catbox o Litterbox

    saveLinksToCache(): Guarda el nombre, enlace y tamaño de los archivos subidos en localStorage

    displayCachedLinks(): Muestra el historial de enlaces guardados

    clearCache(): Elimina el historial de subidas

    verificarCORS(): Comprueba si el proxy CORS Anywhere está activo

## 🌐 CORS Anywhere

Debido a restricciones de seguridad del navegador (CORS), se utiliza un proxy para permitir las subidas a Catbox:

🔗 Activa manualmente CORS Anywhere antes de subir archivos:

👉 https://cors-anywhere.herokuapp.com/corsdemo

El script también verifica automáticamente si el proxy ya está activo.
## 📜 Requisitos

    Navegador moderno

    Conexión a internet

    JavaScript habilitado

    Activar manualmente el proxy CORS si es necesario

## 🧪 Enlaces y almacenamiento

    Los enlaces generados se muestran tras cada subida.

    Se guardan automáticamente en el navegador usando localStorage.

    Puedes limpiar el historial con un solo clic.

## 📌 Notas

    Catbox guarda los archivos de forma permanente.

    Litterbox elimina los archivos tras 1 hora.

## 🧩 Créditos

    Hosting de archivos: Catbox.moe

    Proxy CORS: CORS Anywhere
