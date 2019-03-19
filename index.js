const fixtures = require('./fixtures')
const deepMerge = require('lodash').merge
const faker = require('faker')
const fs = require('fs')
const traverse = require('traverse')

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

// scrubs PII; eventually we'll need to scrub all data considered under GDPR and CCPA
const pii = {
  'traits.email': email,
  'traits.firstName': firstName,
  'traits.lastName': lastName,
  'traits.name': fullName,
  'traits.fullName': fullName,
  'traits.address.city': city,
  'traits.address.postalCode': postalCode,
  'traits.city': city,
  'traits.state': state,
  'traits.country': country,
  'traits.phone': phone,
  'context.ip': ip,
  'context.timezone': timezone,
  'context.userAgent': userAgent,
  'properties.currency': currency,
  'timestamp': time,
  'originalTimestamp': time,
  'sentAt': time,
  'receivedAt': time,
  'messageId': id,
  'writeKey': writeKey,
  'userId': userId,
  'anonymousId': id,
  'context.device.advertisingId': id,
  'context.device.id': id,
  'context.locale': locale
}

Object.keys(pii).forEach(function(key) {
  var path = key.split('.')
  if (fIdentify && traverse(fIdentify).has(path)) {
    traverse(fIdentify).set(path, pii[key]())
  }
})

Object.keys(pii).forEach(function(key) {
  var path = key.split('.')
  if (fTrack && traverse(fTrack).has(path)) {
    traverse(fTrack).set(path, pii[key]())
  }
})

function email() {
  return faker.internet.email()
}

function firstName() {
  return faker.name.firstName()
}

function lastName() {
  return faker.name.lastName()
}

function fullName() {
  return faker.name.findName()
}

function city() {
  return faker.address.city()
}

function postalCode() {
  return faker.address.zipCode()
}

function state() {
  return faker.address.state()
}

function country() {
  return faker.address.country()
}

function phone() {
  return faker.phone.phoneNumber()
}

function ip() {
  return faker.internet.ip()
}

function timezone() {
  return 'UTC'
}

function userAgent() {
  return faker.internet.userAgent()
}

function currency() {
  return faker.finance.currencyCode()
}

function time() {
  return new Date()
}

function writeKey() {
  return faker.random.alphaNumeric(32)
}

function userId() {
  return faker.random.alphaNumeric(10)
}

function id() {
  return `${faker.random.alphaNumeric(8)}-${faker.random.alphaNumeric(4)}-${faker.random.alphaNumeric(4)}-${faker.random.alphaNumeric(4)}-${faker.random.alphaNumeric(12)}`
}

function locale() {
  return faker.random.locale()
}

// merge above produces aggregate objects including all properties
console.log('***final identify***', JSON.stringify(fIdentify, null, 2))
console.log('***final track***', JSON.stringify(fTrack, null, 2))

fs.writeFileSync('./src/fIdentify.json', JSON.stringify(fIdentify, null, 2))
fs.writeFileSync('./src/fTrack.json', JSON.stringify(fTrack, null, 2))

console.log('***your files are available in the src/ directory')
