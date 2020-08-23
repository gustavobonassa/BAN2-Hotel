const Extra = require('../models/Extra')

class ExtraController {
  async show(req, res, next) {
    try {
      const {
        idEstadia
      } = req.params
      const extra = await Extra.getExtraByEstadia(idEstadia);

      return res.send(extra)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de serviços da estadia' })
    }
  }

  async store(req, res, next) {
    const {
      id_estadia, id_servico, data, hora,
    } = req.body

    try {
      const reserva = await Extra.createExtra({
        id_estadia, id_servico, data, hora,
      });

      return res.send(reserva)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o serviço' })
    }
  }

  async update(req, res, next) {
    const {
      id, id_servico, data, hora,
    } = req.body

    try {
      const extra = await Extra.updateExtra({
        id, id_servico, data, hora,
      });

      return res.send(extra)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o serviço da estadia' })
    }
  }

  async delete(req, res, next) {
    const {
      idExtra
    } = req.params

    try {
      const resp = await Extra.deleteExtra(idExtra);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o serviço da estadia' })
    }
  }
}

module.exports = new ExtraController()
