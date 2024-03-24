import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUserProfile } from '../../../use-cases/users/factories/make-user-profile'

export async function userProfile(req: FastifyRequest, rep: FastifyReply) {
  const getUserProfile = makeUserProfile()

  const { user: userProfile } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = userProfile

  rep.status(200).send({
    user,
  })
}
