document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get('nombre');
  const pases = params.get('pases');

  const nombreMostrado = document.getElementById("nombreInvitado");
  const inputNombre = document.getElementById("nombre");
  const inputPases = document.getElementById("pases");
  const spanMaxPases = document.getElementById("maxPases");
  const cantidadPases = document.getElementById("cantidadPases");
  const numPases = document.getElementById("numPases");

  // Mostrar datos extraídos
  if (nombreMostrado) nombreMostrado.textContent = decodeURIComponent(nombre || "Invitado Especial");
  if (inputNombre) inputNombre.value = decodeURIComponent(nombre || "");
  if (inputPases) inputPases.value = pases || 1;
  if (spanMaxPases) spanMaxPases.textContent = pases || "1";
  if (cantidadPases && pases) cantidadPases.textContent = pases;
  if (numPases) numPases.max = pases;

  // Lógica visual del formulario
  const asistencia = document.getElementById("asistencia");
  const personasDiv = document.getElementById("personasDiv");
  const nombresDiv = document.getElementById("nombresDiv");
  const nombresAsistentes = document.getElementById("nombresAsistentes");
  const btnConfirmar = document.getElementById("btnConfirmar");

  function resetForm() {
    personasDiv.style.display = "none";
    nombresDiv.style.display = "none";
    btnConfirmar.disabled = true;
    btnConfirmar.textContent = "ESPERANDO RESPUESTA";
  }

  asistencia.addEventListener("change", function () {
    if (asistencia.value === "Sí") {
      personasDiv.style.display = "block";
      nombresDiv.style.display = "none";
      btnConfirmar.disabled = true;
      btnConfirmar.textContent = "ESPERANDO RESPUESTA";
      numPases.value = "";
      nombresAsistentes.value = "";
    } else if (asistencia.value === "No") {
      personasDiv.style.display = "none";
      nombresDiv.style.display = "none";
      btnConfirmar.disabled = false;
      btnConfirmar.textContent = "CONFIRMAR AUSENCIA";
    } else {
      resetForm();
    }
  });

  numPases.addEventListener("input", function () {
    if (numPases.value && parseInt(numPases.value) > 0) {
      nombresDiv.style.display = "block";
      btnConfirmar.disabled = true;
      btnConfirmar.textContent = "ESPERANDO RESPUESTA";
    } else {
      nombresDiv.style.display = "none";
      btnConfirmar.disabled = true;
      btnConfirmar.textContent = "ESPERANDO RESPUESTA";
    }
  });

  nombresAsistentes.addEventListener("input", function () {
    if (nombresAsistentes.value.trim().length > 0) {
      btnConfirmar.disabled = false;
      btnConfirmar.textContent = "CONFIRMAR ASISTENCIA";
    } else {
      btnConfirmar.disabled = true;
      btnConfirmar.textContent = "ESPERANDO RESPUESTA";
    }
  });

  resetForm();
});