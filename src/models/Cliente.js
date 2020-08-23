const client = require('../config/database');

module.exports = {
  async getAllClients() {
    try {
      const ret = await client.query('SELECT * FROM cliente JOIN endereco ON cliente.id_endereco = endereco.id WHERE ativo = true');

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar os clientes", message: error }
    }
  },

  async getClientById(idClient) {
    try {
      const ret = await client.query('SELECT * FROM cliente JOIN endereco ON cliente.id_endereco = endereco.id WHERE ativo = true AND cliente.id = $1', [idClient]);

      return ret.rows[0];
    } catch (error) {
      return { error: "Falha ao cadastrar o cliente", message: error }
    }
  },

  async createClient(clienteInfo) {
    try {
      const {
        rua, bairro, cidade, estado, numero
      } = clienteInfo;
      const ret = await client.query('INSERT INTO endereco(rua, bairro, cidade, estado, numero) VALUES($1, $2, $3, $4, $5) RETURNING *', [rua, bairro, cidade, estado, numero]);
      const newAddress = ret.rows[0];

      if (newAddress) {
        const {
          nome, telefone
        } = clienteInfo;
        const newClient = await client.query('INSERT INTO cliente(nome, telefone, id_endereco) VALUES($1, $2, $3) RETURNING *', [nome, telefone, newAddress.id]);

        return { ...newAddress, ...newClient.rows[0] }
      }

      return { error: "Falha ao cadastrar o cliente" }
    } catch (error) {
      return { error: "Falha ao cadastrar o cliente", message: error }
    }
  },

  async updateClient(clienteInfo) {
    try {
      const {
        rua, bairro, cidade, estado, numero,
        id, nome, telefone, rg,
      } = clienteInfo;
      const newClient = await client.query('UPDATE cliente SET nome = $1, telefone = $2, rg = $3 WHERE id = $4 RETURNING *', [nome, telefone, rg, id]);
      const newAddress = await client.query('UPDATE endereco SET rua = $1, bairro = $2, cidade = $3, estado = $4, numero = $5 WHERE id = $6 RETURNING *', [rua, bairro, cidade, estado, numero, newClient.rows[0].id_endereco]);
      return {
        ...newAddress.rows[0],
        ...newClient.rows[0]
      }
    } catch (error) {
      return { error: "Falha ao atualizar o cliente", message: error }
    }
  },

  async deleteClient(idClient) {
    try {
      client.query('UPDATE cliente SET ativo = false WHERE id = $1', [idClient]);
      return { success: true, message: "Cliente deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao atualizar o cliente", message: error }
    }
  }
}
