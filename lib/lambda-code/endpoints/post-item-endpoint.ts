import { APIGatewayEvent, Context } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import {
  BasicResponseType,
  NoItemIdProvidedErrorResponse,
  ServerErrorResponse
} from './common/response';
import { ItemIdQueryParam } from './common/request';
import { isParameterMissing } from './common/utils';

export const handler = async (
  event: APIGatewayEvent,
  { awsRequestId }: Context
) => {
  const queryParams = event.queryStringParameters;
  const { id } = queryParams as ItemIdQueryParam;

  if (isParameterMissing(id)) {
    return new NoItemIdProvidedErrorResponse(awsRequestId)
  }

  try {
    const dynamoDbClient = new DynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDbClient);
    const command = new PutCommand({
      TableName: process.env.DEMO_TABLE_NAME,
      Item: {
        id
      },
    });
    const dynamoResponse = await docClient.send(command);
    return new BasicResponseType(200, JSON.stringify(dynamoResponse));
  } catch (error) {
    return new ServerErrorResponse(error, awsRequestId);
  }
};
