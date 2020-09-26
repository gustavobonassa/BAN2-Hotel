const Estadia = require('../modelsMongoDB/Estadia')

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
      id_quarto, dataentrada, datasaida, id_reserva
    } = req.body

    try {
      const reserva = await Estadia.createEstadia({
        id_quarto, dataentrada, datasaida, id_reserva
      });

      return res.send(reserva)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar a estadia' })
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
      idEstadia
    } = req.params
    try {
      const resp = await Estadia.deleteEstadia(idEstadia);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar a estadia' })
    }
  }
}

module.exports = new EstadiaController()
