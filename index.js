'use strict'
var Sync = require('./directory-sync')

var syncedFolder = new Sync('./assets/')

// syncedFolder.createBucket({
//   Bucket: 'fabian-test-bucket',
//   ACL: 'public-read',
//   CreateBucketConfiguration: {
//     LocationConstraint: 'eu-central-1'
//   }
// }, function (err, data) {
//   if (err) console.log(err)
//   else console.log(data)
// })

syncedFolder.uploadFile({
  Bucket: 'fabian-test-bucket',
  Key: 'test.txt',
  Body: 'string',
  Expires: new Date(2016, 9, 6),
  ContentType: 'text/plain',
  ACL: 'private'
})
