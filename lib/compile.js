module.exports = function(Spike, { path, env }) {
  const project = new Spike({ root: path, env })
  process.nextTick(() => project.compile())
  return project
}
