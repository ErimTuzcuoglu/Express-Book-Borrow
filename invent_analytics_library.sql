CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE invent_analytics_library;


-- public.book definition

-- Drop table

-- DROP TABLE public.book;

CREATE TABLE public.book (
	id serial4 NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NOT NULL DEFAULT now(),
	"name" varchar NOT NULL,
	"isBorrowed" bool NOT NULL DEFAULT false,
	CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id)
);


-- public.migrations definition

-- Drop table

-- DROP TABLE public.migrations;

CREATE TABLE public.migrations (
	id serial4 NOT NULL,
	"timestamp" int8 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id)
);


-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id serial4 NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NOT NULL DEFAULT now(),
	"name" varchar NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);


-- public.borrow definition

-- Drop table

-- DROP TABLE public.borrow;

CREATE TABLE public.borrow (
	id serial4 NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	"updatedAt" timestamp NOT NULL DEFAULT now(),
	"userId" int4 NOT NULL,
	"bookId" int4 NOT NULL,
	score int4 NOT NULL DEFAULT 0,
	"isReturned" bool NOT NULL DEFAULT false,
	CONSTRAINT "PK_dff0c680b9c6fc99f5a20d67a97" PRIMARY KEY (id),
	CONSTRAINT "FK_395ef8d1ea4a0ff8f1fa17f67ad" FOREIGN KEY ("userId") REFERENCES public."user"(id),
	CONSTRAINT "FK_f5c8ea379eee06ce1482f20d101" FOREIGN KEY ("bookId") REFERENCES public.book(id)
);
