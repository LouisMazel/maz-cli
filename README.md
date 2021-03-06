# Maz CLI

[![license](https://img.shields.io/github/license/LouisMazel/maz-cli.svg?style=flat-square)](https://github.com/LouisMazel/maz-cli/blob/master/LICENSE)
[![vue 2](https://img.shields.io/badge/vue-2-42b983.svg?style=flat-square)](https://vuejs.org)
[![npm](https://img.shields.io/npm/v/maz-cli.svg?style=flat-square)](https://www.npmjs.com/package/maz-cli)
[![npm](https://img.shields.io/npm/dt/maz-cli.svg?style=flat-square)](https://www.npmjs.com/package/maz-cli)
[![Codacy grade](https://img.shields.io/codacy/grade/3d15a7c11bfe47c69a2aed93cc67cc29.svg?style=flat-square)](https://www.codacy.com/app/LouisMazel/maz-cli)

[![npm](https://nodei.co/npm/maz-cli.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/maz-ui)

> CLI Tool to create Nuxt x Prismic project

## Install

```bash
npm install -g maz-cli
or
# yarn global add maz-cli
```

## Prerequisites

1. Prismic
    - Prismic account & repo created
1. Website public URL or future URL. Can be changed
1. `optionnal` If you want use a client e-mail to use contact form and receive email requests on you email
    - [Mailgun](https://www.mailgun.com/) account:
      - apiKey
      - domain
    - SMTP:
      - host
      - port
      - auth user
      - auth pass

## Create project Nuxt x Prismic

```bash
maz create <app-name>
```

## Features

1. Choose the package manager
    - Yarn
    - Npm
1. Choose your theme colors
    - Primary color (default: `dodgerblue`)
    - Secondary color (default: `gold`)
    - Default dark theme
1. `optionnal` Use contact form & sending contact requests on your e-mail
    - With [Mailgun](https://www.mailgun.com/)
    - Or any SMTP client

## CLI Options

### `--help`

Alias: `-h` --> Show version number and exit

### `--version`

Alias: `-v` --> Show version number and exit

## In comming features

- Multiple languages website
