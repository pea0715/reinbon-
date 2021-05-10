const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller")
const randomController = require("../controllers/randomUsers.controller")
const ReportsController = require("../controllers/reports.controller");

//Rutas para Generar los reportes
router.get("/reportPorcenKoD", ReportsController.getReporPorcenjeKoD);
router.get("/reportPorcenPrecision", ReportsController.getReporPorcenPrecision);

//Ruta para la creacion de Usuarios
router.post("/usuarios", userController.saveUsers);

//Ruta para la Creacion de Usuarios Aleatorios
router.post("/usuariosRandom", randomController.saveRandomUsers);

//Ruta para ver Todos los Usuarios
router.get("/usuarios", userController.getUsers);

//Ruta para eliminar un Usuario
router.delete("/usuarios/:idusuario", userController.deleteUsers);

//Ruta para Modificar un Usuario
router.put("/usuarios/:idusuario", userController.updateUsers);

module.exports = router

