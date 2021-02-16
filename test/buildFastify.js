const Fastify = require('fastify')
const fp = require('fastify-plugin')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function buildFastify (t) {
  const fastify = Fastify()

  fastify.get('/', function (request, reply) {
    reply.send('hello')
  })

  fastify.register(fp((fastify, opts, done) => {
    fastify.addHook('onRequest', async function (request, reply) {
      await sleep(500)
      reply.code(404).send('onRequest')
    })
    done()
  }))

  await fastify.listen(3000)
  return fastify
}

module.exports = buildFastify