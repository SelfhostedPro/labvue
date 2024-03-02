import { watchConfig, type ConfigWatcher } from 'c12'
import { stringifyYAML } from 'confbox'
import { outputFile, exists } from 'fs-extra'
import { resolve } from 'path'
import { ZodError } from 'zod'

// Importing from relative dir so the user can change these easily.
import { defaultConfig, configSchema, Config } from '~/types/config'


// Watching the config file to auto reload changes.
export const _config = watchConfig({
    // If running in production (which the docker container does), 
    // then check a directory above where we're running in order to have 
    // the config at /config in the docker container for easy mounting.
    cwd: process.env.NODE_ENV === 'production' ? '../config' : './config',
    configFile: 'config.yaml',
    chokidarOptions: { ignoreInitial: false },
    defaults: defaultConfig,

    // TODO: find a way we can have users extend these functions.
    // These don't seem to work well during development but custom logic can be implemented in order to manage these.
    onWatch: ({ path, type }) => {
        console.log(`Config ${type} at ${path}`)
        if (type === 'removed') {
            checkConfig()
        }
    },
    onUpdate: ({ getDiff }) => {
        console.log(getDiff())
    }
})

export const useConfig = async () => {
    return await _config
}

export const updateConfig = async (config: Config, path: string) => {
    // Validate the config before writing it.
    try {
        configSchema.parse(config) as Config
        outputFile(resolve(path, 'config.yaml'), stringifyYAML(config, { indent: 2 }), { encoding: 'utf8' })
    } catch (e) {
        if (e instanceof ZodError) {
            throw createError({ ...e })
        } else {
            throw createError('unknown error writing config.')
        }
    }
}

// Check to make sure the config exists. If it doesn't write a new default one.
export const checkConfig = async () => {
    const config = await useConfig()
    if (!config.cwd) throw createError(`No directory defined for config`)
    const configExists = await exists(resolve(config.cwd, 'config.yaml'))
    if (!configExists) {
        console.log(`No config exists at ${config.cwd}, creating default config.`)
        updateConfig(defaultConfig, config.cwd)
    } else {
        try {
            // If the config exists, validate it.
            configSchema.parse(config.config) as Config
            console.log(`Valid config exists at ${config.cwd}.`)
        } catch (e) {
            if (e instanceof ZodError) {
                // If it's not valid, write a fresh one and throw an error.
                updateConfig(defaultConfig, config.cwd)
                throw createError({ ...e })
            } else {
                throw createError('unknown error validating config.')
            }
        }
    }
}