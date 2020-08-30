const client = require('../config/database');

module.exports = {
  async getEstadiasByHotel(idHotel) {
    try {
      const ret = await client.query('SELECT * FROM estadia JOIN reserva ON estadia.id_reserva = reserva.id JOIN cliente ON reserva.id_cliente = cliente.id JOIN tipoQuarto ON reserva.id_tipo_quarto = tipoQuarto.id WHERE estadia.ativo = true AND id_hotel = $1', [idHotel]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar as estadias", message: error }
    }
  },

  async createEstadia(estadiaInfo) {
    try {
      const {
        id_quarto, dataentrada, datasaida, id_reserva
      } = estadiaInfo;
      const ret = await client.query('INSERT INTO estadia(id_quarto, dataentrada, datasaida, id_reserva) VALUES($1, $2, $3, $4) RETURNING *', [id_quarto, dataentrada, datasaida, id_reserva]);
      const newEstadia = ret.rows[0];

      return newEstadia
    } catch (error) {
      return { error: "Falha ao cadastrar a estadia", message: error }
    }
  },

  async updateEstadia(estadiaInfo) {
    try {
      const {
        id, id_quarto, dataentrada, datasaida
      } = estadiaInfo;
      const newHotel = await client.query('UPDATE reserva SET id_quarto = $1, dataentrada = $2, datasaida = $3 WHERE id = $4 RETURNING *', [id_quarto, dataentrada, datasaida, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar a estadia", message: error }
    }
  },

  async deleteEstadia(idEstadia) {
    try {
      client.query('UPDATE estadia SET ativo = false WHERE id = $1', [idEstadia]);
      return { success: true, message: "Estadia deletada com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar a estadia", message: error }
    }
  }
}
