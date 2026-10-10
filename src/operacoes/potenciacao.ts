import Calculo from './calculo.js';

export default class Potenciacao extends Calculo {
  public override calcular(base: number, expoente: number): number {
    return base ** expoente;
  }
}
