const express = require('express')

const controllers = require('./controllers')
const authMiddleware = require('./middlewares/auth');
const routes = express.Router()

routes.post('/login', controllers.SessionController.login)

routes.use(authMiddleware)
routes.post('/register', controllers.UserController.store)

module.exports = routes
