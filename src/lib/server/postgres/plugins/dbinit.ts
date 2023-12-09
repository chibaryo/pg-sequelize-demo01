import { Sequelize } from 'sequelize'
import { PSQL_USER, PSQL_PASSWD, PSQL_DBHOST, PSQL_DBNAME } from '$env/static/private'

export const dbConfig = new Sequelize(`postgres://${PSQL_USER}:${PSQL_PASSWD}@${PSQL_DBHOST}/${PSQL_DBNAME}`)

export const dbInit = async () => {
  try {
    await dbConfig.authenticate()
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error (err)
  }
}