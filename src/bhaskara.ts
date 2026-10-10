export interface ResultadoBhaskara {
  delta: number;
  raizes: number[];
}

export default class Bhaskara {
  public calcular(a: number, b: number, c: number): ResultadoBhaskara {
    if (![a, b, c].every(Number.isFinite)) throw new Error('Os coeficientes devem ser finitos.');
    if (a === 0) throw new Error('O coeficiente a deve ser diferente de zero.');
    const delta = b * b - 4 * a * c;
    if (!Number.isFinite(delta)) throw new Error('Delta fora do limite numérico.');
    if (delta < 0) return { delta, raizes: [] };
    const raizes = delta === 0
      ? [-b / (2 * a)]
      : [(-b + Math.sqrt(delta)) / (2 * a), (-b - Math.sqrt(delta)) / (2 * a)];
    if (!raizes.every(Number.isFinite)) throw new Error('Raízes fora do limite numérico.');
    return { delta, raizes };
  }
}
