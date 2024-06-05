import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DemoApi } from "./constructs/demo-api";
import { DemoTable } from "./constructs/demo-table";
import { ApiResourceNames } from "./consts";
import { GetItemsEndpoint } from "./constructs/endpoints/get-items-endpoint";

type IaCDemoStackProps = { stage: string } & cdk.StackProps;

export class IaCDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IaCDemoStackProps) {
    super(scope, id, props);

    const { table } = new DemoTable(this, "DemoTable");

    const { apiResources } = new DemoApi(this, "DemoAPIGateway", {
      stage: props.stage,
    });

    new GetItemsEndpoint(this, "GetItemsEndpoint", {
      table,
      resource: apiResources[ApiResourceNames.ITEM],
      stage: props.stage,
    });
  }
}
