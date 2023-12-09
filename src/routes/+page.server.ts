import type { PageServerLoad, Actions } from './$types'

// https://sequelize.org/docs/v6/core-concepts/model-basics/
import { Sequelize, DataTypes, Model } from 'sequelize'
import { dbConfig } from '$lib/server/postgres/plugins/dbinit'
import { dbInit } from '$lib/server/postgres/plugins/dbinit'
import * as dbController from '$lib/server/postgres/controller/dbController'

export const load = (async ({ params }) => {
  // Do something
  // pg - sequelize
  const resp = await dbController.getAllPrefecture()

  // const resp = await 
  return { posts: JSON.stringify(resp) }
}) satisfies PageServerLoad

export const actions = {
  addpref: async ({ request }) => {
    const data = await request.formData()
    const name = data.get('name')?.toString() ?? ''
    const prefCapital = data.get('prefCapital')?.toString() ?? ''

    const resp = await dbController.createPrefecture({
      name: name,
      prefCapital: prefCapital
    })

    return { added: JSON.stringify({}) }
  }
} satisfies Actions
