# Spike

[![version](https://img.shields.io/npm/v/spike.svg?style=flat)](https://www.npmjs.com/package/spike) [![tests](http://img.shields.io/travis/static-dev/spike/master.svg?style=flat)](https://travis-ci.org/static-dev/spike) [![dependencies](http://img.shields.io/david/static-dev/spike.svg?style=flat)](https://david-dm.org/static-dev/spike) [![coverage](https://img.shields.io/coveralls/static-dev/spike.svg?style=flat)](https://coveralls.io/github/static-dev/spike?branch=master) [![chat](https://img.shields.io/gitter/room/static-dev/spike.svg)](http://gitter.im/static-dev/spike)

A modern static build tool, powered by [webpack](http://webpack.github.io)

## What is Spike?

[We](https://github.com/carrot) [:heart:](http://giphy.com/gifs/steve-carell-cute-the-office-Yb8ebQV8Ua2Y0/tile) [static](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/).

If you're building a website or client-side app – then :cactus: spike is probably for you. Spike aims to be simple, efficient, and a pleasure to use.

Spike certainly is not the only [static site generator](https://www.staticgen.com/) out there, but in our opinion, it's the most powerful and easiest to use.

Spike's default stack is built on plugin-based architecture which defaults to syntax based on official specs for the future of html, css, and javascript. Out of the box, Spike is based on:

- [reshape](https://github.com/reshape/reshape) for markup
- [babel](https://babeljs.io/) for JS and JS transforms
- [postcss](https://github.com/postcss/postcss) for CSS transforms
- [webpack](http://webpack.github.io) as the core compiler

It is also able to integrate any webpack loader and plugin, making it possible to use any other language and configuration you want.

### Features

- Easy configuration via [the `app.js` file](https://spike.readme.io/docs/appjs)
- Integration with [Webpack's](https://github.com/webpack/webpack) massive plugin/loader ecosystem
- Support for ES6 in your site's JS via [Babel](http://babeljs.io/)
- Semantic transformations your html and css with [postcss](http://postcss.org/) and [reshape](http://reshape.ml/)
- Breezy local development powered by [Browsersync](https://browsersync.io/)
- Selective compile in `watch` mode :zap:
- Support for [multiple environments](https://spike.readme.io/docs/environments)
- Interactive Project Starters via [sprout](https://github.com/carrot/sprout)
- [Spike Plugins](https://www.npmjs.com/browse/keyword/spikeplugin) for common integrations

## Installation

- `npm install spike -g`
- `spike new <projectname>`

> **NOTE:** You must be using >= node v6.0.0 in order for Spike to work!

## Usage

Spike can operate through either a javascript API or a CLI interface. This project is just the command line interface, for more information on the js api, check out [spike-core](https://github.com/static-dev/spike-core).

To read all about how spike works, check out [our documentation](https://spike.readme.io/docs)

For information on how to use the command line interface, check [the CLI section](https://spike.readme.io/docs/command-line-interface)

## Analytics

In order to continue improving Spike, we collect anonymous usage data from anyone using the command line tool. This data is important to us because it helps us to know which features are important to users. It also helps us to convince our sponsors about how great this project is and how many people are relying on it, so that its development can continue to be funded. Here's a breakdown of the data we collect:

- A randomly generated unique id for each spike install
- Any time a spike command is run, the contents of that command (for example `spike watch -e production` would record "watch -e production")
- Any time a spike site is compiled, only the fact that a compile has run

We use this data specifically to keep tabs on how frequently spike's various features are being used so that we can better prioritize issues and upgrades, and to show our "total compiles" number, which is typically a large and impressive number, to our sponsors, and they can then be wowed by how awesome and popular this project is. That's it!

We want to make it clear that no private information is being collected at all here, and that all information collected is 100% anonymous, and tagged only to an entirely randomly generated id. However, if you would like to opt-out and ensure that analytics are not sent, you can run `spike analytics disable`, and no further information will be collected.
