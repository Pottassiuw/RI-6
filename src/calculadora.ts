import Calculo from './operacoes/calculo.js';
import Soma from './operacoes/soma.js';
import Subtracao from './operacoes/subtracao.js';
import Multiplicacao from './operacoes/multiplicacao.js';
import Divisao from './operacoes/divisao.js';
import Potenciacao from './operacoes/potenciacao.js';
import Radiciacao from './operacoes/radiciacao.js';

export default class Calculadora {
  private readonly operacoes: ReadonlyMap<string, Calculo> = new Map<string, Calculo>([
    ['somar', new Soma()],
    ['subtrair', new Subtracao()],
    ['multiplicar', new Multiplicacao()],
    ['dividir', new Divisao()],
    ['potenciar', new Potenciacao()],
    ['radiciar', new Radiciacao()],
  ]);

  public calcular(operacao: string, numero1: number, numero2: number): number {
    const calculo = this.operacoes.get(operacao.toLowerCase());
    if (!calculo) throw new Error('Operação desconhecida. Digite ajuda para ver as opções.');
    if (![numero1, numero2].every(Number.isFinite)) throw new Error('Informe dois números finitos.');
    // A mesma chamada executa diferentes implementações de Calculo (polimorfismo).
    const resultado = calculo.calcular(numero1, numero2);
    if (!Number.isFinite(resultado)) throw new Error('O resultado não é real ou está fora do limite numérico.');
    return resultado;
  }
}
