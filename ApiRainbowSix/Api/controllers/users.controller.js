const _pg = require("../services/postgres.service");
const porcentaje = require("../services/operacion.service");

//Obtener y Mostrar Todos los Usuarios de la Base de Datos
const getUsers = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Recolectar los Usuarios
        let sql = "SELECT * FROM usuarios";

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let rows = response_db.rows;

        //Realizar diferentes Operaciones Llamando otras Funciones
        rows.forEach((usuario) => {
            usuario.razon_kod = porcentaje.porcentajeKOD(usuario.asesinatos, usuario.muertes);
            usuario.porcentaje_precision = porcentaje.porcentajePrecision(usuario.municion_gastada, usuario.municion_acertada)
        });
        //Envia una Alerta
        return res.send(rows);
    } catch (error) {
        //Envia una Alerta
        return res.send(error);
    }
}

//Guardar Nuevos Usuarios en la Base de Datos
const saveUsers = async (req, res) => {
    try {
        //Guardar la Informacion y Conectar con la Base de Datos
        let user = req.body;
        let sql = `INSERT INTO public.usuarios
        (idusuario, numero_partida, rol_favorito, arma_favorita, asesinatos, muertes,
            razon_kod, municion_gastada, municion_acertada, porcentaje_precision)
        VALUES('${user.idusuario}', '${user.numero_partida}', '${user.rol_favorito}', 
        '${user.arma_favorita}', ${user.asesinatos}, ${user.muertes}, 
        ${porcentaje.porcentajeKOD(user.asesinatos, user.muertes)}, ${user.municion_gastada}, ${user.municion_acertada}, 
        ${porcentaje.porcentajePrecision(user.municion_gastada, user.municion_acertada)});`
      
        //Envia Informacion a la Base de datos y esperar Respuesta
        await _pg.execute(sql);

        //Envia una Alerta
        return res.send({
            ok: true,
            message: "Usuario creado",
            info: user,
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

//Eliminar Usuario de la Base de Datos
const deleteUsers = async (req, res) => {
    try {
        //Conectar con la Base de Datos y Mediante la ID eliminar el Usuario
        let idusuario = req.params.idusuario;
        let sql = `DELETE FROM public.usuarios WHERE idusuario='${idusuario}';`;

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let row_count = response_db.rowCount;

        //Envia una Alerta
        return res.send({
            ok: row_count == 1 ? true : false,
            message: "Usuario Eliminado",
            info: idusuario,
        });
       } catch (error) {
        //Envia una Alerta
        return res.send({
          ok: false,
          message: "El Usuario No se Encuentra Registrado",
          info: error,
        });
    }  
}

//Actualizar la Informacion del Usuario(Rol Favorito y Arma Favorita)
const updateUsers = async (req, res) => {
    try { 
        //Conectar con la Base de Datos y Recoger la Informacion para Actualizar
        let idusuario = req.params.idusuario;
        let user = req.body;
        let sql = `UPDATE public.usuarios
        SET rol_favorito='${user.rol_favorito}', arma_favorita='${user.arma_favorita}'
        WHERE idusuario='${idusuario}';`;

        //Envia Informacion a la Base de datos y esperar Respuesta
        let response_db = await _pg.execute(sql);
        let row_count = response_db.rowCount;

      //Envia una Alerta
      return res.send({
        ok: row_count == 1 ? true : false,
        message: "Usuario Actualizado",
        info: idusuario,
      });
    } catch (error) {
        //Envia una Alerta
        return res.send({
            ok: false,
            message: "El Usuario No se Encuentra Registrado",
            info: error,
        });
    }
};


module.exports = { getUsers, saveUsers, deleteUsers, updateUsers };
