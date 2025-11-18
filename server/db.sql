/* This is the single, fixed SQL file. 
  It cleans up old tables and creates the new, correct tables.
  Run this one file to fix your database.
*/

-- STEP 1: Clean up any old tables (Drops them in the correct order)
-- We use "IF EXISTS" so this command never fails.

-- DROP TABLE IF EXISTS temphint;
-- DROP TABLE IF EXISTS hint;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS question;


-- STEP 2: Create the tables in the correct order (Parents first)

-- Create 'users' table (no dependencies)
CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL CHECK (name <> ''), 
  email VARCHAR(255) NOT NULL CHECK (email <> ''), 
  password VARCHAR(512) NOT NULL CHECK (password <> ''), 
  username VARCHAR(255) NOT NULL CHECK (username <> ''),
  handle VARCHAR(255),
  color VARCHAR(25)
);

-- Create 'question' table (no dependencies)
CREATE TABLE question (
  qid SERIAL PRIMARY KEY, 
  qlink1 VARCHAR(255) NOT NULL CHECK (qlink1 <> ''), 
  qlink2 VARCHAR(255) NOT NULL, 
  platform VARCHAR(255) NOT NULL CHECK (platform <> ''), 
  qname VARCHAR(255) NOT NULL CHECK (qname <> '')
);


-- STEP 3: Create the 'child' tables that depend on 'users' and 'question'

-- Create 'hint' table
CREATE TABLE hint(
  hid SERIAL PRIMARY KEY, 
  hints TEXT[] CHECK (
    array_length(hints, 1) >= 2 
    AND hints[1] <> '' 
    AND hints[2] <> ''
  ), 
  upvote INTEGER CHECK (upvote >= 0), 
  downvote INTEGER CHECK (downvote >= 0), 
  uid INTEGER NOT NULL, 
  qid INTEGER NOT NULL, 
  FOREIGN KEY (uid) REFERENCES users(id), 
  FOREIGN KEY (qid) REFERENCES question(qid)
);

-- Create 'temphint' table (with the missing 'qid' column added)
CREATE TABLE temphint(
  thid SERIAL PRIMARY KEY, 
  hints TEXT[] CHECK (
    array_length(hints, 1) >= 2 
    AND hints[1] <> '' 
    AND hints[2] <> ''
  ), 
  uid INTEGER NOT NULL, 
  qlink VARCHAR(255) NOT NULL CHECK (qlink <> ''), 
  qid INTEGER NULL, -- <-- This was the missing bug
  FOREIGN KEY (uid) REFERENCES users(id),
  FOREIGN KEY (qid) REFERENCES question(qid)
);