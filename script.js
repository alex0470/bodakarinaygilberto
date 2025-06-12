    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    const pases = params.get('pases');

    const nombreMostrado = document.getElementById("nombreInvitado");
    const inputNombre = document.getElementById("nombre");
    const inputPases = document.getElementById("numPases");
    const spanMaxPases = document.getElementById("maxPases");

    nombreMostrado.textContent = decodeURIComponent(nombre || "Invitado Especial");
    inputNombre.value = decodeURIComponent(nombre || "");
    inputPases.max = pases || 1;
    spanMaxPases.textContent = pases || "1";

    document.getElementById("formConfirmacion").addEventListener("submit", function(e) {
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