import { z } from 'zod'

export const HealthcheckSchema = z.object({
    name: z.string(),
    url: z.string(),
    ip: z.string()
}).refine(({ url, ip }) => !url && !ip ? false : true, { message: 'Either URL or IP needs to have a value.' })

export type Healthcheck = z.infer<typeof HealthcheckSchema>