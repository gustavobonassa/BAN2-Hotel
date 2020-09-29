const client = require('../config/mongodb');
const { ObjectId } = require("mongodb");

module.exports = {
  async getAllHotels() {
    try {
      const ret = await client.db("ban2hotel").collection("hotel").find().toArray();

      return ret.map(e => {
        return {
          ...e,
          id: e._id,
        }
      });
    } catch (error) {
      return { error: "Falha ao listar hoteis", message: error }
    }
  },

  async getHotelById(idHotel) {
    try {
      const clientes = await client.db("ban2hotel").collection("cliente").find({}).toArray();

      const ret = await client.db("ban2hotel").collection("hotel").findOne({ _id: ObjectId(idHotel) });

      const tipoquartos = await client.db("ban2hotel").collection("tipoquarto").find({ id_hotel: ObjectId(idHotel), ativo: true }).toArray();

      const quartos = await client.db("ban2hotel").collection("quarto").find({ id_hotel: ObjectId(idHotel), ativo: true }).toArray();

      const newQuarto = [];
      quartos.map((q) => {
        const ntq = tipoquartos.find((tq) => tq._id == q.id_tipo_quarto);
        newQuarto.push({
          ...q,
          preco: ntq.preco,
          tipo: ntq.tipo,
        })
      })

      const reservas = await client.db("ban2hotel").collection("reserva").find({ id_hotel: ObjectId(idHotel), ativo: true }).toArray();

      const estadias = await client.db("ban2hotel").collection("estadia").find({ id_hotel: ObjectId(idHotel), ativo: true }).toArray();

      const newReservas = [];
      reservas.map((q) => {
        const ntq = clientes.find((cli) => cli._id == q.id_cliente);
        newReservas.push({
          ...q,
          nome: ntq.nome,
        })
      });

      ret.id = ret._id;
      delete ret._id;
      return {
        ...ret,
        quartos: newQuarto,
        tipo_quarto: tipoquartos,
        reservas: newReservas,
        estadias: estadias,
      };
    } catch (error) {
      return { error: "Falha ao pegar o hotel", message: error }
    }
  },

  async createHotel(hotelInfo) {
    try {
      const res = await client.db("ban2hotel").collection("hotel").insertOne({...hotelInfo, ativo: true});
      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao cadastrar o hotel", message: error }
    }
  },

  async updateHotel(hotelInfo) {
    try {
      var newvalues = { $set: hotelInfo };
      var myquery = { _id: ObjectId(hotelInfo.id) };
      const res = await client.db("ban2hotel").collection("hotel").findOneAndUpdate(myquery, newvalues);

      return res
    } catch (error) {
      return { error: "Falha ao atualizar o hotel", message: error }
    }
  },

  async deleteHotel(idHotel) {
    try {
      var newvalues = { $set: { ativo: false } };
      var myquery = { _id: ObjectId(idHotel) };
      await client.db("ban2hotel").collection("cliente").findOneAndUpdate(myquery, newvalues);

      return { success: true, message: "Hotel deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao atualizar o hotel", message: error }
    }
  }
}
