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
import { ItemsService } from './service/items-service';

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
    await ItemsService.postItem(id)
    return new BasicResponseType(200, "Success");
  } catch (error) {
    return new ServerErrorResponse(error, awsRequestId);
  }
};
