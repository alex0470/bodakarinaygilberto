document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    const pases = params.get('pases');

    const nombreMostrado = document.getElementById("nombreInvitado");
    const cantidadPases = document.getElementById("cantidadPases");

    if (nombreMostrado) nombreMostrado.textContent = decodeURIComponent(nombre || "Invitado Especial");
    if (cantidadPases && pases) cantidadPases.textContent = pases;

    const form = document.getElementById("formConfirmacion");
    const asistencia = document.getElementById("asistencia");
    const personasDiv = document.getElementById("personasDiv");
    const nombresDiv = document.getElementById("nombresDiv");
    const maxPases = document.getElementById("maxPases");
    const numPases = document.getElementById("numPases");
    const nombresAsistentes = document.getElementById("nombresAsistentes");
    const btnConfirmar = document.getElementById("btnConfirmar");
    const mensaje = document.getElementById("mensaje");

    function resetForm() {
        personasDiv.style.display = "none";
        nombresDiv.style.display = "none";
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = "ESPERANDO RESPUESTA";
    }

    if (asistencia) {
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
                btnConfirmar.textContent = "AVISAR";
            } else {
                resetForm();
            }
        });
    }

    if (numPases) {
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
    }

    if (nombresAsistentes) {
        nombresAsistentes.addEventListener("input", function () {
            if (nombresAsistentes.value.trim().length > 0) {
                btnConfirmar.disabled = false;
                btnConfirmar.textContent = "CONFIRMAR ASISTENCIA";
            } else {
                btnConfirmar.disabled = true;
                btnConfirmar.textContent = "ESPERANDO RESPUESTA";
            }
        });
    }

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const params = new URLSearchParams(window.location.search);
            const nombre = params.get('nombre') || "";
            const asistencia = document.getElementById("asistencia").value;
            const numPases = document.getElementById("numPases") ? document.getElementById("numPases").value : "";
            const nombresAsistentes = document.getElementById("nombresAsistentes") ? document.getElementById("nombresAsistentes").value : "";

            const url = "https://script.google.com/macros/s/AKfycbzlO1jbdj2gQzHX7j3Bb5FUY7AeEEI-4_Wld4YXCXG7GvimzVJlycICm3lbDDgatiMs/exec";

            fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    nombre,
                    asistencia,
                    numPases,
                    nombresAsistentes
                })
            })
            .then(() => {
                mensaje.innerHTML = "<p style='color:green; text-align:center;'>¡Gracias por confirmar tu asistencia!</p>";
                btnConfirmar.disabled = true;
                btnConfirmar.textContent = "CONFIRMADO ✅";
            })
            .catch(() => {
                mensaje.textContent = "Hubo un error. Intenta más tarde.";
            });
        });
    }

    document.querySelectorAll('.btn-ubicacion').forEach(btn => {
        btn.addEventListener('click', function () {
            const url = this.getAttribute('data-url');
            if (url) window.open(url, '_blank');
        });
    });

    const btnAbrir = document.querySelector('.boton');
    if (btnAbrir) {
        btnAbrir.addEventListener('click', function() {
            const params = new URLSearchParams(window.location.search);
            window.location.href = 'invitacion.html?' + params.toString();
        });
    }

    // Obtener pases de la URL
    if (maxPases && pases) maxPases.textContent = pases;
    if (numPases && pases) numPases.max = pases;

    resetForm();
});