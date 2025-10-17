const textoEscribir = document.getElementById('textoEscribir');
const pregunta = document.getElementById('pregunta');
const mensajeFinal = document.getElementById('mensajeFinal');
const cajaCelebracion = document.getElementById('cajaCelebracion');

// --- EFECTO DE TEXTO MAQUINA ---
function escribirTextoElemento(elemento, texto, velocidad = 50, callback) {
  elemento.classList.remove('oculto');
  elemento.textContent = "";
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i === texto.length) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, velocidad);
}

// --- SECUENCIA AL CARGAR ---
window.addEventListener('load', () => {
  setTimeout(() => {
    // 1️⃣ Primer texto (como máquina)
    escribirTextoElemento(textoEscribir, "Cada historia tiene un inicio… y la nuestra se está escribiendo poco a poco 💕", 90, () => {
      // 2️⃣ Segundo texto
      setTimeout(() => {
        escribirTextoElemento(textoEscribir, "Sin planearlo, empezamos a compartir momentos inolvidables ✨", 90, () => {
          // 3️⃣ Tercer texto
          setTimeout(() => {
            escribirTextoElemento(textoEscribir, "Cada día me gusta más esta historia que estamos escribiendo juntos 💫", 90, () => {
              // 4️⃣ Último texto antes de la pregunta
              setTimeout(() => {
                escribirTextoElemento(textoEscribir, "Es por eso que hoy quiero preguntarte algo importante… 🌹", 90, () => {
                  setTimeout(() => pregunta.classList.remove('oculto'), 2500);
                });
              }, 2500);
            });
          }, 2500);
        });
      }, 2500);
    });
  }, 2500);
});

// --- BOTONES ---
document.getElementById('si').addEventListener('click', mostrarCelebracion);
document.getElementById('obvio').addEventListener('click', mostrarCelebracion);

function mostrarCelebracion() {
  pregunta.classList.add('oculto');
  cajaCelebracion.classList.remove('oculto');

  // Crear globos y corazones animados
  for (let i = 0; i < 30; i++) {
    const elemento = document.createElement('div');
    if (Math.random() > 0.5) {
      elemento.classList.add('globo');
    } else {
      elemento.classList.add('corazonRojo');
    }
    elemento.style.left = `${Math.random() * window.innerWidth}px`;
    elemento.style.bottom = '0px';
    elemento.style.animationDelay = `${Math.random()}s`;
    elemento.style.transform = `scale(${0.8 + Math.random() * 1.2})`;
    elemento.style.opacity = `${0.8 + Math.random() * 0.2}`;
    document.body.appendChild(elemento);
    setTimeout(() => elemento.remove(), 6000);
  }

  setTimeout(() => {
    mensajeFinal.classList.remove('oculto');
  }, 2500);
}

// --- CORAZONES DEL FONDO ---
const canvas = document.getElementById('corazones');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let corazones = [];

class Corazon {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
  dibujar() {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,105,180,0.8)';
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2,
                      this.x - this.size, this.y + this.size / 3,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3,
                      this.x + this.size / 2, this.y - this.size / 2,
                      this.x, this.y);
    ctx.fill();
  }
  actualizar() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.02);
    this.dibujar();
  }
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) {
    corazones.push(new Corazon(Math.random() * canvas.width, canvas.height, 10 + Math.random() * 10, 1 + Math.random()));
  }
  corazones.forEach((c, i) => {
    c.actualizar();
    if (c.y + c.size < 0) corazones.splice(i, 1);
  });
  requestAnimationFrame(animar);
}

animar();
