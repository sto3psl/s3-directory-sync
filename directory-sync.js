'use strict'
var AWS = require('aws-sdk')
var fs = require('fs')

/**
 * Configure your Settings for AWS within the aws-config.json file
 *
 * View this link for possible parameters:
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
 */
AWS.config.loadFromPath('./aws-config.json')

var s3 = new AWS.S3()

class directorySync {
  /**
   * Creates an instance of directorySync
   *
   * @constructor
   * @this {directorySync}
   * @param {string} localDirectory The directory where files get uploaded or downloaded from.
   */
  constructor (localDirectory) {
    this.directory = localDirectory + '/'
    this.bucket = 'fabian-test-bucket'
    console.log(this.bucket, this.directory)
  }

  /**
   * Creates an bucket with the specified parameters.
   *
   * @param {object} params Parameters according to: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property
   * @param {function} callback
   */
  createBucket (params, callback) {
    s3.createBucket(params, callback)
  }

  /**
   * Get a list of files in your bucket.
   *
   * @param
   * @param
   */
  getFiles (params) {
    s3.listObjects(params, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('Bucket ' + data.Name + ' contains:')
        for (var i = 0; i <= data.Contents.length - 1; i++) {
          console.log(data.Contents[i].Key)
        }
      }
    })
  }

  /**
   * Upload a file to your bucket.
   *
   * @param {object} params Parameters according to: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
   */
  uploadFile (params) {
    fs.readFile(this.directory + params.Key, function (err, data) {
      if (err) {
        console.error(err)
      } else {
        s3.putObject(params, function (err, data) {
          if (err) console.error(err)
          else console.log(data)
        })
      }
    })
  }

  /**
   * Upload multiple files to your Bucket.
   *
   * @param {array} files List of files you want to upload.
   */
  uploadFiles (params) {
    for (var i = params.length - 1; i >= 0; i--) {
      this.uploadFile(params[i])
    }
  }

  /**
   * Download a file from your Bucket.
   *
   * @param
   */
  downloadFile () {

  }

  /**
   * Download multiple files from your Bucket.
   *
   * @param
   */
  downloadFiles () {

  }

  /**
   * Sync your local directory with the files from your Bucket.
   * Local files which are not in your Bucket will get deleted.
   *
   * @param
   */
  syncFromBucket () {

  }

  /**
   * Sync your Local files with your Bucket.
   * Files in your Bucket which are not in your local directory will get deleted.
   *
   * @param
   */
  syncFromDirectory () {

  }

  /**
   * Delete a file from your Bucket.
   *
   * @param
   */
  deleteFileFromBucket () {

  }
}

module.exports = directorySync
