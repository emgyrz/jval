
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./jval.cjs.production.min.js')
} else {
  module.exports = require('./jval.cjs.development.js')
}
