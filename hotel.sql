CREATE TABLE IF NOT EXISTS endereco (
	id SERIAL NOT NULL,
	rua varchar(100),
	bairro varchar(100),
	cidade varchar(100),
	estado varchar(100),
  numero integer,
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
  ativo boolean DEFAULT TRUE,
	CONSTRAINT cliente_pk PRIMARY KEY (id),
	CONSTRAINT cliente_fk0 FOREIGN KEY (id_endereco) REFERENCES endereco(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS hotel (
	id SERIAL NOT NULL,
	nome varchar(50),
	telefone varchar(12),
	id_endereco integer,
  ativo boolean DEFAULT TRUE,
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
  id_hotel integer,
	CONSTRAINT tipoQuarto_pk PRIMARY KEY (id),
  CONSTRAINT tipoQuarto_fk0 FOREIGN KEY (id_hotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS quarto (
	id SERIAL NOT NULL,
	id_tipo_quarto integer,
	andar integer,
	numero integer,
	id_hotel integer,
	CONSTRAINT quarto_pk PRIMARY KEY (id),
	CONSTRAINT quarto_fk0 FOREIGN KEY (id_tipo_quarto) REFERENCES tipoQuarto(id),
	CONSTRAINT quarto_fk1 FOREIGN KEY (id_hotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS empregado (
	id SERIAL NOT NULL,
	rg varchar(12) NOT NULL UNIQUE,
	nome varchar(50),
	id_hotel integer,
  login varchar(40) NOT NULL UNIQUE,
  senha varchar(255),
	CONSTRAINT empregado_pk PRIMARY KEY (id),
	CONSTRAINT empregado_fk0 FOREIGN KEY (id_hotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS limpeza (
	id SERIAL NOT NULL,
	data DATE,
	id_quarto integer,
	id_empregado integer,
	CONSTRAINT limpeza_fk0 FOREIGN KEY (id_quarto) REFERENCES quarto(id),
	CONSTRAINT limpeza_fk1 FOREIGN KEY (id_empregado) REFERENCES empregado(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS reserva (
	id SERIAL NOT NULL,
	id_cliente integer NOT NULL,
	id_tipo_quarto integer,
	id_hotel integer,
	dataEntrada DATE,
	dataSaida DATE,
	aceita varchar(20),
	CONSTRAINT reserva_pk PRIMARY KEY (id),
	CONSTRAINT reserva_fk0 FOREIGN KEY (id_cliente) REFERENCES cliente(id),
	CONSTRAINT reserva_fk1 FOREIGN KEY (id_tipo_quarto) REFERENCES tipoQuarto(id),
	CONSTRAINT reserva_fk2 FOREIGN KEY (id_hotel) REFERENCES hotel(id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS estadia (
	id SERIAL NOT NULL,
	id_quarto integer,
	dataEntrada DATE,
	dataSaida DATE,
	id_reserva integer DEFAULT NULL,
	CONSTRAINT estadia_pk PRIMARY KEY (id),
	CONSTRAINT estadia_fk0 FOREIGN KEY (id_quarto) REFERENCES quarto(id),
	CONSTRAINT estadia_fk1 FOREIGN KEY (id_reserva) REFERENCES reserva(id)
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
	id_estadia integer,
	id_servico integer,
	data DATE,
	hora TIME,
	CONSTRAINT extra_fk0 FOREIGN KEY (id_estadia) REFERENCES estadia(id),
	CONSTRAINT extra_fk1 FOREIGN KEY (id_servico) REFERENCES servicos(id)
) WITH (
	OIDS=FALSE
);

INSERT INTO empregado(nome, login, senha, rg) VALUES ('teste', 'teste', '$2a$08$X1V/.2r2ttWp4jwg8oAyT./8rz2/2aohdYZU2LWqIW/xr2uVMGKCS', '919191')
