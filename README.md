# Novicell Nuxt (SPA + CMS) CLI tool

Tool that helps frontend developers to initialize SPA or SSR projects faster on CMS.

## Auto initialization tests: [![Build Status](https://travis-ci.com/Novicell/novicell-cli.svg?branch=master)](https://travis-ci.com/Novicell/novicell-cli)

## Installation

### Use Node Version `10.16.0` or later.

Can either be installed globally or used with NPX

```bash
    npx @novicell/cli <command>
    # Or
    npm install -g @novicell/cli
```

## Commands

```bash
    npx @novicell/cli init # Inits the project with selected options
    npx @novicell/cli add # Adds selected features to an existing project
    # Or if installed globally
    novicell-cli init
    novicell-cli add
```

## Flags

If you're tired of UI's, get job done with flags

```bash
    -h, --help     output usage information # can be used after cmds, e.g. init --help

    # init
        -d, --default  # Default structure declared by Novicell
        -m, --manual   # Setup nuxt settings manually
        -t, --test     # ONLY for testing. Mounts Novicell default SPA on newest Nuxt app
```

## Extra usage documentation

[Deploy tools](src/@commands/add/deploy_tools/README.md)
