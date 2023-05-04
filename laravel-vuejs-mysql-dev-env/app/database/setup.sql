drop table if exists Users;
create table Users
(
    id         integer primary key auto_increment,
    email      text not null,
    password   text not null,
    created_at datetime default current_timestamp
);

drop table if exists Tasks;
create table Tasks
(
    id           integer primary key auto_increment,
    user_id      integer not null,
    title        text    not null,
    description  text,
    position     integer not null,
    created_at   datetime default current_timestamp,
    completed_at datetime,

    foreign key (user_id) references Users (id) on delete cascade
);