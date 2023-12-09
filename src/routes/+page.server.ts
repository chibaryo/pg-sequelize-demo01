import type { PageServerLoad, Actions } from './$types'

// https://sequelize.org/docs/v6/core-concepts/model-basics/
import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'

export const load = (async ({ params }) => {
  // Do something
  // pg - sequelize

  try {
    await dbConfig.authenticate()
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error (err)
  }

  // const resp = await 
  return { newpost: JSON.stringify({}) }
}) satisfies PageServerLoad

export const actions = {
  default: async ({ request }) => {

    return { added: JSON.stringify({}) }
  }
} satisfies Actions
