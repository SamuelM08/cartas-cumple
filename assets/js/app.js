const form = document.getElementById("formBuscar");
const inputNombre = document.getElementById("nombre");
const inputFecha = document.getElementById("fecha");
const error = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  error.textContent = "";

  const nombre = inputNombre.value.trim();
  const fecha = inputFecha.value.trim();

  if (!/^[a-záéíóúñ ]+$/.test(nombre)) {
    error.textContent = "Nombre solo en minúsculas y espacios.";
    return;
  }

  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(fecha);
  if (!m) {
    error.textContent = "La fecha debe ser DD/MM/AAAA.";
    return;
  }

  const params = new URLSearchParams({
    nombre: nombre.toLowerCase(),
    fecha: fecha
  });

  window.location.href = "pages/carta.html?" + params.toString();
});
