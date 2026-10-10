import Calculo from './calculo.js';

export default class Divisao extends Calculo {
  public override calcular(numero1: number, numero2: number): number {
    if (numero2 === 0) throw new Error('Não é possível dividir por zero.');
    return numero1 / numero2;
  }
}
