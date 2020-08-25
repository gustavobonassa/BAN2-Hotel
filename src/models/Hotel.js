const client = require('../config/database');

module.exports = {
  async getAllHotels() {
    try {
      const ret = await client.query('SELECT * FROM hotel JOIN endereco ON hotel.id_endereco = endereco.id WHERE ativo = true');

      return ret.rows;
    } catch (error) {
      return { error: "Falha ao listar hoteis", message: error }
    }
  },

  async getHotelById(idHotel) {
    try {
      const ret = await client.query('SELECT *, hotel.id as id FROM hotel JOIN endereco ON hotel.id_endereco = endereco.id WHERE ativo = true AND hotel.id = $1', [idHotel]);

      const quartos = await client.query('SELECT *, quarto.id as id FROM quarto JOIN tipoQuarto ON quarto.id_tipo_quarto = tipoQuarto.id WHERE quarto.ativo = true AND quarto.id_hotel = $1', [idHotel]);

      const tipoquartos = await client.query('SELECT * FROM tipoQuarto WHERE ativo = true AND id_hotel = $1', [idHotel]);

      return {
        ...ret.rows[0],
        quartos: quartos.rows,
        tipo_quarto: tipoquartos.rows,
      };
    } catch (error) {
      return { error: "Falha ao pegar o hotel", message: error }
    }
  },

  async createHotel(hotelInfo) {
    try {
      const {
        rua, bairro, cidade, estado, numero
      } = hotelInfo;
      const ret = await client.query('INSERT INTO endereco(rua, bairro, cidade, estado, numero) VALUES($1, $2, $3, $4, $5) RETURNING *', [rua, bairro, cidade, estado, numero]);
      const newAddress = ret.rows[0];

      if (newAddress) {
        const {
          nome, telefone
        } = hotelInfo;
        const newHotel = await client.query('INSERT INTO hotel(nome, telefone, id_endereco) VALUES($1, $2, $3) RETURNING *', [nome, telefone, newAddress.id]);

        return { ...newAddress, ...newHotel.rows[0] }
      }

      return { error: "Falha ao cadastrar o hotel" }
    } catch (error) {
      return { error: "Falha ao cadastrar o hotel", message: error }
    }
  },

  async updateHotel(hotelInfo) {
    try {
      const {
        rua, bairro, cidade, estado, numero,
        id, nome, telefone,
      } = hotelInfo;
      const newHotel = await client.query('UPDATE hotel SET nome = $1, telefone = $2 WHERE id = $3 RETURNING *', [nome, telefone, id]);
      const newAddress = await client.query('UPDATE endereco SET rua = $1, bairro = $2, cidade = $3, estado = $4, numero = $5 WHERE id = $6 RETURNING *', [rua, bairro, cidade, estado, numero, newHotel.rows[0].id_endereco]);
      return {
        ...newAddress.rows[0],
        ...newHotel.rows[0]
      }
    } catch (error) {
      return { error: "Falha ao atualizar o hotel", message: error }
    }
  },

  async deleteHotel(idHotel) {
    try {
      client.query('UPDATE hotel SET ativo = false WHERE id = $1', [idHotel]);
      return { success: true, message: "Hotel deletado com sucesso" }
    } catch (error) {
      return { error: "Falha ao atualizar o hotel", message: error }
    }
  }
}
