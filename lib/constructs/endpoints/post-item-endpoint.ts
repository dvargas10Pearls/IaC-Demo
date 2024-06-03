import { StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { createEndpointLambda } from "../../factories/create-endpoint-lambda";

interface PostItemEndpointProps extends StackProps {
  table: dynamodb.ITable;
  resource: apiGateway.IResource;
  stage: string;
}

export class PostItemEndpoint extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { table, resource, stage }: PostItemEndpointProps
  ) {
    super(scope, id);
    const lambda = createEndpointLambda({
      scope,
      functionName: "post-item-endpoint",
      table,
      dynamoActions: ["dynamodb:PutItem"],
      stage,
    });

    resource.addMethod('POST', new apiGateway.LambdaIntegration(lambda))
  }
}
