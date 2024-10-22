\echo 'Delete and recreate trip_planner db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE trip_planner;
CREATE DATABASE trip_planner;
\connect trip_planner

\i trip_planner-schema.sql
\i trip_planner-seed.sql
