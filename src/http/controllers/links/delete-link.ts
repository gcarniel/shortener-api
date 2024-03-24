import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeDeleteLink } from '../../../use-cases/links/factories/make-delete-link'
import { LinkNotFoundError } from '../../../use-cases/links/errors/link-not-found-error'
import { UserNotFoundError } from '../../../use-cases/users/errors/user-not-found-error'

export async function deleteLink(req: FastifyRequest, rep: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  try {
    const { id } = paramsSchema.parse(req.params)

    const deleteLink = makeDeleteLink()

    await deleteLink.execute({ id, userId: req.user?.sub })

    return rep.status(204).send()
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
