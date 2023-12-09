import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'
import { Prefecture } from '$lib/server/postgres/models/Prefecture'

// Model Sync
await Prefecture.sync({ force: true })
