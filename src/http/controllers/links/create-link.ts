import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateLink } from '../../../use-cases/links/factories/make-create-link'

export async function createLink(req: FastifyRequest, rep: FastifyReply) {
  const bodySchema = z.object({
    url: z.string().url(),
  })

  const { url } = bodySchema.parse(req.body)

  const createLink = makeCreateLink()

  const userId = req.user?.sub
  const { link } = await createLink.execute({ url, userId })

  return rep.status(201).send({ link })
}
