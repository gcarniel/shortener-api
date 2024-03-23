import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LinkNotFoundError } from '../../../use-cases/links/errors/link-not-found'
import { makeVisitLink } from '../../../use-cases/links/factories/make-visit-link'

export async function visitLink(req: FastifyRequest, rep: FastifyReply) {
  const paramsSchema = z.object({
    code: z.string(),
  })

  const { code } = paramsSchema.parse(req.params)

  const visitLink = makeVisitLink()

  try {
    const { link } = await visitLink.execute({ code })

    return rep.redirect(301, link.url)
  } catch (error) {
    if (error instanceof LinkNotFoundError) {
      return rep.status(404).send({ message: 'Link not found' })
    }
    throw error
  }
}
