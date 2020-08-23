const Servico = require('../models/Servico')

class ServicoController {
  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const servico = await Servico.getServicosByHotel(idHotel);

      return res.send(servico)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de serviços' })
    }
  }

  async store(req, res, next) {
    const {
      tipo, preco
    } = req.body

    try {
      const servico = await Servico.createServico({
        tipo, preco
      });

      return res.send(servico)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o serviço' })
    }
  }

  async update(req, res, next) {
    const {
      id, tipo, preco
    } = req.body

    try {
      const servico = await Servico.updateServico({
        id, tipo, preco
      });

      return res.send(servico)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o serviço' })
    }
  }

  async delete(req, res, next) {
    const {
      idServico
    } = req.params

    try {
      const resp = await Servico.deleteServico(idServico);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o serviço' })
    }
  }
}

module.exports = new ServicoController()
