// a4fd65ad-6a18-42e0-b590-f121b2171ce5

import type { RequestHandler } from './$types'
import * as dbController from '$lib/server/postgres/controller/dbController'

export const GET = (async ({ params }) => {
  const uuid = params.uuid
  const response = await dbController.getPrefectureByUuid(uuid)

  return new Response(JSON.stringify(
    {
      message: 'Ok',
      post: response
    }
  ))
}) satisfies RequestHandler

export const DELETE = (async ({ params, request }) => {
	const uuid = params.uuid

  const response = await dbController.deletePrefectureByUuid(uuid)

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			deleted: response
		}
  ))
}) satisfies RequestHandler
