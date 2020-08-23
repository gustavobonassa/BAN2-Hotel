const client = require('../config/database');

module.exports = {
  async getServicosByHotel(idHotel) {
    try {
      const ret = await client.query('SELECT * FROM servicos WHERE ativo = true AND id_hotel = $1', [idHotel]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar os serviços", message: error }
    }
  },

  async createServico(servicoInfo) {
    try {
      const {
        tipo, preco
      } = servicoInfo;
      const ret = await client.query('INSERT INTO servicos(tipo, preco) VALUES($1, $2) RETURNING *', [tipo, preco]);
      const newServico = ret.rows[0];

      return newServico
    } catch (error) {
      return { error: "Falha ao cadastrar o serviço", message: error }
    }
  },

  async updateServico(servicoInfo) {
    try {
      const {
        id, tipo, preco
      } = servicoInfo;
      const newHotel = await client.query('UPDATE servicos SET tipo = $1, preco = $2 WHERE id = $3 RETURNING *', [tipo, preco, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar o serviço", message: error }
    }
  },

  async deleteServico(idServico) {
    try {
      client.query('UPDATE servicos SET ativo = false WHERE id = $1', [idServico]);
      return { success: true, message: "Serviço deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar o serviço", message: error }
    }
  }
}
