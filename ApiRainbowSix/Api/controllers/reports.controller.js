const _pg = require("../services/postgres.service");
const mergeSort = require("../services/merge-sort.service");
const createExcel = require("../services/excel.service");
const fs = require("fs");

//Generacion de Documento Excel de Porcentaje KoD
const getReporPorcenjeKoD = async (req, res) => {
  try {
    //Seleccionar la Base de Datos y los dato a recolectar 
    let sql = "SELECT * FROM usuarios where rol_favorito='Roamer'";
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;

    //Ordenamiento de Menor a Mayor de la base de datos por Porcentaje KoD
    rows = mergeSort.mergeSortKoD(rows);

    //Creacion de Columnas para Excel
    let headers = [
      { header: "IdUsuario", key: "idusuario" },
      { header: "Numero Partida", key: "numero_partida" },
      { header: "Rol Favorito", key: "rol_favorito" },
      { header: "Arma Favorita", key: "arma_favorita" },
      { header: "Asesinatos", key: "asesinatos" },
      { header: "Muertes", key: "muertes" },
      { header: "Razon KoD", key: "razon_kod" },
    ];
    //Generar Excel con la Informacion
    let buffer = await createExcel(headers, rows, "Razon KoD");
    //Guardar el Reporte en la Api
    fs.writeFileSync("./Api/temp/reportePorcentajeKoD.xlsx", buffer);
    //Descarga el Reporte en el PC
    return res.download("./Api/temp/reportePorcentajeKoD.xlsx", "reportePorcentajeKoD.xlsx");
  } catch (error) {
    //Generar Alerta de Error
    console.error(error);
    return res.send(error);
  }
};

//Generacion de Documento Excel de Porcentaje Precision
const getReporPorcenPrecision = async (req, res) => {
  try {
    //Seleccionar la Base de Datos y los dato a recolectar 
    let sql = "SELECT * FROM usuarios where arma_favorita='Fusil de Asalto'";
    let response_db = await _pg.execute(sql);
    let rows = response_db.rows;

    //Ordenamiento de Menor a Mayor de la base de datos por Porcentaje Precision
    rows = mergeSort.mergeSortPrecision(rows);

    //Creacion de Columnas para Excel
    let headers = [
      { header: "IdUsuario", key: "idusuario" },
      { header: "Numero Partida", key: "numero_partida" },
      { header: "Rol Favorito", key: "rol_favorito" },
      { header: "Arma Favorita", key: "arma_favorita" },
      { header: "Municion Gastada", key: "municion_gastada" },
      { header: "Municion Acertada", key: "municion_acertada" },
      { header: "Porcentaje Precision", key: "porcentaje_precision" },
    ];
    //Generar Excel con la Informacion
    let buffer = await createExcel(headers, rows, "Precision");
    //Guardar el Reporte en la Api
    fs.writeFileSync("./Api/temp/reportePorcentajePrecision.xlsx", buffer);
    //Descarga el Reporte en el PC
    return res.download("./Api/temp/reportePorcentajePrecision.xlsx", "reportePorcentajePrecision.xlsx");
  } catch (error) {
    //Generar Alerta de Error
    console.error(error);
    return res.send(error);
  }
};

module.exports = { getReporPorcenjeKoD, getReporPorcenPrecision };
