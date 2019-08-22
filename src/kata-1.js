/**
 * función que dado un número entero,
 * retorna otro número formado por sus mismos digitos ordenados descendentemente
 * @param {int} number numero entero el cual ordenaremos
 * @return el número entero con los dígitos en orden descendente, o null si el formato del parámetro number es incorrecto.
 */
export function kata1 (number) {
    let sortedNumber = null;

    // sólo ordenar el número si es un número entero.
    if (Number.isInteger(number)) {
        // Transformamos el número entero en un array de dígitos
        sortedNumber = number + '';
        sortedNumber = sortedNumber.split("");

        // Ordenamos el array de dígitos en orden descendente
        sortedNumber.sort( (digit1, digit2) => {
            return digit2 - digit1;
        });

        // transformamos el array ordenado correctamente en un número entero
        sortedNumber = parseInt(sortedNumber.join(""));
    }

    return sortedNumber; 
}
