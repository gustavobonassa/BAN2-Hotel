const client = require('../config/database');

module.exports = {
  async getQuartosByHotel(idHotel) {
    try {
      const ret = await client.db("ban2hotel").collection("quarto").find({ id_hotel: ObjectId(idHotel) }).toArray();

      return ret.map(e => {
        return {
          ...e,
          id: e._id,
        }
      });
    } catch (error) {
      return { error: "Falha ao listar os quartos", message: error }
    }
  },

  async createQuarto(quartoInfo) {
    try {
      const res = await client.db("ban2hotel").collection("quarto").insertOne({...quartoInfo, ativo: true});

      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao cadastrar o quarto", message: error }
    }
  },

  async updateQuarto(quartoInfo) {
    try {
      var newvalues = { $set: quartoInfo };
      var myquery = { _id: ObjectId(quartoInfo.id) };
      const res = await client.db("ban2hotel").collection("quarto").findOneAndUpdate(myquery, newvalues);

      return res
    } catch (error) {
      return { error: "Falha ao atualizar o quarto", message: error }
    }
  },

  async deleteQuarto(idQuarto) {
    try {
      var newvalues = { $set: { ativo: false } };
      var myquery = { _id: ObjectId(idQuarto) };
      await client.db("ban2hotel").collection("quarto").findOneAndUpdate(myquery, newvalues);
      return { success: true, message: "Quarto deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar o quarto", message: error }
    }
  }
}
