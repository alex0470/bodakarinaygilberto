document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    const pases = params.get('pases');

    const nombreMostrado = document.getElementById("nombreInvitado");
    const inputNombre = document.getElementById("nombre");
    const inputPases = document.getElementById("numPases");
    const spanMaxPases = document.getElementById("maxPases");
    const cantidadPases = document.getElementById("cantidadPases");

    if (nombreMostrado) nombreMostrado.textContent = decodeURIComponent(nombre || "Invitado Especial");
    if (inputNombre) inputNombre.value = decodeURIComponent(nombre || "");
    if (inputPases) inputPases.max = pases || 1;
    if (spanMaxPases) spanMaxPases.textContent = pases || "1";
    if (cantidadPases && pases) cantidadPases.textContent = pases;

    const form = document.getElementById("formConfirmacion");
    if (form) {
      form.addEventListener("submit", function(e) {
      e.preventDefault();

      const data = {
        nombre: decodeURIComponent(nombre || ""),
        asistencia: document.getElementById("asistencia").value,
        numPases: inputPases.value,
        nombresAsistentes: document.getElementById("nombresAsistentes").value
      };

      console.log("Datos enviados:", data);

      fetch('https://script.google.com/macros/s/AKfycby5EZ2IJr9ISvjJMJq6wrTE9xBzwLpxKd6YG3NFu9AuH3hdMAeD22IiD38ormj-CJnT/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then(res => {
        document.getElementById("mensaje").innerHTML = "<p style='color:green;'>¡Gracias por confirmar tu asistencia!</p>";
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = "CONFIRMADO ✅";
      })
      .catch(() => {
        console.error("Error al enviar:", err);
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

    const asistencia = document.getElementById("asistencia");
    const personasDiv = document.getElementById("personasDiv");
    const nombresDiv = document.getElementById("nombresDiv");
    const numPases = document.getElementById("numPases");
    const nombresAsistentes = document.getElementById("nombresAsistentes");
    const btnConfirmar = document.getElementById("btnConfirmar");

    function resetForm() {
        personasDiv.style.display = "none";
        nombresDiv.style.display = "none";
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = "ESPERANDO RESPUESTA";
    }

    asistencia.addEventListener("change", function() {
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
            btnConfirmar.textContent = "AVISAR";
        } else {
            resetForm();
        }
    });

    numPases.addEventListener("input", function() {
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

    nombresAsistentes.addEventListener("input", function() {
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