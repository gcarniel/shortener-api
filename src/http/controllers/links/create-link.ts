import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateLink } from '../../../use-cases/links/factories/make-create-link'
import { InvalidUrlError } from '../../../use-cases/links/errors/invalid-url-error'

export async function createLink(req: FastifyRequest, rep: FastifyReply) {
  const bodySchema = z.object({
    url: z.string().url(),
  })

  const { url } = bodySchema.parse(req.body)

  const createLink = makeCreateLink()

  const userId = req.user?.sub
  try {
    const { link } = await createLink.execute({ url, userId })

    return rep.status(201).send({ link })
  } catch (error) {
    if (error instanceof InvalidUrlError) {
      return rep.status(400).send({ message: 'Invalid url' })
    }

    throw error
  }
}
