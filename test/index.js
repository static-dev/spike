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

SpikeMock.template = {
  add: (opts) => {
    opts.emitter.emit('success', opts)
  },
  remove: (opts) => {
    opts.emitter.emit('success', opts)
  },
  default: (opts) => {
    opts.emitter.emit('success', opts)
  },
  list: (opts) => {
    opts.emitter.emit('success', opts)
  },
  reset: () => {
    return true
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
  t.plan(5)

  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('info', (opts) => {
    t.truthy(opts.root)
    t.truthy(opts.emitter)
    t.truthy(opts.locals)
    t.falsy(opts.template)
  })
  cli.on('success', (res) => {
    t.truthy(res.match(/project created at.*test/))
    t.end()
  })

  cli.run('new test -o foo:bar')
})

test.cb('new with template option', (t) => {
  t.plan(2)

  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('info', (opts) => {
    t.truthy(opts.template)
  })
  cli.on('success', (res) => {
    t.truthy(res.match(/project created at.*test/))
    t.end()
  })

  cli.run('new test -t foo')
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

test.cb('add', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('success', (res) => {
    t.truthy(res.name === 'foo')
    t.truthy(res.src === 'http://github.com/foo/foo')
    t.truthy(res.emitter)
    t.end()
  })

  cli.run('tpl add foo http://github.com/foo/foo')
})

test.cb('remove', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('success', (res) => {
    t.truthy(res.name === 'foo')
    t.truthy(res.emitter)
    t.end()
  })

  cli.run('tpl remove foo')
})

test.cb('default', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('success', (res) => {
    t.truthy(res.name === 'foo')
    t.truthy(res.emitter)
    t.end()
  })

  cli.run('tpl default foo')
})

test.cb('list', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('success', (res) => {
    t.truthy(res.emitter)
    t.end()
  })

  cli.run('tpl list')
})

test.cb('reset', (t) => {
  cli.on('error', t.end)
  cli.on('warning', t.end)
  cli.on('success', (res) => {
    t.truthy(res === 'settings and templates reset')
    t.end()
  })

  cli.run('tpl reset')
})
