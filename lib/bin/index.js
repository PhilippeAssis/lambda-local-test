#!/usr/bin/env node
'use strict';

const flags = require('simple-flags');
const lambda = require('../index.js');
const path = require('path');

const opt = flags({
  args: ['file', 'handler'],
  file: {
    aliases: ['f'],
    default: 'index.js',
    description: 'Lambda function file'
  },
  handler: {
    aliases: ['h'],
    default: 'handler',
    description: 'Function to be executed'
  },
  event: {
    aliases: ['e'],
    description: 'Json file with to be sent in the event parameter'
  },
  context: {
    aliases: ['c', 'ctx'],
    description: 'Json file with to be sent in the context parameter'
  },
  eventInLine: {
    aliases: ['el'],
    description: 'Json in line to be sent in the event parameter'
  },
  contextInLine: {
    aliases: ['cl'],
    description: 'Json in line to be sent in the event parameter'
  },
  env: {
    description: 'Environment file'
  }
});

function transformProps(prop, inLine, obj) {
  var result = {};

  if (obj[inLine]) {
    result = JSON.parse(obj[inLine]);
  } else if (obj[prop]) {
    result = require(path.resolve(process.cwd(), obj[prop]));
  }

  return result;
}

opt.event = transformProps('event', 'eventInLine', opt);
opt.context = transformProps('context', 'contextInLine', opt);
opt.file = path.resolve(process.cwd(), opt.file);

const { file, handler, event, context, env } = opt;

lambda(file, handler, event, context, env);