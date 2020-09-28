const { ObjectId } = require('mongodb');
const client = require('../config/mongodb');

module.exports = {
  async getEstadiasByHotel(idHotel) {
    try {
      const ret = await client.db("ban2hotel").collection("estadia").find({ id_hotel: ObjectId(idHotel) }).toArray();

      return ret.map(e => {
        return {
          ...e,
          id: e._id,
        }
      });
    } catch (error) {
      return { error: "Falha ao listar as estadias", message: error }
    }
  },

  async createEstadia(estadiaInfo) {
    try {

      const res = await client.db("ban2hotel").collection("estadia").insertOne({
        ...estadiaInfo,
        ativo: true,
        id_hotel: ObjectId(estadiaInfo.id_hotel)
      });
      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao cadastrar a estadia", message: error }
    }
  },

  async updateEstadia(estadiaInfo) {
    try {
      var newvalues = { $set: estadiaInfo };
      var myquery = { _id: ObjectId(estadiaInfo.id) };
      const res = await client.db("ban2hotel").collection("estadia").findOneAndUpdate(myquery, newvalues);

      return res
    } catch (error) {
      return { error: "Falha ao atualizar a estadia", message: error }
    }
  },

  async deleteEstadia(idEstadia) {
    try {
      var newvalues = { $set: { ativo: false } };
      var myquery = { _id: ObjectId(idEstadia) };
      await client.db("ban2hotel").collection("estadia").findOneAndUpdate(myquery, newvalues);
      return { success: true, message: "Estadia deletada com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar a estadia", message: error }
    }
  }
}
