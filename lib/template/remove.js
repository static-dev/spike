const EventEmitter = require('events')

module.exports = function (Spike, args) {
  const emitter = new EventEmitter()
  process.nextTick(() => {
    Spike.template.remove(Object.assign(args, { emitter: emitter }))
  })
  return emitter
}
