import { StackProps } from "aws-cdk-lib";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { createEndpointLambda } from "../../factories/create-endpoint-lambda";

interface GetItemEndpointProps extends StackProps {
  table: dynamodb.ITable;
  resource: apiGateway.IResource;
  stage: string;
}

export class GetItemsEndpoint extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { table, resource, stage }: GetItemEndpointProps
  ) {
    super(scope, id);
    const lambda = createEndpointLambda({
      scope,
      functionName: "get-items-endpoint",
      table,
      dynamoActions: ["dynamodb:Scan"],
      stage,
    });

    resource.addMethod('GET', new apiGateway.LambdaIntegration(lambda))
  }
}
