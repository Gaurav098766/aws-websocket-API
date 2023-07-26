const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const apiGateway = new AWS.ApiGatewayManagementApi({
  endpoint: 'https://i4yu469i13.execute-api.ap-south-1.amazonaws.com/dev/',
});

const msg = { message: 'Hello from server!' };
const msgStr = JSON.stringify(msg);

const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
  try {
    // Define the scan parameters
    const params = {
      TableName: "websocket",
    };

    let allConnections = [];

    // Paginate through the scan results if necessary
    do {
      const result = await dynamodb.scan(params).promise();
      const connections = result.Items;

      allConnections.push(...connections);

      // Check if there are more items to fetch
      if (result.LastEvaluatedKey) {
        params.ExclusiveStartKey = result.LastEvaluatedKey;
      } else {
        delete params.ExclusiveStartKey;
      }
    } while (params.ExclusiveStartKey);

    for (let connection of allConnections) {
      if (connection.ConnectionId && connection.ConnectionId.S && connection.Group && connection.Group.S) {
        const connectionId = connection.ConnectionId.S;
        const group = connection.Group.S;
        const postParams = {
          ConnectionId: connectionId,
          Data: JSON.stringify({ message: `Hello from server to Group:${group}!` }),
        };

        await apiGateway.postToConnection(postParams).promise();
        console.log(`Message sent successfully to connection ${connectionId} in group ${group}`);
      } else {
        console.log("Invalid connection format:", connection);
      }
    }
  } catch (err) {
    console.log('Error sending message:', err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
