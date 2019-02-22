/**
 * Add sample payloads as items in the array corresponding to the payload
 * `type`. The index.js file in this directory will auto-export the payloads,
 * making them available to the script in the root index.js file.
 */

module.exports.tracks = [
  {
    "type": "track",
    "userId": "123",
    "event": "test event 1"
  },
  {
    "type": "track",
    "userId": "123",
    "event": "test event 2"
  }
]

module.exports.identify = [
  {
    "type": "identify",
    "userId": "123"
  }
]
