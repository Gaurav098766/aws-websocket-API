const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

exports.handler = async (event) => {

  // Store the connectionId in DynamoDB table named "websocket"
  const dynamodb = new AWS.DynamoDB();
  const params = {
    TableName: 'websocket',
    Key: {
      ConnectionId: { S: event.requestContext.connectionId },
    },
  };

  try {
    await dynamodb.deleteItem(params).promise();
    console.log('ConnectionId deleted from DynamoDB:', event.requestContext.connectionId);
  } catch (err) {
    console.log('Error deleting connectionId from DynamoDB:', err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
