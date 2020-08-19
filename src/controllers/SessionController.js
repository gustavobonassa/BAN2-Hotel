const User = require('../models/User')
const authConfig = require('../config/auth')
const jwt = require('jsonwebtoken')

class SessionController {
  async login (req, res) {
    const { login, senha } = req.body

    const user = await User.getUserByLogin({
      login
    })

    if (!user || user.error) {
      return res.status(400).json({
        error: "Usuário não encontrado"
      })
    }

    const logged = await User.getAutentication({ login, senha });
    if (!logged) {
      return res.status(400).json({
        error: 'Falha no login'
      })
    }

    const token = jwt.sign({
      id: user.id
    }, authConfig.secret, {
      expiresIn: authConfig.ttl
    });

    user.senha = undefined;
    return res.json({
      user,
      token
    })
  }
}

module.exports = new SessionController()
