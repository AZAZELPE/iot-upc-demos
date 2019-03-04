const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// GENERICS
const callDynamo = (action, params) => {
  return dynamoDb[action](params).promise();
}

const buildDynamoParams = {
  get: (id,tableName) => {
    if(id!==undefined) {
      return {
        Key: {
          "id": id
        },
        TableName: tableName
      }
    } else {
      return {
        TableName: tableName
      }
    }
  },
  put: (item,tableName) => {
    return {
      TableName: tableName,
      Item: item
    }
  }
}

module.exports.callDynamo = callDynamo;
module.exports.buildDynamoParams = buildDynamoParams;