import Calculo from './calculo.js';

export default class Subtracao extends Calculo {
  public override calcular(numero1: number, numero2: number): number {
    return numero1 - numero2;
  }
}
