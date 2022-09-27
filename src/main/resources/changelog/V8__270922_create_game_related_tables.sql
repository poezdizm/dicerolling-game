create table game (
    id bigserial primary key,
    settings_id bigint not null references game_settings(id)
);

create table board (
    id bigserial primary key,
    game_id bigint not null references game(id),
    player_id integer references usr(id)
);

create table game_cell (
    id bigserial primary key,
    position_num integer,
    gray boolean not null,
    board_id bigint not null references board(id),
    cell_id bigint not null references cell(id)
);

create table game_to_player (
    id bigserial primary key,
    position_num integer,
    game_id bigint not null references game(id),
    player_id integer references usr(id)
);

alter table roll_history add column game_to_player_id bigint references game_to_player(id);