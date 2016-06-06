const path = require('path')
const EventEmitter = require('events').EventEmitter
const inquirer = require('inquirer')

module.exports = function (Spike, args) {
  const emitter = new EventEmitter()

  emitter.on('done', (project) => {
    emitter.emit('success', `project created at ${path.resolve(project.config.context)}`)
  })

  process.nextTick(() => Spike.new({
    root: args.path,
    emitter: emitter,
    locals: args.overrides,
    template: args.template,
    inquirer: inquirer.prompt.bind(inquirer)
  }))

  return emitter
}
