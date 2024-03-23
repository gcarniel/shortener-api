import { FastifyInstance } from 'fastify'
import { registerUser } from './register-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/users', registerUser)
}
