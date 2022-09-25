create table game_settings (
    id bigserial primary key,
    title varchar not null,
    max_cell_number integer not null,
    shared boolean not null,
    gray_zone_number integer not null,
    shared_cell boolean not null,
    players_number integer not null,
    owner_id integer not null references usr(id),
    created_at timestamp not null
);

create table settings_to_type (
    id bigserial primary key,
    value integer not null,
    settings_id bigint not null references game_settings(id),
    type_id integer not null references cell_type(id)
);