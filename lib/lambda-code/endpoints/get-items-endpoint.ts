import { APIGatewayEvent, Context } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import {
  BasicResponseType,
  ServerErrorResponse
} from './common/response';

export const handler = async (
  _: APIGatewayEvent,
  { awsRequestId }: Context
) => {
  try {
    const dynamoDbClient = new DynamoDBClient();
    const docClient = DynamoDBDocumentClient.from(dynamoDbClient);
    const command = new ScanCommand({
      TableName: process.env.DEMO_TABLE_NAME,
    });
    const dynamoResponse = await docClient.send(command);
    return new BasicResponseType(200, JSON.stringify(dynamoResponse.Items));
  } catch (error) {
    return new ServerErrorResponse(error, awsRequestId);
  }
};
