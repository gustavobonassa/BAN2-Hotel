const client = require('../config/mongodb');
const bcrypt = require('bcryptjs')

module.exports = {
  async getAutentication({ login, senha }) {
    try {
      const res = await client.db("ban2hotel").collection("empregado").findOne({ login });
      if (res === null) {
        return false
      }
      const oldPass = res.senha;

      return bcrypt.compare(senha, oldPass)
    } catch (error) {
      return false
    }
  },

  async getAllEmpregado() {
    try {
      const ret = await client.db("ban2hotel").collection("empregado").aggregate([
        { $lookup:
          {
            from: 'hotel',
            localField: 'id_hotel',
            foreignField: '_id',
            as: 'hotel'
          }
        }
        ]).toArray();

      return ret;
    } catch (error) {
      return { error: "Falha ao listar os empregados", message: error }
    }
  },

  async getUserByLogin({ login }) {
    try {
      const res = await client.db("ban2hotel").collection("empregado").findOne({ login });
      res.id = res._id;
      delete res._id;
      return res || { error: true };
    } catch (error) {
      return { error: true };
    }
  },

  async userExists({ login, rg }) {
    try {
      const myobj = { login, rg };
      const res = await client.db("ban2hotel").collection("empregado").findOne(myobj);
      return !!res;
    } catch (error) {
      return false;
    }
  },

  async createUser({ nome, login, senha, rg, id_hotel }) {
    try {
      let myobj = { nome, login, senha, rg, id_hotel };
      const res = await client.db("ban2hotel").collection("empregado").insertOne(myobj);
      res.ops[0].id = res.ops[0]._id;
      delete res.ops[0]._id;
      return res.ops[0];
    } catch (error) {
      return { error: "Falha ao inserir usuário", message: error }
    }
  },
}
