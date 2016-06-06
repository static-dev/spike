const EventEmitter = require('events')

module.exports = function (Spike, args) {
  const emitter = new EventEmitter()
  process.nextTick(() => {
    Spike.template.reset()
    emitter.emit('success', 'settings and templates reset')
  })
  return emitter
}
