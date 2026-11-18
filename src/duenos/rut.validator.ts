export function normalizarRut(rut: string): string {
  const limpio = rut
    .replace(/\./g, '')
    .replace(/-/g, '')
    .trim()
    .toUpperCase();

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  return `${cuerpo}-${dv}`;
}

export function validarRut(rut: string): boolean {
  const limpio = rut
    .replace(/\./g, '')
    .replace(/-/g, '')
    .trim()
    .toUpperCase();

  if (!/^\d{7,8}[0-9K]$/.test(limpio)) {
    return false;
  }

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);
  let suma = 0;
  let factor = 2;

  for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }

  const resto = suma % 11;
  const resultado = 11 - resto;

  let dvCalculado: string;

  if (resultado === 11) {
    dvCalculado = '0';
  } else if (resultado === 10) {
    dvCalculado = 'K';
  } else {
    dvCalculado = resultado.toString();
  }

  return dvCalculado === dvIngresado;
}