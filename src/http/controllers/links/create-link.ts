import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateLinkUseCase } from '../../../use-cases/links/create-link'
import { PrismaLinksRepository } from '../../../repositories/prisma/prisma-links-repository'
import z from 'zod'

export async function createLink(req: FastifyRequest, rep: FastifyReply) {
  const bodySchema = z.object({
    url: z.string().url(),
  })

  const { url } = bodySchema.parse(req.body)

  const linksRepository = new PrismaLinksRepository()
  const createLink = new CreateLinkUseCase(linksRepository)
  const { link } = await createLink.execute({ url })

  return rep.status(201).send({ link })
}
