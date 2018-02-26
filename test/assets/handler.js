exports.handler = (event, context, callback) => {
  const {name, lastName} = event

  if (!name || !lastName) {
    return callback(new Error('Name or last name empty'))
  }

  const fullName = name + ' ' + lastName + '. Env: ' + process.env.LAMBDA_LOCAL_TEST

  callback(null, { fullName })
}
