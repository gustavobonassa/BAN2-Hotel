const Empregado = require('../models/Empregado')
const bcrypt = require('bcryptjs')

class EmpregadoController {
  async index(req, res, next) {
    try {
      const empregados = await Empregado.getAllEmpregado();

      return res.send(empregados)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de Clientes' })
    }
  }

  async store (req, res, next) {
    const { nome, login, senha, rg } = req.body

    try {
      const exists = await Empregado.userExists({ login, rg });

      if (!exists) {
        const hashPass = await bcrypt.hash(senha, 8);
        const user = await Empregado.createUser({
          nome,
          login,
          senha: hashPass,
          rg
        });

        user.senha = undefined;
        return res.send(user)
      } else {
        return res.send({ error: 'Usuário já existe' })
      }
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' })
    }
  }
}

module.exports = new EmpregadoController()
