import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'

class Prefecture extends Model {}

Prefecture.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prefCapital: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: dbConfig,
  modelName: 'Prefecture'
})

export { Prefecture }
