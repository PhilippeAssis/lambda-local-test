require('colors')
var error = Error

if (!('toJSON' in error.prototype)) {
  Object.defineProperty(error.prototype, 'toJSON', {
    value: function () {
      var alt = {}

      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key]
      }, this)

      return alt
    },
    configurable: true,
    writable: true
  })
}

const timeLabel = 'Lambda time'.bold.bgMagenta

const lambda = (func, handler, event = {}, context = {}, env = '.env', callback) => {
  require('dotenv').config({path: env})

  const lbFile = func[handler]
  console.time(timeLabel)
  console.log('-----------------------------------'.yellow.bold)
  console.log('---------Lambda Local Test---------'.yellow.bold)
  console.log('-----------------------------------'.yellow.bold)

  console.log('\n\nEvent prop: '.bgBlue.bold + JSON.stringify(event, null, 2).bgBlue + '\n'.bgBlue)
  console.log('\n\nContext prop: '.bgCyan.bold + JSON.stringify(context, null, 2).bgCyan + '\n'.bgCyan)

  console.log('\n\n---------------Result--------------'.bold.yellow)
  lbFile(event, context, (err, data) => {
    console.timeEnd(timeLabel)
    if (err) {
      console.log('\n\nerror: '.bgRed.bold + JSON.stringify(err, null, 2).bgRed + '\n'.bgRed)
    } else {
      console.log('\n\nSuccess: '.bgGreen.bold + JSON.stringify(data, null, 2).bgGreen + '\n'.bgGreen)
    }

    console.log('\n----------------END----------------\n'.yellow.bold)

    if (callback) {
      callback(err, data)
    }
  })
}

module.exports = lambda
