import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'

class Prefecture extends Model {}

export interface PrefectureType {
//  id: number
  name: string
  prefCapital: string
}

Prefecture.init({
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
//    autoIncrement: true,
    allowNull: false
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
