import { checkConfig } from '../utils/config'

// Loading the config on initialization so we can make sure settings are applied on startup.
export default defineNitroPlugin(async (nitroApp) => {
    console.log('initializing config module...')
    await checkConfig()
    console.log('config module initialized.')
})