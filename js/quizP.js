document.querySelector(".enviar").addEventListener("click", function () {
        const respostasCorretas = {
            q1: 1, // B
            q2: 1, // B
            q3: 2, // C
            q4: 1, // B
            q5: 1, // B
            q6: 2, // C
            q7: 2, // C
            q8: 1, // B
            q9: 1, // B
            q10: 1 // B
        };

        let acertos = 0;

        for (let pergunta in respostasCorretas) {
            let opcao = document.querySelector(`input[name="${pergunta}"]:checked`);
            if (opcao && [...opcao.parentNode.parentNode.querySelectorAll("label input")].indexOf(opcao) === respostasCorretas[pergunta]) {
                acertos++;
            }
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
        caixa.style.width = "300px";
        caixa.style.fontFamily = "'Dosis'";

        const texto = document.createElement("p");
        texto.style.fontSize = "20px";
        texto.style.marginBottom = "15px";

        if (acertos >= 7) {
            texto.innerHTML = `🎉 <b>Parabéns!</b><br>Você acertou <b>${acertos}</b> questões!<br><br>Você passou!<br>✅ Pode imprimir seu certificado na Área do Aluno.`;

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
            texto.innerHTML = `❌ Você acertou <b>${acertos}</b> questões.<br><br>Infelizmente, você não atingiu a pontuação necessária.<br>Tente novamente!`;
            caixa.appendChild(texto);
        }

        resultadoDiv.appendChild(caixa);
        document.body.appendChild(resultadoDiv);

        resultadoDiv.addEventListener("click", function (e) {
            if (e.target === resultadoDiv) resultadoDiv.remove();
        });
    });