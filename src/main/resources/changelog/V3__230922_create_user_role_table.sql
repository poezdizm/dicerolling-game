create table user_role (
    id serial primary key,
    user_id integer references usr(id),
    roles varchar not null
);