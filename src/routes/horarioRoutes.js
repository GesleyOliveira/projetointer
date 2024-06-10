const express = require('express')
const horarioRoutes = express.Router()
const horarioController = require('../controller/horarioController')
const auth = require('../middleware/auth')

horarioRoutes.post('/horario', auth.autenticar, horarioController.createhorario)
horarioRoutes.get('/horario', auth.autenticar, horarioController.gethorario)
horarioRoutes.get('/horario/:id', auth.autenticar, horarioController.gethorarioId)
horarioRoutes.delete('/horario/:id', auth.autenticar, horarioController.delhorario)


module.exports = horarioRoutes