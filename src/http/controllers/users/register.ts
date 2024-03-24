import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeRegisterUser } from '../../../use-cases/users/factories/make-register'
import { UserAlreadyExistsError } from '../../../use-cases/users/errors/user-already-exists-error'

export async function registerUser(req: FastifyRequest, rep: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = bodySchema.parse(req.body)

  try {
    const registerUser = makeRegisterUser()

    await registerUser.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }

    throw err
  }

  rep.status(201).send()
}
