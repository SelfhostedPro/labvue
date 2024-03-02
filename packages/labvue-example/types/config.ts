import { z } from 'zod'

export const configSchema = z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    auth: z.boolean()
})

export type Config = z.infer<typeof configSchema>

export const defaultConfig: Config = {
    name: 'Labvue UI',
    subtitle: 'Create apps easily with labvue',
    auth: true
}