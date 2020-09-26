const client = require('../config/mongodb');

module.exports = {
  async getReservasByHotel(idHotel) {
    try {
      // const ret = await client.query('SELECT * FROM reserva JOIN cliente ON reserva.id_cliente = cliente.id JOIN tipoQuarto ON reserva.id_tipo_quarto = tipoQuarto.id WHERE reserva.ativo = true AND id_hotel = $1', [idHotel]);

      const ret = await client.db("ban2hotel").collection("reserva").find({ id_hotel: ObjectId(idHotel) }).toArray();

      return ret.map(e => {
        return {
          ...e,
          id: e._id,
        }
      });
    } catch (error) {
      return { error: "Falha ao listar as reservas", message: error }
    }
  },

  async createReserva(reservaInfo) {
    try {
      const res = await client.db("ban2hotel").collection("reserva").insertOne({...reservaInfo, ativo: true});

      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao cadastrar a reserva", message: error }
    }
  },

  async updateReserva(reservaInfo) {
    try {
      var newvalues = { $set: reservaInfo };
      var myquery = { _id: ObjectId(reservaInfo.id) };
      const res = await client.db("ban2hotel").collection("tipoquarto").findOneAndUpdate(myquery, newvalues);

      return res
    } catch (error) {
      return { error: "Falha ao atualizar a reserva", message: error }
    }
  },

  async deleteReserva(idReserva) {
    try {
      var newvalues = { $set: { ativo: false } };
      var myquery = { _id: ObjectId(idReserva) };
      await client.db("ban2hotel").collection("tipoquarto").findOneAndUpdate(myquery, newvalues);
      return { success: true, message: "Reserva deletada com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar a reserva", message: error }
    }
  }
}
