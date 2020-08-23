const Estadia = require('../models/Estadia')

class EstadiaController {
  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const estadias = await Estadia.getEstadiasByHotel(idHotel);

      return res.send(estadias)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de estadias' })
    }
  }

  async store(req, res, next) {
    const {
      id_cliente, id_tipo_estadia, id_hotel, dataentrada, datasaida
    } = req.body

    try {
      const reserva = await Estadia.createEstadia({
        id_cliente, id_tipo_estadia, id_hotel, dataentrada, datasaida
      });

      return res.send(reserva)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar a reserva' })
    }
  }

  async update(req, res, next) {
    const {
      id, id_tipo_estadia, dataentrada, datasaida
    } = req.body

    try {
      const estadia = await Estadia.updateEstadia({
        id, id_tipo_estadia, dataentrada, datasaida
      });

      return res.send(estadia)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar a reserva' })
    }
  }

  async delete(req, res, next) {
    const {
      idHotel
    } = req.params

    try {
      const resp = await Estadia.deleteEstadia(idHotel);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar a reserva' })
    }
  }
}

module.exports = new EstadiaController()
