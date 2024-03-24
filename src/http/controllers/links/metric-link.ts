import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeMetricsLink } from '../../../use-cases/links/factories/make-metrics-link'
import { LinkNotFoundError } from '../../../use-cases/links/errors/link-not-found-error'

export async function metricsLink(req: FastifyRequest, rep: FastifyReply) {
  const paramsSchema = z.object({
    code: z.string(),
  })

  const { code } = paramsSchema.parse(req.params)

  const metricsLink = makeMetricsLink()

  const userId = req.user?.sub
  try {
    const { updatedAt, visits, createdAt } = await metricsLink.execute({
      code,
      userId,
    })

    return rep.status(200).send({ visits, updatedAt, createdAt })
  } catch (error) {
    if (error instanceof LinkNotFoundError) {
      return rep.status(404).send({ message: 'Link not found' })
    }
    throw error
  }
}
