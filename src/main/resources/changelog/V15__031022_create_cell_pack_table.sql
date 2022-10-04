create table cell_pack (
    id serial primary key,
    title varchar not null
);

insert into cell_pack(title) values ('Default');

alter table cell add column pack_id integer references cell_pack(id) default 1;

alter table game_settings add column pack_id integer references cell_pack(id) default 1;