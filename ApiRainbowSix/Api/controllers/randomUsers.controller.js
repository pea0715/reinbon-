const _pg = require("../services/postgres.service"); 
const porcentaje = require("../services/operacion.service");

//Listas que Contienen los Diferentes Roles y Armas que puede Llevar el Usuario
let Rol = ["Entry Fragger", "Support", "Flex ATK", "Roamer", "Ancla", "Flex DEF", "IGL"]
let Arma = ["Cuchillo", "Pistola", "Escopeta", "Subfusil", "Fusil de Asalto", "Francotirador"]

//ALgoritmo para la Generacion de Numeros Random para algunos datos
function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Algoritmo para generar y guardar datos aleatorios
const saveRandomUsers = async (req, res) => {  
    //Variables que Generan los Datos Aleatorios 
    let idUsuario = RandomInt(10000000, 10000000000);
    let nroPartidas = RandomInt(1, 1000);
    let RolFavorito = Rol[RandomInt(0, 7)];
    let ArmaFavorita = Arma[RandomInt(0, 6)];
    let Asesinatos = RandomInt(300, 800);
    let Muertes = RandomInt(1, 600);
    let Razon_KoD = porcentaje.porcentajeKOD(Asesinatos, Muertes);
    let MunicionGastada = RandomInt(1, 10000);
    let MunicionImpactada = RandomInt(1, MunicionGastada);
    let PorcentajeP = porcentaje.porcentajePrecision(MunicionGastada, MunicionImpactada)

    try {
        //Inserta la Informacion Creada Previamente y la Guarda en la Base de Datos
        let userR = req.body;
        let sql = `INSERT INTO public.usuarios
        (idusuario, numero_partida, rol_favorito, arma_favorita, asesinatos, muertes,
            razon_kod, municion_gastada, municion_acertada, porcentaje_precision)
        VALUES('${idUsuario}', '${nroPartidas}', '${RolFavorito}', 
        '${ArmaFavorita}', ${Asesinatos}, ${Muertes}, 
        ${Razon_KoD}, ${MunicionGastada}, ${MunicionImpactada}, 
        ${PorcentajeP});`
        
        //Envia Informacion a la Base de datos y esperar Respuesta
        await _pg.execute(sql);
        
        //Envia una Alerta
        return res.send({
            ok: true,
            message: "Usuario Aleatorio Creado",
            info: userR,
        });
    } catch (error) {
        //Envia una Alerta
        return res.send({
            ok: false,
            message: "El Usuario ya se Encuentra Registrado",
            info: error,
    });
    }     
}

module.exports = { saveRandomUsers };