CREATE DATABASE taskflow
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_GB.UTF-8'
    LC_CTYPE = 'en_GB.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON TABLES TO admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON SEQUENCES TO admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT EXECUTE ON FUNCTIONS TO admin;

CREATE TABLE IF NOT EXISTS public.role
(
    id serial NOT NULL,
    name character(150) NOT NULL,
    description character(250),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.role
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.file
(
    id serial NOT NULL,
    name character(250) NOT NULL,
    path character(250) NOT NULL,
    type character(25),
    CONSTRAINT file_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.file
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.road_type
(
    id serial NOT NULL,
    name character(50) NOT NULL,
    CONSTRAINT road_type_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.road_type
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.person_contact
(
    id serial NOT NULL,
    name character(150) NOT NULL,
    phone character(25) NOT NULL,
    observations character(250),
    CONSTRAINT person_contact_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.person_contact
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.address
(
    id serial NOT NULL,
    id_road_type integer NOT NULL,
    name character(150) NOT NULL,
    complementary character(150),
    "number" integer,
    postal_code character(10),
    province character(150),
    location character(150),
    CONSTRAINT address_pkey PRIMARY KEY (id),
    CONSTRAINT address_id_road_type_fkey FOREIGN KEY (id_road_type)
        REFERENCES public.road_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.address
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.agent
(
    id serial NOT NULL,
    name character(150) NOT NULL,
    cif character(20),
    phone character(20),
    email character(50),
    id_address integer,
    CONSTRAINT agent_pkey PRIMARY KEY (id),
    CONSTRAINT agent_id_address_fkey FOREIGN KEY (id_address)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.agent
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.agent_person_contact
(
    id_agent integer,
    id_person_contact integer,
    CONSTRAINT agent_person_contact_id_agent_fkey FOREIGN KEY (id_agent)
        REFERENCES public.agent (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT agent_person_contact_id_person_contact_fkey FOREIGN KEY (id_person_contact)
        REFERENCES public.person_contact (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.agent_person_contact
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public."user"
(
    id serial NOT NULL,
    id_role integer NOT NULL,
    name character(250) NOT NULL,
    username character(250) NOT NULL,
    password character(250) NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username),
    CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("id_role")
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public."user"
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.user_category
(
    id serial NOT NULL,
    name character(150) NOT NULL,
    description character(500),
    CONSTRAINT user_category_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.user_company
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.user_category_user
(
    "userId" integer NOT NULL,
    "userCategoryId" integer NOT NULL,
    CONSTRAINT "PK_b9fcb194cdfa01e3a3b90e6cf8d" PRIMARY KEY ("userId", "userCategoryId"),
    CONSTRAINT "FK_5ca0e697a7fd07271eed974f9c3" FOREIGN KEY ("userId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "FK_989dc2e0428e836f51632ae1253" FOREIGN KEY ("userCategoryId")
        REFERENCES public.user_category (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

ALTER TABLE IF EXISTS public.user_category_user
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.client
(
    id serial NOT NULL,
    "number" character(20) NOT NULL,
    name character(150),
    cif character(20),
    phone character(20),
    email character(50),
    id_address integer NOT NULL,
    id_agent integer,
    observations character(250),
    CONSTRAINT client_pkey PRIMARY KEY (id),
    CONSTRAINT client_id_address_fkey FOREIGN KEY (id_address)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT client_id_agent_fkey FOREIGN KEY (id_agent)
        REFERENCES public.agent (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.client
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.client_person_contact
(
    id_client integer NOT NULL,
    id_person_contact integer NOT NULL,
    CONSTRAINT client_person_contact_id_client_fkey FOREIGN KEY (id_client)
        REFERENCES public.client (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT client_person_contact_id_person_contact_fkey FOREIGN KEY (id_person_contact)
        REFERENCES public.person_contact (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.client_person_contact
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.notice
(
    id serial NOT NULL,
    id_client integer,
    notice_date date NOT NULL,
    expected_date date,
    id_address integer,
    description character(500),
    creation_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    creation_user_id integer NOT NULL,
    CONSTRAINT notice_pkey PRIMARY KEY (id),
    CONSTRAINT notice_creation_user_id_fkey FOREIGN KEY (creation_user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT notice_id_address_fkey FOREIGN KEY (id_address)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT notice_id_client_fkey FOREIGN KEY (id_client)
        REFERENCES public.client (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.notice
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.notice_file
(
    id_notice integer NOT NULL,
    id_file integer NOT NULL,
    CONSTRAINT notice_file_id_file_fkey FOREIGN KEY (id_file)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT notice_file_id_notice_fkey FOREIGN KEY (id_notice)
        REFERENCES public.notice (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.notice_file
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.budget
(
    id serial NOT NULL,
    id_client integer NOT NULL,
    id_agent integer,
    notice_date date,
    expected_date date,
    id_address integer,
    description character(500),
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    creation_user_id integer,
    amount numeric,
    id_notice integer,
    CONSTRAINT budget_pkey PRIMARY KEY (id),
    CONSTRAINT budget_creation_user_id_fkey FOREIGN KEY (creation_user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT budget_id_address_fkey FOREIGN KEY (id_address)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT budget_id_agent_fkey FOREIGN KEY (id_agent)
        REFERENCES public.agent (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT budget_id_client_fkey FOREIGN KEY (id_client)
        REFERENCES public.client (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT budget_id_notice_fkey FOREIGN KEY (id_notice)
        REFERENCES public.notice (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.budget
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.budget_file
(
    id_budget integer NOT NULL,
    id_file integer NOT NULL,
    CONSTRAINT budget_file_id_budget_fkey FOREIGN KEY (id_budget)
        REFERENCES public.budget (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT budget_file_id_file_fkey FOREIGN KEY (id_file)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.budget_file
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.service_status
(
    id serial NOT NULL,
    name character(150) NOT NULL,
    CONSTRAINT service_status_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.service_status
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.service_priority
(
    id serial NOT NULL,
    name character(150) NOT NULL,
    CONSTRAINT service_priority_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.service_priority
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.service
(
    id serial NOT NULL,
    title character(250) NOT NULL,
    description character(500),
    id_client integer NOT NULL,
    id_agent integer,
    id_priority integer,
    notice_date date,
    expected_date date,
    finish_date date,
    id_address integer,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    creation_user_id integer,
    id_budget integer,
    CONSTRAINT service_pkey PRIMARY KEY (id),
    CONSTRAINT service_creation_user_id_fkey FOREIGN KEY (creation_user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT service_id_address_fkey FOREIGN KEY (id_address)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT service_id_agent_fkey FOREIGN KEY (id_agent)
        REFERENCES public.agent (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT service_id_budget_fkey FOREIGN KEY (id_budget)
        REFERENCES public.budget (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT service_id_client_fkey FOREIGN KEY (id_client)
        REFERENCES public.client (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT service_id_priority_fkey FOREIGN KEY (id_priority)
        REFERENCES public.service_priority (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.service
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.service_file
(
    id_service integer NOT NULL,
    id_file integer NOT NULL,
    CONSTRAINT service_file_id_file_fkey FOREIGN KEY (id_file)
        REFERENCES public.file (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT service_file_id_service_fkey FOREIGN KEY (id_service)
        REFERENCES public.service (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.service_file
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.service_person_contact
(
    id_service integer NOT NULL,
    id_person_contact integer NOT NULL,
    CONSTRAINT service_person_contact_id_person_contact_fkey FOREIGN KEY (id_person_contact)
        REFERENCES public.person_contact (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT service_person_contact_id_service_fkey FOREIGN KEY (id_service)
        REFERENCES public.service (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

ALTER TABLE IF EXISTS public.service_person_contact
    OWNER to admin;


-- Data
INSERT INTO public.role(id, name, description) VALUES (1, 'Admin', null);
INSERT INTO public."user"(id, id_role, name, username, password) VALUES (1, 1, 'admin', 'admin', '$2b$10$L5Dd.LA6Un8YZerq2nAed.L8MARYB1HDTL6Cf9tD3qe3cWXBe4eG2')
