/* eslint-disable no-console */
const crypto = require('crypto')

const secret = crypto.randomBytes(32).toString('hex')

console.log(secret)
