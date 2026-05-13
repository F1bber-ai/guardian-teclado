import './styles.css';

const video = document.getElementById('camera');
const startButton = document.getElementById('startCamera');
const statusText = document.getElementById('status');

async function startCamera() {
  try {
    statusText.textContent = 'Solicitando permiso de cámara...';

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: 'environment'
        },
        width: {
          ideal: 1280
        },
        height: {
          ideal: 720
        }
      },
      audio: false
    });

    video.srcObject = stream;

    statusText.textContent = 'Cámara activa. Apunta hacia el teclado.';
    startButton.style.display = 'none';
  } catch (error) {
    console.error('Error al abrir la cámara:', error);

    if (error.name === 'NotAllowedError') {
      statusText.textContent = 'Permiso de cámara denegado. Debes permitir el acceso.';
    } else if (error.name === 'NotFoundError') {
      statusText.textContent = 'No se encontró cámara disponible.';
    } else {
      statusText.textContent = 'No se pudo abrir la cámara. Revisa permisos o HTTPS.';
    }
  }
}

startButton.addEventListener('click', startCamera);