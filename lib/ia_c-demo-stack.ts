import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DemoApi } from "./constructs/demo-api";
import { DemoTable } from "./constructs/demo-table";
import { PostItemEndpoint } from "./constructs/endpoints/post-item-endpoint";
import { ApiResourceNames } from "./consts";

type IaCDemoStackProps = { stage: string } & cdk.StackProps;

export class IaCDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IaCDemoStackProps) {
    super(scope, id, props);

    const { table } = new DemoTable(this, "DemoTable");

    const { apiResources } = new DemoApi(this, "DemoAPIGateway", {
      stage: props.stage,
    });

    new PostItemEndpoint(this, "PostItemEndpoint", {
      table,
      resource: apiResources[ApiResourceNames.ITEM],
      stage: props.stage,
    });
  }
}
