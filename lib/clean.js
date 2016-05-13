module.exports = function (Spike, args) {
  const project = new Spike({ root: args.path })
  process.nextTick(() => project.clean())
  return project
}
