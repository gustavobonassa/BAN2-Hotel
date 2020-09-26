const Cliente = require('../modelsMongoDB/Cliente')

class ClienteController {
  async index(req, res, next) {
    try {
      const clientes = await Cliente.getAllClients();

      return res.send(clientes)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de Clientes' })
    }
  }

  async show(req, res, next) {
    try {
      const {
        idCliente
      } = req.params
      const cliente = await Cliente.getClientById(idCliente);

      return res.send(cliente)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de clientes' })
    }
  }

  async store(req, res, next) {
    const {
      rua, bairro, cidade, estado, numero,
      nome, telefone, rg,
    } = req.body

    try {
      const cliente = await Cliente.createClient({
        rua, bairro, cidade, estado, numero,
        nome, telefone, rg,
      });

      return res.send(cliente)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o Cliente' })
    }
  }

  async update(req, res, next) {
    const {
      rua, bairro, cidade, estado, numero,
      id, nome, telefone, rg,
    } = req.body

    try {
      const cliente = await Cliente.updateClient({
        rua, bairro, cidade, estado, numero,
        id, nome, telefone, rg,
      });

      return res.send(cliente)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o cliente' })
    }
  }

  async delete(req, res, next) {
    const {
      idCliente
    } = req.params

    try {
      const resp = await Cliente.deleteClient(idCliente);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o cliente' })
    }
  }
}

module.exports = new ClienteController()
