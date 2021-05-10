//Algoritmo para el Porcentaje Asesitatos sobre muertes del Usuario
const porcentajeKOD = (asesinatos, muerte) => {
      return (asesinatos/muerte) * 100;
};

//Algoritmo para Encontrar el Porcentaje de Precision del Usuario
const porcentajePrecision = (Disparedos, Acertados) => {
  return (Acertados/Disparedos) * 100;
};

module.exports = {
  porcentajeKOD,
  porcentajePrecision
};