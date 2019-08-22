/**
 * Esta función halla todos los números entre m y n cuya suma de sus divisores al cuadrado formen un cuadrado.
 * 
 * @param {int} n Primer número. Cumple que n >= 1 y n <= m 
 * @param {int} m Segundo número. Cumple que m >= 1 y m >= n
 * @return - Si los parámetros son correctos, devuelve un array con los números que cumplen la condición y su suma al cuadrado
 *         - Si los parámetros no son correctos, devuelve null 
 */
export function kata3 (n, m) {
    const nHasCorrectFormat = Number.isInteger(n) && (n >= 1) && (n <= m);
    const mHasCorrectFormat = Number.isInteger(m) && (m >= 1) && (m >= n);
    if (nHasCorrectFormat && mHasCorrectFormat) {
        // Los parámetros tienen formato correcto.
        // Vamos a comprobar uno por uno si sus divisores al cuadrado forman un cuadrado.
        let result = [];

        for (let i = n; i<=m; i++) {
            // Hallamos la suma de los divisores al cuadrado (en una función más abajo)
            let sum = getSquareDivisorsSum(i);

            // Comprobamos si la suma es un cuadrado
            if ((Math.sqrt(sum) % 1) === 0) {
                // Añadimos un par de números a nuestro array
                // El primero es el número
                // el segundo es la suma de sus divisores al cuadrado
                result.push([i, sum]);
            }
        }

        return result;

    } else {
        // Los parámetros no tienen formato correcto
        return null;
    }
}

/**
 * Suma todos los divisores al cuadrado de un número.
 * Por ejemplo, para el número 10, sus divisores son 10, 5, 2 y 1.
 * La suma de sus divisores al cuadrado es: 10*10 + 5*5 + 2*2 + 1 = 130
 * 
 * @param {int} number número del cual sacaremos los divisores
 * @return La suma de los divisores al cuadrado del número dado
 */
function getSquareDivisorsSum(number) {
    // Todo número tiene como divisores a él mismo y a 1. Por tanto los incluimos en la suma.
    // Ojo, si el número es 1 no tenemos que sumarlo dos veces!!
    let sum = number * number + (number === 1 ? 0 : 1);

    // Empezamos a buscar divisores de 2 en adelante, encontrando pares de divisores (i, number/i)
    // De esta manera, cuando sobrepasemos la raíz cuadrada del número,
    // no hará falta seguir buscando más divisores, porque los habremos encontrado ya en los pares.
    for (let i = 2; i < number; i++) {
        if (i > Math.sqrt(number)) {
            // Hemos sobrepasado la raíz cuadrada del número, por lo tanto no hace falta iterar más
            break;
        }

        if (number % i === 0) {
            // i es divisor de nuestro número, por lo que lo incluimos en la suma
            sum = sum + (i * i);

            // Como sabemos que i es divisor de number, también lo será number/i
            let anotherDivisor = number / i;
            if (anotherDivisor === i) {
                // En este caso i es la raíz cuadrada del número,
                // por lo que no hace falta meterlo en la suma (estaría repetido).
                // Tampoco hace falta iterar más a partir de aquí.
                break;
            }
            sum = sum + anotherDivisor * anotherDivisor;
        }
    }

    return sum;
}
