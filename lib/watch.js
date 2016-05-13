module.exports = function (Spike, args) {
  const project = new Spike({ root: args.path, env: args.env })
  process.nextTick(() => project.watch())
  return project
}
