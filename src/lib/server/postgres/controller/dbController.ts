// https://qiita.com/ksh-fthr/items/7bc66911fd5c7506deeb

import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'
import { dbInit } from '$lib/server/postgres/plugins/dbinit'
import { Prefecture } from '$lib/server/postgres/models/Prefecture'
import type { PrefectureType } from '$lib/server/postgres/models/Prefecture'

// Model Sync
await Prefecture.sync()

export const getAllPrefecture = async () => {
  try {
    await dbInit ()
    return await Prefecture.findAll()
  } catch (err) {
    console.error (err)
  }
}

export const createPrefecture = async (pref: PrefectureType) => {
  try {
    await dbInit ()
    return await Prefecture.create({
      name: pref.name,
      prefCapital: pref.prefCapital
    })

  } catch (err) {
    console.error (err)
  }
}