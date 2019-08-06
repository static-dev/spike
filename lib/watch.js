module.exports = function(Spike, { path, env, port }) {
  const project = new Spike({ env, root: path, server: { port } })
  process.nextTick(() => project.watch())
  return project
}
