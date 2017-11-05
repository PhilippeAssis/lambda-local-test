const lambda = require('../src/lambda')
const event = require('./assets/event.json')
const context = require('./assets/context.json')
const handler = require('./assets/handler')

describe ('Parse event', function () {
  describe ('Event in line', function () {
    it ('Return of success passing event', function () {
      lambda(handler, 'handler', event, context)
    })

    it ('Return of error passing event', function () {
      lambda(handler, 'handler', {}, context)
    })
  })
})
