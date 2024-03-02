// Using our own error handler in order to enable custom styling and logic.
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('error', (error, { event }) => {
        console.error(`${event?.path} Application error:`, error)
        event?.handled ? true : undefined
        return
    })
})