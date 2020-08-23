const client = require('../config/database');

module.exports = {
  async getReservasByHotel(idHotel) {
    try {
      const ret = await client.query('SELECT * FROM reserva JOIN cliente ON reserva.id_cliente = cliente.id JOIN tipoQuarto ON reserva.id_tipo_quarto = tipoQuarto.id WHERE reserva.ativo = true AND id_hotel = $1', [idHotel]);

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar as reservas", message: error }
    }
  },

  async createReserva(reservaInfo) {
    try {
      const {
        id_cliente, id_tipo_quarto, id_hotel, dataentrada, datasaida
      } = reservaInfo;
      const ret = await client.query('INSERT INTO reserva(id_cliente, id_tipo_quarto, id_hotel, dataentrada, datasaida) VALUES($1, $2, $3, $4, $5) RETURNING *', [id_cliente, id_tipo_quarto, id_hotel, dataentrada, datasaida]);
      const newReserva = ret.rows[0];

      return newReserva
    } catch (error) {
      return { error: "Falha ao cadastrar a reserva", message: error }
    }
  },

  async updateReserva(reservaInfo) {
    try {
      const {
        id, id_tipo_quarto, dataentrada, datasaida
      } = reservaInfo;
      const newHotel = await client.query('UPDATE reserva SET id_tipo_quarto = $1, dataentrada = $2, datasaida = $3 WHERE id = $4 RETURNING *', [id_tipo_quarto, dataentrada, datasaida, id]);
      return newHotel.rows[0]
    } catch (error) {
      return { error: "Falha ao atualizar a reserva", message: error }
    }
  },

  async deleteReserva(idReserva) {
    try {
      client.query('UPDATE reserva SET ativo = false WHERE id = $1', [idReserva]);
      return { success: true, message: "Reserva deletada com sucesso" }
    } catch (error) {
      return { error: "Falha ao deletar a reserva", message: error }
    }
  }
}
