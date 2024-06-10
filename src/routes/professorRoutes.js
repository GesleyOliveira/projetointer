const express = require('express')
const professorRoutes = express.Router()
const professorController = require('../controller/professorController')
const auth = require('../middleware/auth')

professorRoutes.post('/professor', auth.autenticar, professorController.createProf)
professorRoutes.post('/professor/curso/:id', auth.autenticar, professorController.addCurso)
professorRoutes.get('/professor', professorController.getProf)
professorRoutes.get('/professor/:id', auth.autenticar, professorController.getProfId)
professorRoutes.get('/professor/editar/:id', professorController.getProfIdLista)
professorRoutes.delete('/professor/:id', auth.autenticar, professorController.delProf)
professorRoutes.delete('/professor/curso/:id', auth.autenticar, professorController.delCurso)
professorRoutes.put('/professor/editar', auth.autenticar, professorController.attProf)


module.exports = professorRoutes
