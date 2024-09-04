
const tela = document.querySelector('.tela');


let operacao = '';
let resultado = 0;
let operando = '';
let operador = '';

function atualizarTela(valor) {
    tela.textContent = valor;
}

// Função para lidar com a entrada de números e operadores
function clicarBotao(valor) {
    if (!isNaN(valor) || valor === ',') {
        operando += valor === ',' ? '.' : valor;
        atualizarTela(operando);
    } else if (valor === 'C') {
        operacao = '';
        resultado = 0;
        operando = '';
        operador = '';
        atualizarTela(0);
    } else if (valor === '=') {
        if (operador && operando) {
            realizarOperacao();
            atualizarTela(resultado);
            operacao = '';
            operando = '';
            operador = '';
        }
    } else {
        if (operando) {
            realizarOperacao();
            operador = valor;
            operacao = operando + ' ' + valor;
            operando = '';
        } else if (operador) {
            operador = valor;
            operacao = operacao.slice(0, -1) + valor;
        }
    }
}

// Função para realizar a operação
function realizarOperacao() {
    let numero = parseFloat(operando);
    if (!operador) {
        resultado = numero;
    } else {
        switch (operador) {
            case '+':
                resultado += numero;
                break;
            case '-':
                resultado -= numero;
                break;
            case '*':
                resultado *= numero;
                break;
            case '/':
                if (numero !== 0) {
                    resultado /= numero;
                } else {
                    alert("Erro: Divisão por zero!");
                }
                break;
            case '%':
                resultado = (resultado * numero) / 100;
                break;
        }
    }
}

// Adiciona o evento de clique para todos os botões
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        clicarBotao(button.textContent);
    });
});