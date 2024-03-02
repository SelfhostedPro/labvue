# labvue

Labvue was created with the goal of establishing an easy to use development platform with modern dependencies and batteries included for most basic selfhosted apps.

## Should I use it

Due to the nature of homelabs/selfhosted applications, you usually want to make it as easy as possible to deploy your app and sometimes that involves working around some limitations such as

1. No reliance on external services
    - This refers to hosted services as well as having to deploy local ones (ie. a Database)
2. Limited internet access
3. User may be newer to managing these types of applications and have limited knowledge

The goal for this is to enable newer developers (or experienced developers with limited time) to easily create good user interfaces and services for users to be able to interact with various things with little minimal server management experience.

## Roadmap

### Implemented

    - Server Sent Events
    - Definable Config (`./config` in the development environment `/config` in the container)
    - Custom Error handling
    - Nav components (app-bar, side-bar)
    - In browser terminal using SSE (many platforms don't have websocket support so it uses SSE and a post request).
    - Data views for Array or Dictionary of Objects.

### WiP

    - Docker container based on [linuxserver.io](https://linuxserver.io) alpine base image.
    - Auth
    - Custom Logging
    - Oauth2
    - Additional data views
    - Charts (realtime and not)
    - Plugin system using [jiti](https://github.com/unjs/jiti)

## Technologies in use

- nuxt 3
  - nuxt 3 layers
- vue 3
- vuetify (ui framework)
- xtermjs (web terminal and communication to backend)
- c12 (config module)
- Server Sent Events

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

This project was created using `bun init` in bun v1.0.28. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
