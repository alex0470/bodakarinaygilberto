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

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const data = new URLSearchParams();
            data.append("nombre", decodeURIComponent(nombre || ""));
            data.append("asistencia", document.getElementById("asistencia").value);
            data.append("numPases", inputPases.value);
            data.append("nombresAsistentes", nombresAsistentes.value);

            fetch('https://script.google.com/macros/s/AKfycbzlO1jbdj2gQzHX7j3Bb5FUY7AeEEI-4_Wld4YXCXG7GvimzVJlycICm3lbDDgatiMs/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data.toString()
            })
            .then(res => res.text())
            .then(res => {
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

    resetForm();
});