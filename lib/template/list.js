const EventEmitter = require('events')

module.exports = function(Spike, args) {
  const emitter = new EventEmitter()
  const e2 = new EventEmitter()
  process.nextTick(() => {
    emitter.on('success', res => {
      e2.emit('success', 'Your Templates:\n- ' + Object.keys(res).join('\n- '))
    })
    Spike.template.list(Object.assign(args, { emitter: emitter }))
  })
  return e2
}
