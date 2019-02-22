/**
 * Add any fixtures within the ./fixtures directory, and this file
 * automatically exports them, making them available to the root index.js file.
 */

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file === 'index.js') return
  module.exports[file] = require('./' + file)
})
