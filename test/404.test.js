'use strict'

const t = require('tap')
const test = t.test
const buildFastify = require('./buildFastify')

test('default 404', async t => {
  t.plan(2)

  const fastify = await buildFastify(t)

  t.tearDown(() => fastify.close())

  // First call
  let response = await fastify.inject({
    method: 'GET',
    url: '/notSupported'
  })
  
  t.strictEqual(response.statusCode, 404)
  t.strictEqual(response.body,'onRequest')
})


// const t = require('tap')
// const test = t.test
// const sget = require('simple-get').concat
// const Fastify = require('../fastify')
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// process.removeAllListeners('warning')

// test('async hooks', t => {
//   t.plan(9)

//   const fastify = Fastify()
//   fastify.addHook('onRequest', async function (request, reply) {
//     await sleep(1)
//     request.test = 'the request is coming'
//     reply.test = 'the reply has come'
//     if (request.raw.method === 'DELETE') {
//       throw new Error('some error')
//     }
//   })

//   fastify.addHook('preHandler', async function (request, reply) {
//     await sleep(1)
//     t.is(request.test, 'the request is coming')
//     t.is(reply.test, 'the reply has come')
//     if (request.raw.method === 'HEAD') {
//       throw new Error('some error')
//     }
//   })

//   fastify.addHook('onSend', async function (request, reply, payload) {
//     await sleep(1)
//     t.ok('onSend called')
//   })

//   fastify.addHook('onResponse', async function (request, reply) {
//     await sleep(1)
//     t.ok('onResponse called')
//   })

//   fastify.get('/', function (request, reply) {
//     t.is(request.test, 'the request is coming')
//     t.is(reply.test, 'the reply has come')
//     reply.code(200).send({ hello: 'world' })
//   })

//   fastify.listen(0, err => {
//     t.error(err)
//     fastify.server.unref()

//     sget({
//       method: 'GET',
//       url: 'http://localhost:' + fastify.server.address().port
//     }, (err, response, body) => {
//       t.error(err)
//       t.strictEqual(response.statusCode, 200)
//       t.strictEqual(response.headers['content-length'], '' + body.length)
//       t.deepEqual(JSON.parse(body), { hello: 'world' })
//     })
//   })
// })
