const fixtures = require('./fixtures')
const deepMerge = require('lodash').merge

let fIdentify = {}
let fTrack = {}

let identifies = []
let tracksArr = []

Object.keys(fixtures).forEach(function(file) {
  const { identify, tracks } = fixtures[file]
  if (identify.length) identifies = [...identifies, ...identify]
  if (tracks.length) tracksArr = [...tracksArr, ...tracks]
})

merge(identifies)
merge(tracksArr)

function merge(arr) {
  arr.forEach(function(obj) {
    if (obj.type === 'identify') {
      deepMerge(fIdentify, obj)
    }
    if (obj.type === 'track') {
      deepMerge(fTrack, obj)
    }
  })
}

// merge above produces aggregate objects including all properties
console.log('***final identify***', JSON.stringify(fIdentify, null, 2))
console.log('***final track***', JSON.stringify(fTrack, null, 2))
