import { Sequelize } from 'sequelize'
import { PSQL_USER, PSQL_PASSWD, PSQL_DBHOST, PSQL_DBNAME } from '$env/static/private'

export const dbConfig = new Sequelize(`postgres://${PSQL_USER}:${PSQL_PASSWD}@${PSQL_DBHOST}/${PSQL_DBNAME}`)
