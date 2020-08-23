const Limpeza = require('../models/Limpeza')

class LimpezaController {
  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const extra = await Limpeza.getLimpezaByHotel(idHotel);

      return res.send(extra)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de limpeza' })
    }
  }

  async store(req, res, next) {
    const {
      data, id_quarto, id_empregado
    } = req.body

    try {
      const limpeza = await Limpeza.createLimpeza({
        data, id_quarto, id_empregado
      });

      return res.send(limpeza)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar a limpeza' })
    }
  }

  async update(req, res, next) {
    const {
      id, data, id_quarto, id_empregado
    } = req.body

    try {
      const limpeza = await Limpeza.updateLimpeza({
        id, data, id_quarto, id_empregado
      });

      return res.send(limpeza)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar a limpeza' })
    }
  }

  async delete(req, res, next) {
    const {
      idLimpeza
    } = req.params

    try {
      const resp = await Limpeza.deleteLimpeza(idLimpeza);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar a limpeza' })
    }
  }
}

module.exports = new LimpezaController()
