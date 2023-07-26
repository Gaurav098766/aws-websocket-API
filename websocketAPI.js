const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

exports.handler = async (event) => {

  const dynamodb = new AWS.DynamoDB();
  const params = {
    TableName: 'websocket',
    Item: {
      ConnectionId: { S: event.requestContext.connectionId },
      Group:{S: event.queryStringParameters.group},
    },
  };

  try {
    await dynamodb.putItem(params).promise();
    console.log('ConnectionId stored in DynamoDB:', event.requestContext.connectionId);
    console.log('Group Number stored in DynamoDB:', event.queryStringParameters.group);
  } catch (err) {
    console.log('Error storing connectionId or Gr in DynamoDB:', err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
