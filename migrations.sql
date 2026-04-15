-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.folios (
  code text,
  age bigint,
  folio_id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  CONSTRAINT folios_pkey PRIMARY KEY (folio_id),
  CONSTRAINT folios_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);