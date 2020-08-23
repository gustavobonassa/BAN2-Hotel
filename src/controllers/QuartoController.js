const Quarto = require('../models/Quarto')

class QuartoController {
  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const quarto = await Quarto.getQuartosByHotel(idHotel);

      return res.send(quarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de quartos' })
    }
  }

  async store(req, res, next) {
    const {
      id_tipo_quarto, andar, numero, id_hotel
    } = req.body

    try {
      const quarto = await Quarto.createQuarto({
        id_tipo_quarto, andar, numero, id_hotel
      });

      return res.send(quarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o quarto' })
    }
  }

  async update(req, res, next) {
    const {
      id, id_tipo_quarto, andar, numero,
    } = req.body

    try {
      const quarto = await Quarto.updateQuarto({
        id, id_tipo_quarto, andar, numero,
      });

      return res.send(quarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o quarto' })
    }
  }

  async delete(req, res, next) {
    const {
      idQuarto
    } = req.params

    try {
      const resp = await Quarto.deleteQuarto(idQuarto);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o tipo do quarto' })
    }
  }
}

module.exports = new QuartoController()
