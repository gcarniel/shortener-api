import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(req: FastifyRequest, rep: FastifyReply) {
  try {
    if (!req.headers.authorization) {
      throw new Error()
    }

    await req.jwtVerify()
  } catch (err) {
    return rep.status(401).send({ message: 'Unauthorized' })
  }
}
