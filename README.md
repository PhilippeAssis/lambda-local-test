# lambda-local-test
Test locally its function * aws lambda * with `lambdatest`
![Lambda local test](https://raw.githubusercontent.com/PhilippeAssis/lambda-local-test/master/demo.png)

## Install
### global
```
npm i -g lambda-local-test
```
### local dev
```
npm i --save-dev lambda-local-test
```

## On console
```bash
lambdatest index.js -event event.json
```

## On code
```javascript
const lambda = require('lambda-local-test')
const myFunction = require('./myFunction')

lambda(myFunction, 'handler', { name: 'Philippe', lastName: 'Assis'})
```
