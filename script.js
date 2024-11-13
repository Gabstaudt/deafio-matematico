const tamanhoTabuleiro = 4;
let posicaoJogador = 0;
let inicioTempo;
let segundos = 0;
let minutos = 0;
let cronometroInterval;

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

// Verifica a resposta
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

// Move o jogador no tabuleiro
function moverJogador() {
    if (posicaoJogador < tamanhoTabuleiro * tamanhoTabuleiro - 1) {
        posicaoJogador++;
        criarTabuleiro();
        if (posicaoJogador === tamanhoTabuleiro * tamanhoTabuleiro - 1) {
            const fimTempo = new Date();
            const tempoDecorrido = Math.floor((fimTempo - inicioTempo) / 1000);
            pararCronometro();
            alert(`Parabéns! Você conseguiu completar o desafio em: ${tempoDecorrido} segundos.`);
            document.getElementById('reiniciar').style.display = 'inline-block';
        }
    }
}

// Reinicia o jogo
function reiniciarJogo() {
    posicaoJogador = 0;
    segundos = 0;
    minutos = 0;
    atualizarCronometro();
    inicioTempo = new Date();
    criarTabuleiro();
    perguntaAtual = gerarPergunta();
    document.getElementById('pergunta').textContent = perguntaAtual.pergunta;
    document.getElementById('inputResposta').value = '';
    document.getElementById('reiniciar').style.display = 'none';
    iniciarCronometro();
}

function iniciarCronometro() {
    cronometroInterval = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }
        atualizarCronometro();
    }, 1000);
}

function pararCronometro() {
    clearInterval(cronometroInterval);
}

function atualizarCronometro() {
    const cronometro = document.getElementById('cronometro');
    cronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

inicioTempo = new Date();
criarTabuleiro();
iniciarCronometro();
