const tamanhoTabuleiro = 4;
let posicaoJogador = 0;
let inicioTempo;

function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    for (let i = 0; i < tamanhoTabuleiro * tamanhoTabuleiro; i++) {
        const celula = document.createElement('div');
        celula.classList.add('celula');
        if (i === posicaoJogador) {
            celula.classList.add('player');
        }
        tabuleiro.appendChild(celula);
    }
}

// Gera uma pergunta aleatória
function gerarPergunta() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operacoes = ['+', '-', '*', '/'];
    const operacao = operacoes[Math.floor(Math.random() * operacoes.length)];
    let respostaCorreta;

    switch (operacao) {
        case '+':
            respostaCorreta = num1 + num2;
            break;
        case '-':
            respostaCorreta = num1 - num2;
            break;
        case '*':
            respostaCorreta = num1 * num2;
            break;
        case '/':
            respostaCorreta = Math.floor(num1 / num2);
            break;
        case '%':
            respostaCorreta = num1 % num2;
            break;
    }

    return {
        pergunta: `${num1} ${operacao} ${num2} = ?`,
        resposta: respostaCorreta
    };
}

let perguntaAtual = gerarPergunta();
document.getElementById('pergunta').textContent = perguntaAtual.pergunta;

// verifica a resposta 
function responderPergunta() {
    const respostaJogador = parseInt(document.getElementById('inputResposta').value);
    if (respostaJogador === perguntaAtual.resposta) {
        moverJogador();
        perguntaAtual = gerarPergunta();
        document.getElementById('pergunta').textContent = perguntaAtual.pergunta;
        document.getElementById('inputResposta').value = '';
    } else {
        alert('Resposta errada! Tente novamente.');
    }
}

// move o jogador no tabuleiro
function moverJogador() {
    if (posicaoJogador < tamanhoTabuleiro * tamanhoTabuleiro - 1) {
        posicaoJogador++;
        criarTabuleiro();
        if (posicaoJogador === tamanhoTabuleiro * tamanhoTabuleiro - 1) {
            const fimTempo = new Date();
            const tempoDecorrido = Math.floor((fimTempo - inicioTempo) / 1000);
            alert(`Parabéns! Você conseguiu completar o labirinto em: ${tempoDecorrido} segundos.`);
            document.getElementById('reiniciar').style.display = 'inline-block';
        }
    }
}

// reiniciar
function reiniciarJogo() {
    posicaoJogador = 0;
    inicioTempo = new Date();
    criarTabuleiro();
    perguntaAtual = gerarPergunta();
    document.getElementById('pergunta').textContent = perguntaAtual.pergunta;
    document.getElementById('inputResposta').value = '';
    document.getElementById('reiniciar').style.display = 'none';
}


inicioTempo = new Date();
criarTabuleiro();
