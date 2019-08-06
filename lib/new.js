const { resolve } = require('path')
const EventEmitter = require('events').EventEmitter
const inquirer = require('inquirer')

module.exports = function(Spike, { path, overrides, template }) {
  const emitter = new EventEmitter()

  emitter.on('done', project => {
    emitter.emit(
      'success',
      `project created at ${resolve(project.config.context)}`
    )
  })

  process.nextTick(() =>
    Spike.new({
      emitter,
      template,
      root: path,
      locals: overrides,
      inquirer: inquirer.prompt.bind(inquirer)
    })
  )

  return emitter
}
