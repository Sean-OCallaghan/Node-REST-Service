#!/bin/bash

su - db2inst1 -c "db2 connect to ${DBNAME}"
su - db2inst1 -c "db2 -tvf /var/custom/init.sql"
su - db2inst1 -c "db2 connect reset"