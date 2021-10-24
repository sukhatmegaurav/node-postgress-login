Prerequisites:
1. Postgres CLI
2. NPM
3. `npm install` in this directory


After all the prerequisites are successfully installed, follow the below procedure to test the module
Steps to Create Owner, Database, and Table in Postgress CLI

Step 1: Login to postgres as root user, in my case while installing I configured 9110 port for root

$ `psql -U postgres -d postgres -p 9110`

Step 2: Create a user named Gaurav with password as 'password' with createdb permission

postgres=# create user gaurav with password 'password' createdb;
CREATE ROLE
postgres=# \du
 List of roles
 Role name | Attributes | Member of
-----------+------------------------------------------------------------+-----------
 gaurav    | Create DB  | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

postgres=# exit

Step 3: Login as newly created user

$ `psql -U gaurav -d postgres -p 9110`

Step 4: Create a new database called 'nodelogin'

postgres=> create database nodelogin;
CREATE DATABASE

== Get list of databse using `\l` command

postgres=> \l
List of databases
   Name    |  Owner   | Encoding |          Collate           |        Ctype            |   Access privileges
-----------+----------+----------+----------------------------+----------------------------+-----------------------
 nodelogin | gaurav   | UTF8     | English_United States.1252 | English_United States.1252 |
 postgres  | postgres | UTF8     | English_United States.1252 | English_United States.1252 |
 template0 | postgres | UTF8     | English_United States.1252 | English_United States.1252 | =c/postgres          |postgres=CTc/postgres
 template1 | postgres | UTF8     | English_United States.1252 | English_United States.1252 | =c/postgres          |postgres=CTc/postgres
(4 rows)

Step 5: Login to Database

postgres=> \c nodelogin
You are now connected to database "nodelogin" as user "gaurav".

Step 6: Create a table called `users`

nodelogin=> create table users
nodelogin-> (id BIGSERIAL primary key not null,
nodelogin(> name varchar(200) not null,
nodelogin(> email varchar(200) not null,
nodelogin(> password varchar(200) not null,
nodelogin(> unique (email));
CREATE TABLE

==Get rows in table using below command

nodelogin=> select * from users;
 id | name | email | password
----+------+-------+----------
(0 rows)

==Get List of users using below command

nodelogin=> \d users;
Table "public.users"
  Column  |          Type          | Collation | Nullable |       Default
----------+------------------------+-----------+----------+-----------------------------------
 id       | bigint                 |           | not null | nextval('users_id_seq'::regclass)
 name     | character varying(200) |           | not null |
 email    | character varying(200) |           | not null |
 password | character varying(200) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)


Step 7: Create a folder for this project and run `npm init`

Step 8: Add the follwing in your package.json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }

Steps 9: Install Nodemon and ejs packages. 
- Nodemon
Whenever you save any changes to your project nodemon will auto restart the server, this will give you seamless development experience. That's why we are installing Nodemon. 
- EJS
EJS library is a prerequisite for expressjs

`npm i nodemon,ejs`

Step 10: create server.js, create views folder

Step 11: Install bcrypt and dotenv library 

`npm install bcrypt and dotenv`

Step 12: Setup dbConfig.js and .env, as is here accordinly

==To insert new user into postgres DB use the below command

nodelogin=> insert into users (name,email,password) values ('kats
uki', 'kbakugo@email.com','password');
INSERT 0 1
nodelogin=> select * from users
nodelogin-> ;
 id |  name   |       email       | password
----+---------+-------------------+----------
  1 | katsuki | kbakugo@email.com | password
(1 row)
