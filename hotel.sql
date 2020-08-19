CREATE TABLE IF NOT EXISTS endereco (
	id SERIAL NOT NULL,
	rua varchar(100),
	bairro varchar(100),
	cidade varchar(100),
	estado varchar(100),
	CONSTRAINT endereco_pk PRIMARY KEY (id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS cliente (
  id SERIAL NOT NULL,
	rg varchar(12) NOT NULL,
	nome varchar(50) NOT NULL,
	telefone varchar(12),
	id_endereco integer,
	CONSTRAINT cliente_pk PRIMARY KEY (rg),
	CONSTRAINT cliente_fk0 FOREIGN KEY (id_endereco) REFERENCES endereco(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS hotel (
	id SERIAL NOT NULL,
	nome varchar(50),
	telefone varchar(12),
	id_endereco integer,
	CONSTRAINT hotel_pk PRIMARY KEY (id),
	CONSTRAINT hotel_fk0 FOREIGN KEY (id_endereco) REFERENCES endereco(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS tipoQuarto (
	id SERIAL NOT NULL,
	tipo varchar(20),
	preco integer,
	cama_extra integer DEFAULT 0,
	CONSTRAINT tipoQuarto_pk PRIMARY KEY (id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS quarto (
	id SERIAL NOT NULL,
	tipoQuarto integer,
	andar integer,
	numero integer,
	codHotel integer,
	CONSTRAINT quarto_pk PRIMARY KEY (id),
	CONSTRAINT quarto_fk0 FOREIGN KEY (tipoQuarto) REFERENCES tipoQuarto(id),
	CONSTRAINT quarto_fk1 FOREIGN KEY (codHotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS empregado (
	id SERIAL NOT NULL,
	rg varchar(12) NOT NULL UNIQUE,
	nome varchar(50),
	codHotel integer,
  login varchar(40) NOT NULL UNIQUE,
  senha varchar(255),
	CONSTRAINT empregado_pk PRIMARY KEY (id),
	CONSTRAINT empregado_fk0 FOREIGN KEY (codHotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS limpeza (
	id SERIAL NOT NULL,
	data DATE,
	codQuarto integer,
	codEmpregado varchar(12),
	CONSTRAINT limpeza_fk0 FOREIGN KEY (codQuarto) REFERENCES quarto(id),
	CONSTRAINT limpeza_fk1 FOREIGN KEY (codEmpregado) REFERENCES empregado(rg)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS reserva (
	id SERIAL NOT NULL,
	codCliente varchar(12) NOT NULL,
	tipoQuarto integer,
	codHotel integer,
	dataEntrada DATE,
	dataSaida DATE,
	aceita varchar(20),
	CONSTRAINT reserva_pk PRIMARY KEY (id),
	CONSTRAINT reserva_fk0 FOREIGN KEY (codCliente) REFERENCES cliente(rg),
	CONSTRAINT reserva_fk1 FOREIGN KEY (tipoQuarto) REFERENCES tipoQuarto(id),
	CONSTRAINT reserva_fk2 FOREIGN KEY (codHotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS estadia (
	id SERIAL NOT NULL,
	codQuarto integer,
	dataEntrada DATE,
	dataSaida DATE,
	codReserva integer,
	CONSTRAINT estadia_pk PRIMARY KEY (id),
	CONSTRAINT estadia_fk0 FOREIGN KEY (codQuarto) REFERENCES quarto(id),
	CONSTRAINT estadia_fk1 FOREIGN KEY (codReserva) REFERENCES reserva(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS servicos (
	id SERIAL NOT NULL,
	tipo varchar(50),
	preco integer,
	CONSTRAINT servicos_pk PRIMARY KEY (id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS extra (
	id SERIAL NOT NULL,
	codEstadia integer,
	codServico integer,
	data DATE,
	hora TIME,
	CONSTRAINT extra_fk0 FOREIGN KEY (codEstadia) REFERENCES estadia(id),
	CONSTRAINT extra_fk1 FOREIGN KEY (codServico) REFERENCES servicos(id)
) WITH (
	OIDS=FALSE
);
