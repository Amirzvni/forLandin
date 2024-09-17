const fastify = require('fastify');
const path = require('path');
const closeWithGrace = require('close-with-grace');
const app = fastify({ logger: true });
const cors = require('fastify-cors');
const fastifyMultipart = require('fastify-multipart');

// Register the multipart plugin
app.register(fastifyMultipart);

// Enable CORS
app.register(cors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
});

app.setErrorHandler((error, request, reply) => {
  if (error.statusCode && error.statusCode === 429) {
    reply.status(429).send({code : 429 , message : 'Rate limit exceeded, retry in 2 minutes'});
    return;
  }
  app.log.error(error);
  reply.status(500).send({ code: 500, error: error.message });
});


app.register(require('@fastify/rate-limit'), {
  global: false,
  max: 1,
  timeWindow: 2 * 60 * 1000
})

app.register(require('fastify-autoload'), {
  dir: path.join(__dirname, 'routes'),
});


const closeListeners = closeWithGrace({ delay: 3000 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', (instance, done) => {
  closeListeners.uninstall()
  done()
})

app.listen({ port: 3002, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:3002`);
});
