'use strict';

const {buildDynamoParams, callDynamo} = require('./aws');
const iotDataTableName = process.env.iotDataTableName;

const http200response = (data) => {
  return {
    statusCode: 200,
    headers: {
      "X-Requested-With": '*',
      "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": 'POST,GET,OPTIONS',
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data),
  }
};

const getItemFromDynamo = async (id) => {
  const params = buildDynamoParams.get(id,iotDataTableName);
  //console.log('params' + JSON.stringify(params,null,4));
  let result;
  if(id!==undefined) {
    result = await callDynamo('get',params);
    return result.Item;
  }
  else {
    result = await callDynamo('scan',params);
    return result.Items;
    //console.log('result' + JSON.stringify(result,null,4));
  }
}

const saveItemToDynamo = async (item) => {
  const params = buildDynamoParams.put(item,iotDataTableName);
  const result = await callDynamo('put',params);
  return result.Item;
}

module.exports.post = async (event, context) => {
  const item = JSON.parse(event.body);
  await saveItemToDynamo(item);
  return http200response(item);
};

module.exports.getOne = async (event, context) => {
  let id;
  if(event.pathParameters!==undefined) id = event.pathParameters.id;
  const item = await getItemFromDynamo(id);
  return http200response(item);
};

module.exports.getAll = async (event, context) => {
  const id = undefined;
  const item = await getItemFromDynamo(id);
  return http200response(item);
};
