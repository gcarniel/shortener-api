import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeAuthenticateUser } from '../../../use-cases/users/factories/make-authenticate'
import { InvalidCredentialsError } from '../../../use-cases/users/errors/invalid-credentials-error'

export async function authenticateUser(req: FastifyRequest, rep: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodySchema.parse(req.body)

  try {
    const authenticateUser = makeAuthenticateUser()

    const { user } = await authenticateUser.execute({
      email,
      password,
    })

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    rep.status(200).send({
      access_token: token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}
