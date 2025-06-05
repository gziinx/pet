CREATE DATABASE db_queropet;

use db_queropet;

create table tbl_endereco(
	id int not null primary key auto_increment,
    cep varchar(12),
    logradouro varchar (100),
    bairro varchar (100),
    uf varchar(5)
);

create table tbl_usuario(
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
	telefone varchar(15) not null,
    palavra_chave varchar(100) not null,
    data_nascimento date not null,
    cpf varchar(11) not null,
    id_endereco int,
    
    constraint FK_ENDERECO_USUARIO
    foreign key (id_endereco)
    references tbl_endereco(id)
);

create table tbl_contato(
	id int not null primary key auto_increment,
    telefone varchar(100) not null,
    id_usuario int,
    
    constraint FK_CONTATO_USUARIO
    foreign key (id_usuario)
    references tbl_usuario(id)
)


create table tbl_porte(
	id int not null primary key auto_increment,
    porte varchar(100) not null
);

create table tbl_especie(
	id int not null primary key auto_increment,
    especie varchar(100) not null
);

create table tbl_status (
	id int not null primary key auto_increment,
    status varchar(100) not null
);

create table tbl_raca (
	id int not null primary key auto_increment,
    raca varchar(100) not null
);

create table tbl_sexo (
	id int not null primary key auto_increment,
    sexo varchar(60) not null
);

create table tbl_temperamento(
	id int not null primary key auto_increment,
    temperamento varchar(100) not null
);

create table tbl_comportamento(
	id int not null primary key auto_increment,
    comportamento varchar(100) not null
);

create table tbl_saude(
	id int not null primary key auto_increment,
    saude varchar(100) not null
);

create table tbl_pet(
	id int not null primary key auto_increment,
    nome varchar(100) not null,
    data_nascimento date not null,
    foto varchar(200) not null,
    necessidades varchar(200) not null,
    id_porte int,
    id_raca int,
    id_sexo int ,
    id_temperamento int,
    id_especie int,
    id_saude int,
    
     constraint FK_PET_PORTE
    foreign key (id_porte)
    references tbl_porte(id),
    
    
    constraint FK_PET_RACA
    foreign key (id_raca)
    references tbl_raca(id),
    
	constraint FK_PET_SEXO
    foreign key (id_sexo)
    references tbl_sexo(id),
    
	constraint FK_PET_TEMPERAMENTO
    foreign key (id_temperamento)
    references tbl_temperamento(id),
    
	constraint FK_PET_ESPECIE
    foreign key (id_especie)
    references tbl_especie(id),

    constraint FK_PET_SAUDE
    foreign key (id_saude)
    references tbl_saude(id)
    
);

create table tbl_pet_comportamento(
	id int not null primary key auto_increment,
    id_pet int,
    id_comportamento int,
    
    constraint FK_PET_COMPORTAMENTO
    foreign key (id_pet)
    references tbl_pet(id),
    
    constraint FK_COMPORTAMENTO_PET
    foreign key (id_comportamento)
    references tbl_comportamento(id)
);




ALTER TABLE tbl_endereco
DROP COLUMN cidade;

ALTER TABLE tbl_endereco
ADD COLUMN cep VARCHAR(12);


show tables ;

SELECT * FROM tbl_endereco;
