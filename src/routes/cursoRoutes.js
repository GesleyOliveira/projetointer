const express = require('express')
const cursoRoutes = express.Router()
const cursoController = require('../controller/cursoController')
const auth = require('../middleware/auth')

cursoRoutes.post('/curso', auth.autenticar, cursoController.createCurso)
cursoRoutes.get('/curso', auth.autenticar, cursoController.getCurso)
cursoRoutes.get('/curso/:id', auth.autenticar, cursoController.getCursoId)
cursoRoutes.delete('/curso/:id', auth.autenticar, cursoController.delCurso)
cursoRoutes.put('/curso/:id', auth.autenticar, cursoController.attCurso)

module.exports = cursoRoutes