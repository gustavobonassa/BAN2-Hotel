create or replace function criaEstadia() returns trigger as
$$
begin
	UPDATE reserva SET ativo = false WHERE id = NEW.id_reserva;
	RETURN NEW;
end;
$$
language plpgsql;

create trigger criaEstadia after insert on estadia
for each row execute procedure criaEstadia();


create or replace function validaRG() returns trigger as
$$
begin
	if(select count(id) from cliente where rg = NEW.rg) > 0 then
    raise exception 'RG já cadastrado!';
  end if;
  return NEW;
end;
$$
language plpgsql;

create trigger validaRG before insert on cliente
for each row execute procedure validaRG();


create or replace function validaEstadia() returns trigger as
$$
begin
	if(select count(id) from estadia where id_quarto = NEW.id_quarto and estadia.ativo = true) > 0 then
    raise exception 'O quarto está ocupado!';
  end if;
  return NEW;
end;
$$
language plpgsql;

create trigger validaEstadia before insert on estadia
for each row execute procedure validaEstadia();


create or replace function validaNovoQuarto() returns trigger as
$$
begin
	if(select count(id) from quarto where numero = NEW.numero and andar = NEW.andar and id_hotel = NEW.id_hotel and ativo = true) > 0 then
    raise exception 'Esse quarto já foi criado!';
  end if;
  return NEW;
end;
$$
language plpgsql;

create trigger validaNovoQuarto before insert on quarto
for each row execute procedure validaNovoQuarto();
