const client = require('../config/database');

module.exports = {
  async getLimpezaByHotel(idHotel) {
    try {
      const ret = await client.query('SELECT * FROM limpeza JOIN quarto ON limpeza.id_quarto = quarto.id JOIN empregado ON limpeza.id_empregado = empregado.id WHERE ativo = true AND quarto.id_hotel = $1', [idHotel]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar a limpeza de quarto", message: error }
    }
  },

  async createLimpeza(limpezaInfo) {
    try {
      const {
        data, id_quarto, id_empregado
      } = limpezaInfo;
      const ret = await client.query('INSERT INTO limpeza(data, id_quarto, id_empregado) VALUES($1, $2, $3) RETURNING *', [data, id_quarto, id_empregado]);
      const newLimpeza = ret.rows[0];

      return newLimpeza
    } catch (error) {
      return { error: "Falha ao cadastrar a limpeza", message: error }
    }
  },

  async updateLimpeza(limpezaInfo) {
    try {
      const {
        id, data, id_quarto, id_empregado
      } = limpezaInfo;
      const newHotel = await client.query('UPDATE limpeza SET data = $1, id_quarto = $2, id_empregado = $3 WHERE id = $3 RETURNING *', [data, id_quarto, id_empregado, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar a limpeza", message: error }
    }
  },

  async deleteLimpeza(idLimpeza) {
    try {
      client.query('UPDATE limpeza SET ativo = false WHERE id = $1', [idLimpeza]);
      return { success: true, message: "Limpeza deletada com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar a limpeza", message: error }
    }
  }
}
