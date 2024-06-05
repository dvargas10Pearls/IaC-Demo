import { APIGatewayEvent, Context } from 'aws-lambda';
import {
  BasicResponseType,
  ServerErrorResponse
} from './common/response';
import { ItemsService } from './service/items-service';

export const handler = async (
  _: APIGatewayEvent,
  { awsRequestId }: Context
) => {
  try {
    const items = await ItemsService.getItems();
    return new BasicResponseType(200, JSON.stringify(items));
  } catch (error) {
    return new ServerErrorResponse(error, awsRequestId);
  }
};
