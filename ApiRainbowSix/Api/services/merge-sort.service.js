// Algoritmo de ordenamiento de Merge-Sort


/**
 * Ordenar los vectores y unirlos en una sola lista
 * @param {*} arrayIzq
 * @param {*} arrayDer
 */

// Algoritmo de ordenamiento de Merge-Sort para el Porcentaje KoD
const mergeKoD = (arrayIzq, arrayDer) => {
  let arrayOrdenado = [];
  while (arrayIzq.length && arrayDer.length) {
    if (arrayIzq[0].razon_kod < arrayDer[0].razon_kod) {
      arrayOrdenado.push(arrayIzq.shift());
    } else {
      arrayOrdenado.push(arrayDer.shift());
    }
  }
  return [...arrayOrdenado, ...arrayIzq, ...arrayDer];
};

/**
 * @param {*} array Input
 */
 const mergeSortKoD = (array) => {
  //Comprobar la longitud del array
  if (array.length <= 1){
    return array;
  } else {
    let mitad = Math.floor(array.length / 2);
    // Dividir lista en sublistas
    let arrayIzq = mergeSortKoD(array.slice(0, mitad));
    let arrayDer = mergeSortKoD(array.slice(mitad));
  
    // Ordenar y unir
    let arrayOrdenado = mergeKoD(arrayIzq, arrayDer);
    return arrayOrdenado;
  }
};

// Algoritmo de ordenamiento de Merge-Sort para el Porcentaje Precision
const mergePrecision = (arrayIzq, arrayDer) => {
  let arrayOrdenado = [];
  while (arrayIzq.length && arrayDer.length) {
    if (arrayIzq[0].porcentaje_precision < arrayDer[0].porcentaje_precision) {
      arrayOrdenado.push(arrayIzq.shift());
    } else {
      arrayOrdenado.push(arrayDer.shift());
    }
  }
  return [...arrayOrdenado, ...arrayIzq, ...arrayDer];
};

/**
 * @param {*} array Input
 */
 const mergeSortPrecision = (array) => {
  //Comprobar la longitud del array
  if (array.length <= 1) {
    return array;
  } else{
    let mitad = Math.floor(array.length / 2);

    // Dividir lista en sublistas
    let arrayIzq = mergeSortPrecision(array.slice(0, mitad));
    let arrayDer = mergeSortPrecision(array.slice(mitad));

    // Ordenar y unir
    let arrayOrdenado = mergePrecision(arrayIzq, arrayDer);
    return arrayOrdenado;
  } 
};

module.exports = { mergeSortKoD, mergeSortPrecision };
