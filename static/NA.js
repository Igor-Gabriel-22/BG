const frame = document.getElementById("slideFrame");
const botaoProximo = document.getElementById("proximoSlide");
const botaoVoltar = document.getElementById("voltarSlide");
const botaoContinuar = document.getElementById("btnContinuar");

const totalSlides = 8; 
let slideAtual = 1;

const caminhoBase = "../slides/NA/Treinamento em Produtos (1)_page-";

function atualizarSlide() {
    frame.src = `${caminhoBase}${String(slideAtual).padStart(4, '0')}.jpg`;

    botaoVoltar.style.display = slideAtual === 1 ? "none" : "inline-block";
    botaoProximo.style.display = slideAtual === totalSlides ? "none" : "inline-block";
    botaoContinuar.style.display = slideAtual === totalSlides ? "inline-block" : "none";
}

botaoProximo.addEventListener("click", () => {
    if (slideAtual < totalSlides) {
        slideAtual++;
        atualizarSlide();
    }
});

botaoVoltar.addEventListener("click", () => {
    if (slideAtual > 1) {
        slideAtual--;
        atualizarSlide();
    }
});

atualizarSlide();
