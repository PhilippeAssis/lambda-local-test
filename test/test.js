const lambda = require('../src')
const event = require('./assets/event.json')
const context = require('./assets/context.json')
const handler = require('./assets/handler')
const path = require('path')

describe ('Parse event', function () {
  describe ('Event in line', function () {
    it ('Return of success passing event', function () {
      lambda(handler, 'handler', event, context, path.resolve(__dirname, 'assets', '.env-test'))
    })

    it ('Return of error passing event', function () {
      lambda(handler, 'handler', {}, context, './.env-test')
    })
  })
})
