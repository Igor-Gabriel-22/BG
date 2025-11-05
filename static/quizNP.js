    document.querySelector(".enviar").addEventListener("click", function () {
        const respostasCorretas = {
            q1: 1, 
            q2: 1, 
            q3: 2, 
            q4: 1, 
            q5: 1, 
            q6: 2, 
            q7: 2, 
            q8: 1, 
            q9: 1, 
            q10: 1 
        };

        let acertos = 0;

        for (let pergunta in respostasCorretas) {
            const opcao = document.querySelector(`input[name="${pergunta}"]:checked`);
            if (
                opcao &&
                [...opcao.parentNode.parentNode.querySelectorAll("label input")].indexOf(opcao) === respostasCorretas[pergunta]
            ) {
                acertos++;
            }
        }

        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.65)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

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
            texto.innerHTML = `❌ Você acertou <b>${acertos}</b> questões.<br><br>Você ainda não atingiu a pontuação necessária.<br>Tente novamente!`;
            caixa.appendChild(texto);
        }

        overlay.appendChild(caixa);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) overlay.remove();
        });
    });