const TipoQuarto = require('../modelsMongoDB/TipoQuarto')

class TipoQuartoController {
  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const tipoQuarto = await TipoQuarto.getTipoQuartoByHotel(idHotel);

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
      const tipoQuarto = await TipoQuarto.createTipoQuarto({
        tipo, preco, cama_extra, id_hotel,
      });

      return res.send(tipoQuarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o tipo do quarto' })
    }
  }

  async update(req, res, next) {
    const {
      id, tipo, preco, cama_extra,
    } = req.body

    try {
      const tipoQuarto = await TipoQuarto.updateTipoQuarto({
        id, tipo, preco, cama_extra,
      });

      return res.send(tipoQuarto)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o tipo do quarto' })
    }
  }

  async delete(req, res, next) {
    const {
      idTipoQuarto
    } = req.params

    try {
      const resp = await TipoQuarto.deleteTipoQuarto(idTipoQuarto);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o tipo do quarto' })
    }
  }
}

module.exports = new TipoQuartoController()
