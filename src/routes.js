const express = require('express')

const controllers = require('./controllers')
const authMiddleware = require('./middlewares/auth');
const routes = express.Router()

routes.post('/login', controllers.SessionController.login)

routes.use(authMiddleware)
routes.post('/register', controllers.EmpregadoController.store)

routes.get('/hotel', controllers.HotelController.index)
routes.get('/hotel/:idHotel', controllers.HotelController.show)
routes.post('/hotel', controllers.HotelController.store)
routes.patch('/hotel', controllers.HotelController.update)
routes.delete('/hotel/:idHotel', controllers.HotelController.delete)

routes.get('/clientes', controllers.HotelController.index)
routes.get('/clientes/:idClientes', controllers.HotelController.show)
routes.post('/clientes', controllers.HotelController.store)
routes.patch('/clientes', controllers.HotelController.update)
routes.delete('/clientes/:idClientes', controllers.HotelController.delete)

module.exports = routes
