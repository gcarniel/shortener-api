import z from 'zod'

const schema = z.object({
  url: z.string().url(),
})

export function isValidUrl(url: string): boolean {
  try {
    schema.parse({ url })
    return true
  } catch {
    return false
  }
}
