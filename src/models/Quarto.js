const client = require('../config/database');

module.exports = {
  async getQuartosByHotel(idHotel) {
    try {
      const ret = await client.query('SELECT *, quarto.id as id FROM quarto JOIN tipoQuarto ON quarto.id_tipo_quarto = tipoQuarto.id WHERE quarto.ativo = true AND quarto.id_hotel = $1', [idHotel]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar os quartos", message: error }
    }
  },

  async createQuarto(quartoInfo) {
    try {
      const {
        id_tipo_quarto, andar, numero, id_hotel
      } = quartoInfo;
      const ret = await client.query('INSERT INTO quarto(id_tipo_quarto, andar, numero, id_hotel) VALUES($1, $2, $3, $4) RETURNING *', [id_tipo_quarto, andar, numero, id_hotel]);
      const newQuarto = ret.rows[0];

      return newQuarto
    } catch (error) {
      return { error: "Falha ao cadastrar o quarto", message: error }
    }
  },

  async updateQuarto(quartoInfo) {
    try {
      const {
        id, id_tipo_quarto, andar, numero,
      } = quartoInfo;
      const newHotel = await client.query('UPDATE quarto SET id_tipo_quarto = $1, andar = $2, numero = $3 WHERE id = $4 RETURNING *', [id_tipo_quarto, andar, numero, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar o quarto", message: error }
    }
  },

  async deleteQuarto(idQuarto) {
    try {
      client.query('UPDATE quarto SET ativo = false WHERE id = $1', [idQuarto]);
      return { success: true, message: "Quarto deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar o quarto", message: error }
    }
  }
}
