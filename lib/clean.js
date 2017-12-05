module.exports = function(Spike, { path }) {
  const project = new Spike({ root: path })
  process.nextTick(() => project.clean())
  return project
}
