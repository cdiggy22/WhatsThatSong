\echo 'Delete and recreate lyrics db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lyrics;
CREATE DATABASE lyrics;
\connect lyrics

\i lyrics-schema.sql
\i lyrics-seed.sql

\echo 'Delete and recreate lyrics_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lyrics_test;
CREATE DATABASE lyrics_test;
\connect lyrics_test

\i lyrics-schema.sql
