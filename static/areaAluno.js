const flipBtn = document.getElementById("flipBtn");
const card = document.getElementById("card");

flipBtn.addEventListener("click", () => {
    card.classList.toggle("flipped");
    flipBtn.textContent = card.classList.contains("flipped") ? "Em andamento" : "Concluídos";
});

function imprimirCertificado() {
    window.open("certificado.html", "_blank");
}