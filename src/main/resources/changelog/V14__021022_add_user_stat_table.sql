create table user_stat (
    id serial primary key,
    user_id integer not null references usr(id),
    total_rolls bigint not null,
    games_won integer not null,
    gray_cells bigint not null
)