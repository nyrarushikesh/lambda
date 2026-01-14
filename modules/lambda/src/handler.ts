import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

/**
 * Lambda function handler
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));

  try {
    // Extract data from the event
    const body = event.body ? JSON.parse(event.body) : {};
    const method = event.httpMethod;
    const path = event.path;

    // Log environment variables
    console.log('Environment:', process.env.ENVIRONMENT);
    console.log('Log Level:', process.env.LOG_LEVEL);

    // Process the request
    const response = {
      message: 'Hello from Jawa Lambda!',
      method,
      path,
      timestamp: new Date().toISOString(),
      requestId: context.requestId,
      input: body,
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error processing request:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
