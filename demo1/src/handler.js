'use strict';

const {buildDynamoParams, callDynamo} = require('./aws');
const iotGadgetTableName = process.env.iotGadgetTableName;
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

/////////////////// GADGET ////////////////////////

const getGadgetFromDynamo = async (id) => {
  const params = buildDynamoParams.get(id,iotGadgetTableName);
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

const saveGadgetToDynamo = async (item) => {
  const params = buildDynamoParams.put(item,iotGadgetTableName);
  const result = await callDynamo('put',params);
  return result.Item;
}

module.exports.postGadget = async (event, context) => {
  const item = JSON.parse(event.body);
  await saveGadgetToDynamo(item);
  return http200response(item);
};

module.exports.getGadget = async (event, context) => {
  const id = event.pathParameters.id;
  const item = await getGadgetFromDynamo(id);
  return http200response(item);
};

module.exports.getAllGadget = async (event, context) => {
  const id = undefined;
  const item = await getGadgetFromDynamo(id);
  return http200response(item);
};

/////////////////// DATA ////////////////////////
const saveDataToDynamo = async (item) => {
  const params = buildDynamoParams.put(item,iotDataTableName);
  const result = await callDynamo('put',params);
  return result.Item;
}

const getDataFromDynamo = async (gadget, fromMillis, toMillis) => {
  
  //Generate DynamoDB Query
  const params = {
    TableName: iotDataTableName,
    KeyConditionExpression: '#id = :gadget AND #ts BETWEEN :fromMillis AND :toMillis',
    ExpressionAttributeNames: {
      "#id": "id",
      "#ts": "timestamp"
    },
    ExpressionAttributeValues: {
      ':gadget': gadget,
      ':fromMillis': fromMillis,
      ':toMillis': toMillis
    }
  }

  console.log('params' + JSON.stringify(params,null,4));
  const result = await callDynamo('query',params);
  console.log('result' + JSON.stringify(result,null,4));
  return result.Items;
  
  
}

module.exports.postData = async (event, context) => {
  let item = JSON.parse(event.body);
  item['timestamp'] = new Date().getTime()
  await saveDataToDynamo(item);
  return http200response(item);
};

module.exports.getDataFromGadget = async (event, context) => {
  const gadget = event.pathParameters.gadgetId;
  const fromMillis = Number(event.queryStringParameters.fromMillis);
  const toMillis = Number(event.queryStringParameters.toMillis);

  console.log({gadget:gadget,fromMillis:fromMillis,toMillis:toMillis});

  const item = await getDataFromDynamo(gadget,fromMillis,toMillis);
  return http200response(item);
};