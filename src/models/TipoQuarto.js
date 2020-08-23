const client = require('../config/database');

module.exports = {
  async getTipoQuartoByHotel(idHotel) {
    try {
      const ret = await client.query('SELECT * FROM tipoQuarto WHERE ativo = true AND id_hotel = $1', [idHotel]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar os tipos de quarto", message: error }
    }
  },

  async createTipoQuarto(tipoQuartoInfo) {
    try {
      const {
        tipo, preco, cama_extra, id_hotel,
      } = tipoQuartoInfo;
      const ret = await client.query('INSERT INTO tipoQuarto(tipo, preco, cama_extra, id_hotel) VALUES($1, $2, $3, $4) RETURNING *', [tipo, preco, cama_extra, id_hotel]);
      const newTipoQuarto = ret.rows[0];

      return newTipoQuarto
    } catch (error) {
      return { error: "Falha ao cadastrar o tipo do quarto", message: error }
    }
  },

  async updateTipoQuarto(tipoQuartoInfo) {
    try {
      const {
        id, tipo, preco, cama_extra,
      } = tipoQuartoInfo;
      const newHotel = await client.query('UPDATE tipoQuarto SET tipo = $1, preco = $2, cama_extra = $3 WHERE id = $4 RETURNING *', [tipo, preco, cama_extra, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar o tipo do quarto", message: error }
    }
  },

  async deleteTipoQuarto(idTipoQuarto) {
    try {
      client.query('UPDATE tipoQuarto SET ativo = false WHERE id = $1', [idTipoQuarto]);
      return { success: true, message: "Tipo do quarto deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar o tipo do quarto", message: error }
    }
  }
}
