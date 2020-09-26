const { ObjectId } = require('mongodb');
const client = require('../config/mongodb');

module.exports = {
  async getAllClients() {
    try {
      const ret = await client.db("ban2hotel").collection("cliente").find({}).toArray();

      return ret.map(e => {
        return {
          ...e,
          id: e._id,
        }
      });
    } catch (error) {
      return { error: "Falha ao listar os clientes", message: error }
    }
  },

  async getClientById(idClient) {
    try {
      const ret = await client.db("ban2hotel").collection("cliente").findOne({ _id: idClient });
      ret.id = ret._id;
      delete ret._id;
      return ret;
    } catch (error) {
      return { error: "Falha ao cadastrar o cliente", message: error }
    }
  },

  async createClient(clienteInfo) {
    try {
      const res = await client.db("ban2hotel").collection("cliente").insertOne(clienteInfo);
      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao cadastrar o cliente", message: error }
    }
  },

  async updateClient(clienteInfo) {
    try {
      var newvalues = { $set: clienteInfo };
      var myquery = { _id: ObjectId(clienteInfo.id) };
      const res = await client.db("ban2hotel").collection("cliente").findOneAndUpdate(myquery, newvalues);

      return res;
    } catch (error) {
      return { error: "Falha ao atualizar o cliente", message: error }
    }
  },

  async deleteClient(idClient) {
    try {
      var newvalues = { $set: { ativo: false } };
      var myquery = { _id: ObjectId(idClient) };
      await client.db("ban2hotel").collection("cliente").findOneAndUpdate(myquery, newvalues);
      return { success: true, message: "Cliente deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao atualizar o cliente", message: error }
    }
  }
}
