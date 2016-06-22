/**
 * @module CLI
 */

const EventEmitter = require('events')
const GA = require('universal-analytics')
const ArgumentParser = require('argparse').ArgumentParser
const reduce = require('lodash.reduce')
const pkg = require('../package.json')
let Spike = require('spike-core') // mocked in tests
let analytics

/**
 * @class CLI
 * @classdesc Controls and parses command line interface logic
 * @extends EventEmitter
 */
module.exports = class CLI extends EventEmitter {
  constructor () {
    super()

    const uid = Spike.globalConfig().id // mocked in tests
    analytics = new GA('UA-79663181-1', uid, { strictCidFormat: false })

    this.parser = new ArgumentParser({
      version: pkg.version,
      description: pkg.description,
      addHelp: true
    })

    this.sub = this.parser.addSubparsers()

    this.addCompile()
    this.addWatch()
    this.addClean()
    this.addNew()
    this.addTemplate()
  }

  /**
   * Executes a command using the CLI parser.
   * @param {Array|String} args - a string or array representing a command
   * @return {CLI} returns itself, which is an event emitter
   */
  run (args) {
    if (typeof args === 'string') { args = args.split(' ') }
    args = this.parser.parseArgs(args)

    // argparse uses `null` which doesn't get along with joi, so we remove
    // null values here
    args = reduce(args, (m, v, k) => { if (v) m[k] = v; return m }, {})

    // anonymous analytics for usage data
    analytics.event({ ec: 'cmd', ea: args.fn, ev: JSON.stringify(args) }).send()

    const fn = require(`./${args.fn}`)
    delete args.fn

    // all CLI modules must return an event emitter of some sort
    // they should also wait to execute anything until nextTick
    const emitter = fn(Spike, args)

    // standard events
    emitter.on('error', this.emit.bind(this, 'error'))
    emitter.on('warning', this.emit.bind(this, 'warning'))
    emitter.on('success', this.emit.bind(this, 'success'))
    emitter.on('info', this.emit.bind(this, 'info'))

    // instance-method-specific
    emitter.on('compile', (res) => {
      analytics.event({ ec: 'core', ea: 'compile' }).send()
      this.emit('compile', res)
    })
    emitter.on('remove', this.emit.bind(this, 'success'))

    return this
  }

  addCompile () {
    const s = this.sub.addParser('compile', {
      help: 'Compile a spike project'
    })

    s.addArgument(['path'], {
      nargs: '?',
      defaultValue: process.cwd(),
      help: 'Path to a project that you would like to compile'
    })

    s.addArgument(['--env', '-e'], {
      help: 'Name of the environment you\'d like to use'
    })

    s.setDefaults({ fn: 'compile' })
  }

  addWatch () {
    const s = this.sub.addParser('watch', {
      help: 'Watch a spike project and compile any time there are changes to a file'
    })

    s.addArgument(['path'], {
      nargs: '?',
      defaultValue: process.cwd(),
      help: 'Path to a project that you would like to compile'
    })

    s.addArgument(['--port', '-p'], {
      type: Number,
      help: 'Port you want to run the local server on (default 1111)'
    })

    s.addArgument(['--env', '-e'], {
      help: 'Name of the environment you\'d like to use'
    })

    s.setDefaults({ fn: 'watch' })
  }

  addClean () {
    const s = this.sub.addParser('clean', {
      help: 'Removes the output directory of a spike project'
    })

    s.addArgument(['path'], {
      nargs: '?',
      defaultValue: process.cwd(),
      help: 'Path to a project that you would like to remove'
    })

    s.setDefaults({ fn: 'clean' })
  }

  addNew () {
    const s = this.sub.addParser('new', {
      help: 'Creates a new spike project from a template'
    })

    s.addArgument(['path'], {
      help: 'Where to create your project'
    })

    s.addArgument(['--template', '--tpl', '-t'], {
      help: 'The template to use for your project. See "spike tpl" for more.'
    })

    s.addArgument(['--overrides', '-o'], {
      type: keyVal,
      help: "Pass information directly to the template without answering questions. Accepts a quoted comma-separated key-value list, like 'a: b, c: d'"
    })

    s.setDefaults({ fn: 'new' })
  }

  addTemplate () {
    const main = this.sub.addParser('template', {
      aliases: ['tpl'],
      help: 'Manage spike project templates'
    })
    const sub = main.addSubparsers()
    let s

    // add

    s = sub.addParser('add', {
      aliases: ['install'],
      help: 'Add a project template'
    })

    s.addArgument(['name'], {
      help: 'Name of the template'
    })

    s.addArgument(['src'], {
      help: 'Url that can be git-clone\'d to download the template'
    })

    s.setDefaults({ fn: 'template/add' })

    // remove

    s = sub.addParser(['remove'], {
      help: 'Remove an existing template'
    })

    s.addArgument(['name'], {
      help: "Name of the template you'd like to remove"
    })

    s.setDefaults({ fn: 'template/remove' })

    // list

    s = sub.addParser(['list'], {
      help: 'List all of the templates you have installed'
    })

    s.setDefaults({ fn: 'template/list' })

    // default

    s = sub.addParser(['default'], {
      help: 'Make a certain template your default'
    })

    s.addArgument(['name'], {
      help: "Name of the template you'd like to make the default"
    })

    s.setDefaults({ fn: 'template/default' })

    // reset

    s = sub.addParser(['reset'], {
      help: 'Reset all existing information about templates'
    })

    s.setDefaults({ fn: 'template/reset' })
  }
}

/**
 * A simple csv-like string to object parser. Takes in "foo: bar, baz: quux",
 * and outputs a javascript object.
 * @param {String} str - input string
 * @return {Object} javascript object output
*/
function keyVal (str) {
  return str.split(',').reduce((m, i) => {
    const s = i.split(':').map((i) => i.trim())
    m[s[0]] = s[1]
    return m
  }, {})
}
