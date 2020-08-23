const TipoQuarto = require('../models/TipoQuarto')

class ClientController {
  async show(req, res, next) {
    try {
      const {
        idCliente
      } = req.params
      const tipoQuarto = await TipoQuarto.getClientById(idCliente);

      return res.send(tipoQuarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de quartos' })
    }
  }

  async store(req, res, next) {
    const {
      tipo, preco, cama_extra, id_hotel,
    } = req.body

    try {
      const tipoQuarto = await TipoQuarto.createClient({
        tipo, preco, cama_extra, id_hotel,
      });

      return res.send(tipoQuarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o tipo do quarto' })
    }
  }

  async update(req, res, next) {
    const {
      tipo, preco, cama_extra, id_hotel,
    } = req.body

    try {
      const tipoQuarto = await TipoQuarto.updateClient({
        tipo, preco, cama_extra, id_hotel,
      });

      return res.send(tipoQuarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o tipoQuarto' })
    }
  }

  async delete(req, res, next) {
    const {
      idCliente
    } = req.params

    try {
      const resp = await TipoQuarto.deleteClient(idCliente);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o tipoQuarto' })
    }
  }
}

module.exports = new ClientController()
