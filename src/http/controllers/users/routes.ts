import { FastifyInstance } from 'fastify'
import { registerUser } from './register-controller'
import { authenticateUser } from './authenticate-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/users', registerUser)
  app.post('/api/auth', authenticateUser)
}
