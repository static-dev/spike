# Spike

[![version](https://img.shields.io/npm/v/spike.svg?style=flat)](https://www.npmjs.com/package/spike) [![tests](http://img.shields.io/travis/static-dev/spike/master.svg?style=flat)](https://travis-ci.org/static-dev/spike) [![dependencies](http://img.shields.io/david/static-dev/spike.svg?style=flat)](https://david-dm.org/static-dev/spike) [![coverage](https://img.shields.io/coveralls/static-dev/spike.svg?style=flat)](https://coveralls.io/github/static-dev/spike?branch=master) [![chat](https://img.shields.io/gitter/room/static-dev/spike.svg)](http://gitter.im/static-dev/spike)

An opinionated static build tool, powered by [webpack](http://webpack.github.io)

## Why should you care?

[We](https://github.com/carrot) [:heart:](http://giphy.com/gifs/steve-carell-cute-the-office-Yb8ebQV8Ua2Y0/tile) [static](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/).

If you're building a website or client-side app – then :cactus: spike is probably for you. Spike aims to be simple, efficient, and a pleasure to use.

Spike certainly is not the only [static site generator](https://www.staticgen.com/) out there, but in our opinion, it's the most powerful and easiest to use.

> Spike is from the same [team](https://github.com/carrot) that brought you [Roots](http://roots.cx). The thinking behind moving past Roots is explained in [this article](https://medium.com/@jescalan/eaa10c75eb22). Please feel free to comment and contribute.

### The Stack

Spike is fairly strict in enforcing a default stack. However, the stack allows for quite a large amount of flexibility as both the css and js parsers are able to accept plugins. Also spike's core compiler is [Webpack](https://github.com/webpack/webpack), so you can customize your project with [loaders](https://webpack.github.io/docs/loaders.html) and [plugins](https://webpack.github.io/docs/plugins.html). The inflexibility of the stack means faster compiles and better stability. We use...

- [reshape](https://github.com/reshape/reshape) for markup
- [babel](https://babeljs.io/) for JS and JS transforms
- [postcss](https://github.com/postcss/postcss) for CSS transforms
- [webpack](http://webpack.github.io) as the core compiler

### Features

- Easy configuration via the `app.js` file
- Integration with [Webpack's](https://github.com/webpack/webpack) massive plugin/loader ecosystem
- Support for ES6 in your site's JS via Babel
- Breezy local development powered by [Browsersync](https://browsersync.io/)
- Turn-key isomorphism (no refresh page loads)
- Selective compile in `watch` mode :zap:
- Support for [multiple environments](#environments)
- Interactive Project Starters via [sprout](https://github.com/carrot/sprout)
- [Spike Plugins](https://www.npmjs.com/browse/keyword/spikeplugin) for common integrations

## Installation

> **NOTE:** You must be using >= node v6.0.0 in order for Spike to work!

- `npm install spike -g`
- `spike new <projectname>`

## Usage

Spike can operate through either a javascript API or a CLI interface. This project is just the command line interface, for more information on the js api, check out [spike-core](https://github.com/static-dev/spike-core).

To read all about how spike works, check out [our documentation](https://spike.readme.io/docs)

For information on how to use the command line interface, check [the CLI section](https://spike.readme.io/docs/command-line-interface)
