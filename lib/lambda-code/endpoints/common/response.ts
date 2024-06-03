export class BasicResponseType {
  constructor(
    public statusCode: number,
    public body: string,
  ) {}
}

interface ErrorBody {
  message: string;
  code: string;
  requestId: string;
}

export class NoItemIdProvidedErrorResponse extends BasicResponseType {
  constructor(awsRequestId: string) {
    const body: ErrorBody = {
      message: 'No item ID present in the query params.',
      code: 'NID',
      requestId: awsRequestId
    };
    super(400, JSON.stringify(body));
  }
}

export class ServerErrorResponse extends BasicResponseType {
  constructor(error: any, awsRequestId: string) {
    console.error(error);
    const body: ErrorBody = {
      message: 'A server error occurred while processing your request.',
      code: 'SE',
      requestId: awsRequestId
    };
    super(500, JSON.stringify(body));
  }
}
