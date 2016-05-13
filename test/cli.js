const rewire = require('rewire')
const {EventEmitter} = require('events')
const test = require('ava')
let CLI = rewire('..')

let cli
let mock

// mock so that this only tests the CLI interface, not the spike tasks
class SpikeMock extends EventEmitter {
  constructor (opts) {
    super()
    this.opts = opts
    this.config = {}
    this.config.context = 'test'
    mock = this
  }

  compile () {
    this.emit('compile', 'compile mock')
  }

  watch () {
    this.emit('compile', 'watch mock')
  }

  static new (opts) {
    opts.emitter.emit('info', opts)
    opts.emitter.emit('done', new this())
  }
}

test.beforeEach((t) => {
  CLI.__set__('Spike', SpikeMock)
  cli = new CLI()
})

test.cb('compile', (t) => {
  t.truthy(cli)

  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('compile', (res) => {
    t.is(res, 'compile mock')
    t.end()
  })

  cli.run('compile')
})

test.cb('compile with env option', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('compile', (res) => {
    t.is(mock.opts.env, 'production')
    t.end()
  })

  cli.run('compile -e production')
})

test.cb('new', (t) => {
  t.plan(4)

  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('info', (opts) => {
    t.truthy(opts.root)
    t.truthy(opts.emitter)
    t.truthy(opts.overrides)
  })
  cli.on('success', (res) => {
    t.truthy(res.match(/project created at.*test/))
    t.end()
  })

  cli.run('new test -o foo:bar')
})

test.cb('watch', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('compile', (res) => {
    t.is(res, 'watch mock')
    t.end()
  })

  cli.run('watch')
})

test.cb('watch with env option', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('compile', (res) => {
    t.is(mock.opts.env, 'production')
    t.end()
  })

  cli.run('watch -e production')
})
