const Reserva = require('../modelsMongoDB/Reserva')

class ReservaController {
  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const quarto = await Reserva.getReservasByHotel(idHotel);

      return res.send(quarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de reservas' })
    }
  }

  async store(req, res, next) {
    const {
      id_cliente, id_tipo_quarto, id_hotel, dataentrada, datasaida
    } = req.body

    try {
      const reserva = await Reserva.createReserva({
        id_cliente, id_tipo_quarto, id_hotel, dataentrada, datasaida
      });

      return res.send(reserva)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar a reserva' })
    }
  }

  async update(req, res, next) {
    const {
      id, id_tipo_quarto, dataentrada, datasaida
    } = req.body

    try {
      const quarto = await Reserva.updateReserva({
        id, id_tipo_quarto, dataentrada, datasaida
      });

      return res.send(quarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar a reserva' })
    }
  }

  async delete(req, res, next) {
    const {
      idReserva
    } = req.params

    try {
      const resp = await Reserva.deleteReserva(idReserva);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar a reserva' })
    }
  }
}

module.exports = new ReservaController()
