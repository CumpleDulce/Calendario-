document.addEventListener("DOMContentLoaded", function () {
    const calendario = document.getElementById("calendario");
    const modal = document.getElementById("modal");
    const versiculoElemento = document.getElementById("versiculo");
    const explicacionElemento = document.getElementById("explicacion");
    const cerrarModal = document.getElementById("cerrar-modal");

    // Obtener la fecha actual
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate(); // Día del mes actual

    fetch("versiculos.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 1; i <= 31; i++) {
                const caja = document.createElement("div");
                caja.classList.add("caja");
                caja.textContent = i;
                caja.dataset.dia = i;

                // Bloquea los días futuros
                if (i > diaActual) {
                    caja.classList.add("bloqueado");
                    caja.style.pointerEvents = "none"; // Desactiva clics
                    caja.style.opacity = "0.5"; // Reduce opacidad para indicar que está bloqueado
                }

                // Evento de clic para abrir el modal con la información
                caja.addEventListener("click", function () {
                    if (!caja.classList.contains("bloqueado")) {
                        const info = data.find(item => item.dia == i);
                        if (info) {
                            versiculoElemento.textContent = `${info.versiculo}: ${info.texto}`; // Muestra la referencia + texto
                            explicacionElemento.textContent = info.explicacion || "No hay explicación disponible."; // Usa la explicación correcta
                            modal.style.display = "flex";
                        }
                    }
                });

                calendario.appendChild(caja);
            }
        })
        .catch(error => console.error("Error cargando el JSON:", error));

    // Cerrar el modal
    cerrarModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});