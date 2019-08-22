/**
 * Esta función permite acceder de forma segura a propiedades de un objeto,
 * incluso cuando dichas propiedades no existen.
 * @param {Object} obj Objeto al que se va a acceder
 * @param {*} def Valor por defecto a devolver en caso de no encontrarse la propiedad en el objeto
 * @param {*} path Path de la propiedad a consultar, con distintos niveles de profundidad separados por puntos.
 *                 Este parámetro es opcional. Si no se proporciona, la función devolverá otra función
 *                 que puede ser invocada con el path de la propiedad como argumento.
 * @return - Si se proporciona path y la propiedad existe, se devuelve la propiedad.
 *         - Si se proporciona path y la propiedad no existe, de devuelve el valor de def.
 *         - Si no se proporciona path, se devuelve una función que puede ser invocada con el path de la propiedad como argumento.
 *         - Si no se proporcionan obj o path en formato correcto, devuelve undefined.
 */
export function kata2 (obj, def, path) {
    // Si el parametro obj no es un objeto, la función no puede funcionar correctamente.
    if (!obj || typeof obj !== "object") {
        return;
    }

    if (!path) {
        // si no se proporciona path, devolvemos una funcion para ejecutar con el path como argumento
        let newObj = obj;
        let newDef = def;
        return (newPath) => {
            // La nueva funcion busca en el objeto de la misma manera que kata2, por lo que podemos reusarla
            return kata2(newObj, newDef, newPath);
        }

    } else {
        // Si el parametro path no es un string, la función no puede funcionar correctamente.
        if (typeof path !== "string") {
            return;
        }

        // Si se proporciona path, se devuelve el valor buscado o el valor por defecto
        let keys = path.split(".");
        let length = keys.length;
        let tempObj = obj;

        // recorremos el path nivel por nivel
        for(let i = 0; i < length; i++) {
            let key = keys[i];

            if (tempObj.hasOwnProperty(key)) {
                // Existe una propiedad del objeto a este nivel.
                // En este caso seguiremos buscando en el siguiente nivel,
                // o si es el último nivel saldremos del bucle y devolveremos la propiedad encontrada.
                tempObj = tempObj[key];

            } else {
                // No existe una propiedad del objeto. En este caso devolvemos el valor por defecto.
                return def;
            }
        }
        return tempObj;
    }
}