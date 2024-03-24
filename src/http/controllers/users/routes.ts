import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { userProfile } from './profile'
import { registerUser } from './register'
import { authenticateUser } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/users', registerUser)
  app.post('/api/auth', authenticateUser)

  app.get('/api/profile', { onRequest: [verifyJwt] }, userProfile)
}
