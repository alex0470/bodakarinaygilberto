document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    const pases = params.get('pases');

    const nombreMostrado = document.getElementById("nombreInvitado");
    const inputNombre = document.getElementById("nombre");
    const inputPases = document.getElementById("numPases");
    const spanMaxPases = document.getElementById("maxPases");

    if (nombreMostrado) nombreMostrado.textContent = decodeURIComponent(nombre || "Invitado Especial");
    if (inputNombre) inputNombre.value = decodeURIComponent(nombre || "");
    if (inputPases) inputPases.max = pases || 1;
    if (spanMaxPases) spanMaxPases.textContent = pases || "1";

    const form = document.getElementById("formConfirmacion");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = {
          nombre: inputNombre.value,
          asistencia: document.getElementById("asistencia").value,
          numPases: inputPases.value
        };

        fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
          method: 'POST',
          body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(res => {
          document.getElementById("mensaje").textContent = "¡Gracias por confirmar!";
        })
        .catch(() => {
          document.getElementById("mensaje").textContent = "Hubo un error. Intenta más tarde.";
        });
      });
    }

    document.querySelectorAll('.btn-ubicacion').forEach(btn => {
      btn.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if(url) window.open(url, '_blank');
      });
    });
  });