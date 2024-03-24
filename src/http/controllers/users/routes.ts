import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { userProfile } from './profile-controller'
import { registerUser } from './register-controller'
import { authenticateUser } from './authenticate-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/users', registerUser)
  app.post('/api/auth', authenticateUser)

  app.get('/api/profile', { onRequest: [verifyJwt] }, userProfile)
}
