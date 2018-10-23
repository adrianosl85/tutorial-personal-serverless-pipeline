'use strict';

const AWS = require('aws-sdk');

const S3 = new AWS.S3();

module.exports.create = async (event, context) => {

  const filename = new Date().getTime();

  try {
    const putObjectPromise = S3.putObject({
      Bucket: process.env.MY_BUCKET,
      Key: `${filename}.txt`,
      Body: JSON.stringify(Math.floor((Math.random() + 1) * 1000))
    }).promise();

    await putObjectPromise;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      })
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed with error!',
        error: ex.message,
      }),
    };

  }
};


module.exports.list = async (event, context) => {

  try {
    const listObjectsPromise = S3.listObjects({
      Bucket: process.env.MY_BUCKET
    }).promise();

    const list = await listObjectsPromise;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: list,
      })
    };
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed with error!',
        error: ex.message,
      }),
    };

  }
};