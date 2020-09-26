const Hotel = require('../modelsMongoDB/Hotel')

class HotelController {
  async index(req, res, next) {
    try {
      const hotels = await Hotel.getAllHotels();

      return res.send(hotels)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de Hoteis' })
    }
  }

  async show(req, res, next) {
    try {
      const {
        idHotel
      } = req.params
      const hotel = await Hotel.getHotelById(idHotel);

      return res.send(hotel)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao pegar lista de Hoteis' })
    }
  }

  async store(req, res, next) {
    const {
      rua, bairro, cidade, estado, numero,
      nome, telefone,
    } = req.body

    try {
      const hotel = await Hotel.createHotel({
        rua, bairro, cidade, estado, numero,
        nome, telefone,
      });

      return res.send(hotel)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao cadastrar o Hotel' })
    }
  }

  async update(req, res, next) {
    const {
      rua, bairro, cidade, estado, numero,
      id, nome, telefone,
    } = req.body

    try {
      const hotel = await Hotel.updateHotel({
        rua, bairro, cidade, estado, numero,
        id, nome, telefone,
      });

      return res.send(hotel)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao atualizar o Hotel' })
    }
  }

  async delete(req, res, next) {
    const {
      idHotel
    } = req.params

    try {
      const resp = await Hotel.deleteHotel(idHotel);

      return res.send(resp)
    } catch (err) {
      return res.status(400).send({ error: 'Falha ao deletar o Hotel' })
    }
  }
}

module.exports = new HotelController()
