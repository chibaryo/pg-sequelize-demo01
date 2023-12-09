import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'
import { Prefecture } from '$lib/server/postgres/models/Prefecture'
// https://qiita.com/ksh-fthr/items/7bc66911fd5c7506deeb
// Model Sync
await Prefecture.sync({ force: true })
