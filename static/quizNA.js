document.querySelector(".enviar").addEventListener("click", function () {
    const respostasCorretas = {
        q1: 1,  
        q2: 2,  
        q3: 2,  
        q4: 2,  
        q5: 1,  
        q6: 2,  
        q7: 1,  
        q8: 2,  
        q9: 1,  
        q10: 2 
    };

    let acertos = 0;
    let respondidas = 0;

    for (let pergunta in respostasCorretas) {
        let opcao = document.querySelector(`input[name="${pergunta}"]:checked`);
        if (opcao) {
            respondidas++;
            if ([...opcao.parentNode.parentNode.querySelectorAll("label input")].indexOf(opcao) === respostasCorretas[pergunta]) {
                acertos++;
            }
        }
    }

    if (respondidas < 10) {
        alert("⚠️ Responda todas as perguntas!");
        return;
    }

    const resultadoDiv = document.createElement("div");
    resultadoDiv.style.position = "fixed";
    resultadoDiv.style.top = "0";
    resultadoDiv.style.left = "0";
    resultadoDiv.style.width = "100%";
    resultadoDiv.style.height = "100%";
    resultadoDiv.style.background = "rgba(0,0,0,0.65)";
    resultadoDiv.style.display = "flex";
    resultadoDiv.style.alignItems = "center";
    resultadoDiv.style.justifyContent = "center";
    resultadoDiv.style.zIndex = "9999";

    const caixa = document.createElement("div");
    caixa.style.background = "#fff";
    caixa.style.padding = "30px";
    caixa.style.borderRadius = "10px";
    caixa.style.textAlign = "center";
    caixa.style.width = "330px";
    caixa.style.fontFamily = "'Dosis'";

    const texto = document.createElement("p");
    texto.style.fontSize = "20px";
    texto.style.marginBottom = "15px";
    
    if (acertos >= 7) {
        texto.innerHTML = `🎉 <b>Parabéns!</b><br>Você acertou <b>${acertos}</b> questões!<br><br>✅ Você passou!<br><br>📜 Pode imprimir seu certificado na Área do Aluno.`;

        const botao = document.createElement("button");
        botao.textContent = "Ir para Área do Aluno";
        botao.style.padding = "10px 15px";
        botao.style.background = "#004587";
        botao.style.color = "#fff";
        botao.style.border = "none";
        botao.style.borderRadius = "5px";
        botao.style.cursor = "pointer";
        botao.style.fontSize = "16px";

        botao.addEventListener("click", function () {
            window.location.href = "../html/areaAluno.html";
        });

        caixa.appendChild(texto);
        caixa.appendChild(botao);
    } else {
        texto.innerHTML = `❌ Você acertou <b>${acertos}</b> questões.<br><br>Por pouco! Continue tentando!`;
        caixa.appendChild(texto);
    }

    resultadoDiv.appendChild(caixa);
    document.body.appendChild(resultadoDiv);

    resultadoDiv.addEventListener("click", function (e) {
        if (e.target === resultadoDiv) resultadoDiv.remove();
    });
});
