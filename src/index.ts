import { createInterface } from 'node:readline';
import Calculadora from './calculadora.js';
import Bhaskara from './bhaskara.js';

const ajuda = `
Calculadora RI6
Digite: numero1 numero2 operacao
Operações: somar, subtrair, multiplicar, dividir, potenciar, radiciar
Exemplos: 10 5 somar | 2 3 potenciar | 27 3 radiciar
Radiciação: primeiro número = radicando; segundo = índice inteiro não nulo.
Bhaskara: a b c bhaskara (exemplo: 1 -3 2 bhaskara)
Aceita decimais com ponto ou vírgula. Comandos: ajuda, sair.
`;

function lerNumero(valor: string): number {
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/i.test(valor)) {
    throw new Error(`Número inválido: ${valor}`);
  }
  const numero = Number(valor.replace(',', '.'));
  if (!Number.isFinite(numero)) throw new Error('Informe números finitos.');
  return numero;
}

const calculadora = new Calculadora();
const bhaskara = new Bhaskara();
const leitor = createInterface({ input: process.stdin, output: process.stdout });
let encerrado = false;
console.log(ajuda);
leitor.setPrompt('> ');
leitor.prompt();
leitor.on('line', (linha) => {
  if (encerrado) return;
  const partes = linha.trim().split(/\s+/);
  const comando = linha.trim().toLowerCase();
  if (comando === 'sair') {
    encerrado = true;
    leitor.close();
    return;
  }
  if (comando === 'ajuda') {
    console.log(ajuda);
  } else if (comando === 'brabo') {
    console.log('Easter egg desbloqueado: até Bhaskara respeita essa calculadora. 😎');
  } else {
    try {
      const operacao = partes.at(-1)!.toLowerCase();
      if (operacao === 'bhaskara') {
        if (partes.length !== 4) throw new Error('Use: a b c bhaskara.');
        const { delta, raizes } = bhaskara.calcular(
          lerNumero(partes[0]), lerNumero(partes[1]), lerNumero(partes[2]),
        );
        console.log(`Delta: ${delta}`);
        console.log(raizes.length === 0 ? 'A função não possui raízes reais.'
          : raizes.length === 1 ? `Raiz dupla: ${raizes[0]}`
          : `Raízes: x1 = ${raizes[0]}; x2 = ${raizes[1]}`);
      } else {
        if (partes.length !== 3) throw new Error('Use: numero1 numero2 operacao.');
        console.log(`Resultado: ${calculadora.calcular(operacao, lerNumero(partes[0]), lerNumero(partes[1]))}`);
      }
    } catch (erro) {
      console.log(`Erro: ${erro instanceof Error ? erro.message : String(erro)}`);
    }
  }
  leitor.prompt();
});
leitor.on('close', () => {
  encerrado = true;
  console.log('\nCalculadora encerrada.');
});
