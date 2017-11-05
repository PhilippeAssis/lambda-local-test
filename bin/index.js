#!/usr/bin/env node
const flags = require('simple-flags')
const lambda = require('./../src/lambda')
const path = require('path')

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
    default: 'handler'
  },
  file: {
    aliases: ['f'],
    default: 'index.js'
  }
})

function transformProps (prop, inLine, obj) {
  var result = {}

  if (obj[inLine]) {
    result = obj[inLine]
  } else if (obj[prop]) {
    result = require(path.resolve(process.cwd(), obj[prop]))
  }

  return result
}

opt.event = transformProps('event', 'eventInLine', opt)
opt.context = transformProps('context', 'contextInLine', opt)
opt.file = path.resolve(process.cwd(), opt.file)

const { file, handler, event, context } = opt

lambda(file, handler, event, context)
