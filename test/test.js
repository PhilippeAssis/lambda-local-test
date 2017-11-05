const lambda = require('../src/lambda')
const event = require('./assets/event.json')
const context = require('./assets/context.json')

describe ('Parse event', function () {
  describe ('Event in line', function () {
    it ('Return of success passing event', function () {
      lambda('./../test/assets/handler', 'handler', event, context)
    })

    it ('Return of error passing event', function () {
      lambda('./../test/assets/handler', 'handler', {}, context)
    })
  })
})
