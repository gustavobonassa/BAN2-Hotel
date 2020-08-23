const client = require('../config/database');

module.exports = {
  async getExtraByEstadia(idEstadia) {
    try {
      const ret = await client.query('SELECT * FROM extra JOIN servicos ON extra.id_servico = servico.id WHERE ativo = true AND extra.id_estadia = $1', [idEstadia]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar os serviços da estadia", message: error }
    }
  },

  async createExtra(extraInfo) {
    try {
      const {
        id_estadia, id_servico, data, hora,
      } = extraInfo;
      const ret = await client.query('INSERT INTO estadia(id_estadia, id_servico, data, hora) VALUES($1, $2, $3, $4) RETURNING *', [id_estadia, id_servico, data, hora]);
      const newExtra = ret.rows[0];

      return newExtra
    } catch (error) {
      return { error: "Falha ao cadastrar o serviço na estadia", message: error }
    }
  },

  async updateExtra(extraInfo) {
    try {
      const {
        id, id_servico, data, hora,
      } = extraInfo;
      const newHotel = await client.query('UPDATE estadia SET id_servico = $1, data = $2, hora = $3 WHERE id = $3 RETURNING *', [id_servico, data, hora, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar o serviço na estadia", message: error }
    }
  },

  async deleteExtra(idExtra) {
    try {
      client.query('UPDATE extra SET ativo = false WHERE id = $1', [idExtra]);
      return { success: true, message: "Serviço deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar o serviço", message: error }
    }
  }
}
