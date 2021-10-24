# node-postgress-login
A demonstration on how to register, login, and logout using expressJS and PostgressDB

Prerequisites:
1. Postgres CLI
2. NPM


After all the prerequisites are successfully installed, follow the below procedure to test the module
Steps to Create Owner, Database, and Table in Postgress CLI

#### Step 1: Login to postgres as root user, in my case while installing I configured 9110 port for root

$ `psql -U postgres -d postgres -p 9110`

#### Step 2: Create a user named Gaurav with password as 'password' with createdb permission

```
postgres=# create user gaurav with password 'password' createdb;
CREATE ROLE
postgres=# \du
 List of roles
 Role name | Attributes | Member of
-----------+------------------------------------------------------------+-----------
 gaurav    | Create DB  | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

postgres=# exit
```

#### Step 3: Login as newly created user

$ `psql -U gaurav -d postgres -p 9110`

#### Step 4: Create a new database called 'nodelogin'

```
postgres=> create database nodelogin;
CREATE DATABASE
```

== Get list of databse using `\l` command

```
postgres=> \l
List of databases
   Name    |  Owner   | Encoding |          Collate           |        Ctype            |   Access privileges
-----------+----------+----------+----------------------------+----------------------------+-----------------------
 nodelogin | gaurav   | UTF8     | English_United States.1252 | English_United States.1252 |
 postgres  | postgres | UTF8     | English_United States.1252 | English_United States.1252 |
 template0 | postgres | UTF8     | English_United States.1252 | English_United States.1252 | =c/postgres          |postgres=CTc/postgres
 template1 | postgres | UTF8     | English_United States.1252 | English_United States.1252 | =c/postgres          |postgres=CTc/postgres
(4 rows)
```

#### Step 5: Login to Database

```
postgres=> \c nodelogin
You are now connected to database "nodelogin" as user "gaurav".
```

#### Step 6: Create a table called `users`

```
nodelogin=> create table users
nodelogin-> (id BIGSERIAL primary key not null,
nodelogin(> name varchar(200) not null,
nodelogin(> email varchar(200) not null,
nodelogin(> password varchar(200) not null,
nodelogin(> unique (email));
CREATE TABLE
```

==Get rows in table using below command

```
nodelogin=> select * from users;
 id | name | email | password
----+------+-------+----------
(0 rows)
```

==Get List of users using below command

```
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
```

#### Step 7: Clone the repo

```
git clone https://github.com/sukhatmegaurav/node-postgress-login.git
```
#### Step 8: install dependancies

```
npm install
```
#### Step 9: run server

```
npm start
```
== navigate to 
http://localhost:4000
