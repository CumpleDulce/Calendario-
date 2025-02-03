document.addEventListener("DOMContentLoaded", function () {
    const calendario = document.getElementById("calendario");
    const modal = document.getElementById("modal");
    const versiculoElemento = document.getElementById("versiculo");
    const explicacionElemento = document.getElementById("explicacion");
    const cerrarModal = document.getElementById("cerrar-modal");

    // 1. Fecha de inicio (1 de febrero de 2025 a medianoche, hora de Colombia)
    const fechaInicio = new Date(Date.UTC(2025, 1, 0, 5, 0, 0)); // 1 Feb 2025 05:00 UTC = 00:00 Colombia

    // 2. Calcular fecha actual en Colombia
    const ahoraUTC = new Date();
    const offsetColombia = -5; // UTC-5
    const ahoraColombia = new Date(ahoraUTC.getTime() + offsetColombia * 60 * 60 * 1000);

    // 3. Obtener medianoche actual en Colombia (convertida a UTC)
    const hoyColombiaUTC = Date.UTC(
        ahoraColombia.getUTCFullYear(),
        ahoraColombia.getUTCMonth(),
        ahoraColombia.getUTCDate()
    );

    // 4. Calcular días transcurridos
    const diferenciaTiempo = hoyColombiaUTC - fechaInicio.getTime();
    const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)) + 1;

    // Depuración: Verificar valores
    console.log("Fecha Inicio (UTC):", fechaInicio.toUTCString());
    console.log("Hoy Colombia (UTC):", new Date(hoyColombiaUTC).toUTCString());
    console.log("Días transcurridos:", diasTranscurridos);

    fetch("versiculos.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 1; i <= 31; i++) {
                const caja = document.createElement("div");
                caja.classList.add("caja");
                caja.textContent = i;
                caja.dataset.dia = i;

                // Desbloquear solo días pasados
                if (i > diasTranscurridos) {
                    caja.classList.add("bloqueado");
                    caja.style.pointerEvents = "none";
                    caja.style.opacity = "0.5";
                }

                // Evento clic
                caja.addEventListener("click", function () {
                    if (!caja.classList.contains("bloqueado")) {
                        const info = data.find(item => item.dia == i);
                        versiculoElemento.textContent = info ? `${info.versiculo}: ${info.texto}` : "No hay versículo para este día.";
                        explicacionElemento.textContent = info?.explicacion || "";
                        modal.style.display = "flex";
                    }
                });

                calendario.appendChild(caja);
            }
        })
        .catch(error => console.error("Error:", error));

    // Cerrar modal
    cerrarModal.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
});
