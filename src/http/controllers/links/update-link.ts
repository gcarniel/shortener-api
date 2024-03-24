import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LinkNotFoundError } from '../../../use-cases/links/errors/link-not-found-error'
import { makeUpdateLink } from '../../../use-cases/links/factories/make-update-link'
import { UserNotFoundError } from '../../../use-cases/users/errors/user-not-found-error'

export async function updateLink(req: FastifyRequest, rep: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const bodySchema = z.object({
    url: z.string().url(),
  })

  try {
    const { id } = paramsSchema.parse(req.params)

    const { url } = bodySchema.parse(req.body)

    const updateLink = makeUpdateLink()

    const { link } = await updateLink.execute({
      id,
      userId: req.user?.sub,
      url,
    })

    return rep.status(200).send({ link })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return rep.status(404).send({ message: 'User not found' })
    }
    if (error instanceof LinkNotFoundError) {
      return rep.status(404).send({ message: 'Link not found' })
    }
    throw error
  }
}
