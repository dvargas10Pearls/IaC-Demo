import { StackProps, aws_route53_targets as targets } from "aws-cdk-lib";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ApiResourceNames } from "../consts";

interface DemoApiProps extends StackProps {
  stage: string;
}

export class DemoApi extends Construct {
  public readonly demoApi: apiGateway.RestApi;
  public readonly apiResources: { [resourceName: string]: apiGateway.Resource } = {};

  constructor(scope: Construct, id: string, { stage }: DemoApiProps) {
    super(scope, id);

    this.demoApi = new apiGateway.RestApi(
      this,
      `IaC-Demo-API-Gateway-${stage}`,
      {
        description: `API for IaC Demo`,
        deployOptions: {
          stageName: stage,
        },
        defaultCorsPreflightOptions: {
          allowHeaders: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "X-Amz-Content-sha256",
            "Host",
          ],
          allowMethods: ["OPTIONS", "GET", "PUT"],
          allowCredentials: true,
          allowOrigins: ["*"],
        },
      }
    );

    this.demoApi.addGatewayResponse("DefaultUserErrorResponse", {
      type: apiGateway.ResponseType.DEFAULT_4XX,
      responseHeaders: {
        "Access-Control-Allow-Origin": `'*'`,
      },
    });

    this.demoApi.addGatewayResponse("DefaultServerErrorResponse", {
      type: apiGateway.ResponseType.DEFAULT_5XX,
      responseHeaders: {
        "Access-Control-Allow-Origin": `'*'`,
      },
    });

    // /item
    this.addResource(this.demoApi.root, ApiResourceNames.ITEM);
  }

  private addResource = (
    baseResource: apiGateway.IResource,
    newResourceName: string
  ) => {
    this.apiResources[newResourceName] =
      baseResource.addResource(newResourceName);
  };
}
