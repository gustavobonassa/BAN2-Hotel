const { ObjectId } = require('mongodb');
const client = require('../config/mongodb');

module.exports = {
  async getTipoQuartoByHotel(idHotel) {
    try {
      const ret = await client.db("ban2hotel").collection("tipoquarto").find({ id_hotel: ObjectId(idHotel) }).toArray();

      return ret.map(e => {
        return {
          ...e,
          id: e._id,
        }
      });
    } catch (error) {
      return { error: "Falha ao listar os tipos de quarto", message: error }
    }
  },

  async createTipoQuarto(tipoQuartoInfo) {
    try {
      const res = await client.db("ban2hotel").collection("tipoquarto").insertOne({...tipoQuartoInfo, ativo: true});
      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao cadastrar o tipo do quarto", message: error }
    }
  },

  async updateTipoQuarto(tipoQuartoInfo) {
    try {
      var newvalues = { $set: tipoQuartoInfo };
      var myquery = { _id: ObjectId(tipoQuartoInfo.id) };
      const res = await client.db("ban2hotel").collection("tipoquarto").findOneAndUpdate(myquery, newvalues);

      return res
    } catch (error) {
      return { error: "Falha ao atualizar o tipo do quarto", message: error }
    }
  },

  async deleteTipoQuarto(idTipoQuarto) {
    try {
      var newvalues = { $set: { ativo: false } };
      var myquery = { _id: ObjectId(idTipoQuarto) };
      await client.db("ban2hotel").collection("tipoquarto").findOneAndUpdate(myquery, newvalues);

      return { success: true, message: "Tipo do quarto deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar o tipo do quarto", message: error }
    }
  }
}
