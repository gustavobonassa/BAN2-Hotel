const express = require('express')

const controllers = require('./controllers')
const authMiddleware = require('./middlewares/auth');
const routes = express.Router()

routes.post('/login', controllers.SessionController.login)

routes.use(authMiddleware)
routes.post('/register', controllers.EmpregadoController.store)
// Empregado
routes.get('/empregado', controllers.EmpregadoController.index)
routes.post('/empregado', controllers.EmpregadoController.store)
// Hotel
routes.get('/hotel', controllers.HotelController.index)
routes.get('/hotel/:idHotel', controllers.HotelController.show)
routes.post('/hotel', controllers.HotelController.store)
routes.patch('/hotel', controllers.HotelController.update)
routes.delete('/hotel/:idHotel', controllers.HotelController.delete)
// Cliente
routes.get('/cliente', controllers.ClienteController.index)
routes.get('/cliente/:idCliente', controllers.ClienteController.show)
routes.post('/cliente', controllers.ClienteController.store)
routes.patch('/cliente', controllers.ClienteController.update)
routes.delete('/cliente/:idCliente', controllers.ClienteController.delete)
// TipoQuarto
routes.get('/tipoquarto/:idHotel', controllers.TipoQuartoController.show)
routes.post('/tipoquarto', controllers.TipoQuartoController.store)
routes.patch('/tipoquarto', controllers.TipoQuartoController.update)
routes.delete('/tipoquarto/:idTipoQuarto', controllers.TipoQuartoController.delete)
// Quarto
routes.get('/quarto/:idHotel', controllers.QuartoController.show)
routes.post('/quarto', controllers.QuartoController.store)
routes.patch('/quarto', controllers.QuartoController.update)
routes.delete('/quarto/:idQuarto', controllers.QuartoController.delete)
// Servico
routes.get('/servico/:idHotel', controllers.ServicoController.show)
routes.post('/servico', controllers.ServicoController.store)
routes.patch('/servico', controllers.ServicoController.update)
routes.delete('/servico/:idServico', controllers.ServicoController.delete)
// Reserva
routes.get('/reserva/:idHotel', controllers.ReservaController.show)
routes.post('/reserva', controllers.ReservaController.store)
routes.patch('/reserva', controllers.ReservaController.update)
routes.delete('/reserva/:idReserva', controllers.ReservaController.delete)
// Estadia
routes.get('/estadia/:idHotel', controllers.EstadiaController.show)
routes.post('/estadia', controllers.EstadiaController.store)
routes.patch('/estadia', controllers.EstadiaController.update)
routes.delete('/estadia/:idEstadia', controllers.EstadiaController.delete)
// Extra
routes.get('/extra/:idEstadia', controllers.ExtraController.show)
routes.post('/extra', controllers.ExtraController.store)
routes.patch('/extra', controllers.ExtraController.update)
routes.delete('/extra/:idExtra', controllers.ExtraController.delete)
// Limpeza
routes.get('/extra/:idHotel', controllers.LimpezaController.show)
routes.post('/extra', controllers.LimpezaController.store)
routes.patch('/extra', controllers.LimpezaController.update)
routes.delete('/extra/:idLimpeza', controllers.LimpezaController.delete)
module.exports = routes
