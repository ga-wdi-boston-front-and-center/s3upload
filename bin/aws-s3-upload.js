'use strict'

// require our dotenv module for secret keys
require('dotenv').config()

// require the AWS SDK
const AWS = require('aws-sdk')

// set a new instance of the S3 method
const s3 = new AWS.S3()

// require fs for creating file streams
const fs = require('fs')

// define process args
const file = process.argv[2]
const fileName = process.argv[3] || 'default'
const bucketName = process.env.BUCKET_NAME

// require module for determining content types of files we are sending
const mime = require('mime-types')

// get mimetype from filename
const contentType = mime.lookup(file)

// provides extension of the uploaded file
const extension = mime.extension(contentType)

// console.log(process.env.BUCKET_NAME)

// s3.createBucket({Bucket: 'test-wdi-110218-dwb'}, function (err, data) {
//   console.log('error is ', err)
//   console.log('data is', data)
// })

// filepath is from root of directory where file is run from
// images/padawan.png
// process.argv[index] allows us to pass any file from the command line
const stream = fs.createReadStream(file)

const params = {
  // bucket we are uploading to
  Bucket: bucketName,
  // title or name of the file
  Key: `${fileName}.${extension}`,
  // content of the file or the file itself
  Body: stream,
  ACL: 'public-read',
  ContentType: contentType
}

// promisified below
// s3.upload(params, function (err, data) {
//   console.log(err, data)
// })

// if s3 upload succeeds or not:
const s3Upload = function () {
  return new Promise((resolve, reject) => {
    // upload file to S3
    s3.upload(params, function (err, data) {
      // if it fails then promise rejects
      if (err) {
        reject(err)
      // if it succeeds then promise resolves with the data
      } else {
        resolve(data)
      }
    })
  })
}

s3Upload()
  .then(console.log)
  .catch(console.error)
