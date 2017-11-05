const flags = require('simple-flags')
const lambda = require('./../src/lambda')

const opt = flags({
  args: ['file', 'handler'],
  event: {
    aliases: ['e']
  },
  eventInLine: {
    aliases: ['el']
  },
  context: {
    aliases: ['c', 'ctx']
  },
  contextInLine: {
    aliases: ['cl']
  },
  handler: {
    aliases: ['h'],
    default: 'index.handler'
  },
  file: {
    aliases: ['f'],
    default: 'index.js'
  }
})

function transformProps (prop, other, obj) {
  if (obj[other]) {
    obj[prop] = obj[other]
  } else if (obj[prop]) {
    obj[prop] = require(obj[prop])
  } else {
    obj[prop] = {}
  }

  return obj
}

opt.context = transformProps('event', 'eventInLine', opt)
opt.event = transformProps('context', 'contextInLine', opt)

const { file, handler, event, context } = opt

lambda(file, handler, event, context)
