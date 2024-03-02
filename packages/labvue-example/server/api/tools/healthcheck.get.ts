import ping from 'ping'
import { z } from 'zod'
const healthchecks = [
    { ip: '10.0.100.1', name: 'router' },
    { url: 'https://yacht.sh', name: 'Yacht Homepage' },
    { url: 'https://google.com', name: 'Google' },
    { ip: '1.1.1.1', name: 'cloudflare' },
    { ip: '192.0.2.24', name: 'down example' }
]

export default defineEventHandler<{ query: { interval: number } }>(async (event) => {
    const test = getQuery(event)
    const { interval } = await getValidatedQuery(event, (interval) => z.object({ interval: z.coerce.number() }).parse(interval))
    const { close, send } = useServerSSE(event, "sse:containerStats")
    const checkTimers: Timer[] = []
    const _interval = interval * 1000
    healthchecks.map(
        async ({ name, ip, url }): Promise<void> => {
            pingHost(name, send, undefined, url, ip)
            const intervalID = setInterval((handler) => pingHost(name, send, handler, url, ip), _interval)
            checkTimers.push(
                intervalID
            )
        }

    )
    event.node.req.on("close", () => {
        checkTimers.map((id) => clearInterval(id))
        close()
    })
})

const pingHost = async (name: string, send: (callback: (id: number) => any) => void, handler?: any, url?: string, ip?: string) =>
    ping.promise.probe(url?.replace('http://', '').replace('https://', '') || ip || 'google.com', { timeout: 5 })
        .then((response) => {
            send(() => ({ name, status: 'available', ...response }))
        })
        .catch((e) => {
            send(() => ({ name, status: 'unavailable', error: e }))
            if (handler) clearInterval(handler)
        })