const User = require('../models/User')
const bcrypt = require('bcryptjs')

class UserController {

  async store (req, res, next) {
    const { nome, login, senha, rg } = req.body

    try {
      const exists = await User.userExists({ login, rg });

      if (!exists) {
        const hashPass = await bcrypt.hash(senha, 8);
        const user = await User.createUser({
          nome,
          login,
          senha: hashPass,
          rg
        });

        return res.send(user)
      } else {
        return res.send({ error: 'Usuário já existe' })
      }
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  }
}

module.exports = new UserController()
