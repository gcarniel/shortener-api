import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeListLinks } from '../../../use-cases/links/factories/make-list-links'
import { UserNotFoundError } from '../../../use-cases/users/errors/user-not-found-error'

export async function listLinks(req: FastifyRequest, rep: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(10),
  })

  const { page, pageSize } = querySchema.parse(req.query)

  const userId = req.user?.sub
  const listLinks = makeListLinks()

  const params = {
    page,
    pageSize,
  }

  try {
    const resp = await listLinks.execute({ userId, params })

    return rep.status(200).send({
      page: resp.page,
      pages: resp.pages,
      count: resp.count,
      data: resp.data,
    })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return rep.status(404).send({ message: 'User not found' })
    }
    throw error
  }
}
