import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwtOptionalUser(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  try {
    if (!req.headers.authorization) return

    await req.jwtVerify()
  } catch (err) {
    console.log(err)
    return rep.status(401).send({ message: 'Unauthorized' })
  }
}
