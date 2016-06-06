const EventEmitter = require('events')

module.exports = function (Spike, args) {
  const emitter = new EventEmitter()
  process.nextTick(() => {
    Spike.template.add(Object.assign(args, { emitter: emitter }))
  })
  return emitter
}
