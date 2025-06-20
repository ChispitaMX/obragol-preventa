
// Fecha objetivo (puedes cambiarla)
const fechaObjetivo = new Date("2025-07-01T00:00:00").getTime();

const diasSpan = document.getElementById("dias");
const horasSpan = document.getElementById("horas");
const minutosSpan = document.getElementById("minutos");
const segundosSpan = document.getElementById("segundos");

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  diasSpan.textContent = dias.toString().padStart(2, '0');
  horasSpan.textContent = horas.toString().padStart(2, '0');
  minutosSpan.textContent = minutos.toString().padStart(2, '0');
  segundosSpan.textContent = segundos.toString().padStart(2, '0');
}

actualizarContador();
setInterval(actualizarContador, 1000);
