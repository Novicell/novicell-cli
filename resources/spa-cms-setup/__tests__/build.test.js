const axios = require('axios');
const test = require('ava');
const { JSDOM } = require('jsdom');
const { Nuxt } = require('nuxt');

// Build project before testing
let nuxt = null;
let link = null;

test.before(async () => {
  console.log('Running Unit Tests...');
  const config = require('../nuxt.config.js');
  config.dev = false;
  nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;
  link = `http://${host}:${port}`;
  await nuxt.ready();
  await nuxt.server.listen(port, host);
  console.log(`Server listening on ${link}`);
}, 30000);

test('API responds with 200', async t => {
  const { status } = await axios.get(link);
  t.true(status == 200);
});

test('Route "/" exits and render HTML', async t => {
  const { html } = await nuxt.server.renderRoute('/', {});
  // Alternative fetching html
  // const { data } = await axios.get('http://localhost:3000');
  t.true(html.includes('<h2>Pellentesque in ipsum id orci porta dapibus.</h2>'));
});

test('Route "/" exits and renders HERO element', async t => {
  const context = {};
  const { html } = await nuxt.server.renderRoute('/', context);
  const { window } = new JSDOM(html).window;
  const className = 'frontpage-page';
  const element = window.document.querySelector(`.${className}`);
  t.not(element, null);
  t.is(element.className, className);
});

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => nuxt.close());
