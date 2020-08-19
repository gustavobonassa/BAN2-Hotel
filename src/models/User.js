const client = require('../config/database');
const bcrypt = require('bcryptjs')

module.exports = {
  async getAutentication({ login, senha }) {
    try {
      const res = await client.query('SELECT senha FROM empregado WHERE login = $1', [login]);
      if (res.rows.length === 0) {
        return { error: "Usuário não encontrado" }
      }
      const oldPass = res.rows[0].senha;
      console.log(oldPass)
      return bcrypt.compare(senha, oldPass)
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async getUserById(id, callback) {
    client.query('SELECT * FROM pessoa WHERE codp = $1', [id], (err, res) => {
      callback(err, res.rows);
    });
  },

  async userExists({ login, rg }, callback) {
    try {
      const res = await client.query('SELECT * FROM empregado WHERE login = $1 OR rg = $2', [login, rg]);
      return res.rows.length > 0;
    } catch (error) {
      return false;
    }
  },

  async createUser({ nome, login, senha, rg }) {
    try {
      const res = await client.query('INSERT INTO empregado(nome, login, senha, rg) VALUES($1, $2, $3, $4) RETURNING *', [nome, login, senha, rg])
      return res.rows[0];
    } catch (error) {
      return { error: "Falha ao inserir usuário", message: error }
    }
  },

  async updateUser({ nome, cpf, senha, codt, codp }, callback) {
    client.query('UPDATE pessoa SET nome = $1, cpf = $2, senha = $3, codt = $4 WHERE codp = $5', [nome, cpf, senha, codt, codp], (err, res) => {
      callback(err, res.rows);
    });
  },

  async deleteUser(codp, callback) {
    client.query('UPDATE pessoa SET ativo = 0 WHERE codp = $1', [codp], (err, res) => {
      callback(err, res.rows);
    });
  }
}
