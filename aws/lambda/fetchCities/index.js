const AWS = require('aws-sdk');
const S3= new AWS.S3();
exports.handler = async () => {
  try {
    const data = await S3.getObject({Bucket: 'jimmymedia', Key: 'worldcities.json'}).promise();
    return {
      statusCode: 200,
      headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
      },
      body: data.Body.toString('utf-8')
    }
  }
  catch (err) {
    return {
      statusCode: err.statusCode || 400,
      body: err.message || JSON.stringify(err.message)
    }
  }
}