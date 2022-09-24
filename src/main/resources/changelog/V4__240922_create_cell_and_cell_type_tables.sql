create table cell (
    id bigserial primary key,
    content text not null,
    type_id integer not null
);

create table cell_type(
    id serial primary key,
    label varchar not null,
    color varchar(7) not null
);

insert into cell_type (label, color) values ('Default', '#FFFFFF');