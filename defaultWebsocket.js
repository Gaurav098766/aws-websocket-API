exports.handler = async (event) => {
    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify(`Hello from defaultroute: ${event.requestContext.connectionId}`),
    };
    return response;
  };
  