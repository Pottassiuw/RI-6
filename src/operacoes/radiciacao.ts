import Calculo from './calculo.js';

export default class Radiciacao extends Calculo {
  public override calcular(radicando: number, indice: number): number {
    if (!Number.isInteger(indice) || indice === 0) {
      throw new Error('O índice da raiz deve ser um inteiro diferente de zero.');
    }
    if (radicando === 0 && indice < 0) {
      throw new Error('Zero não possui raiz com índice negativo.');
    }
    if (radicando < 0) {
      if (indice % 2 === 0) throw new Error('Raiz de índice par de número negativo não é real.');
      return -((-radicando) ** (1 / indice));
    }
    return radicando ** (1 / indice);
  }
}
