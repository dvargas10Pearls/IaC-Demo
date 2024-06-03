import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class DemoTable extends Construct {
  public readonly table: dynamodb.Table;

  constructor(
    scope: Construct,
    id: string
  ) {
    super(scope, id);
    this.table = new dynamodb.Table(this, `ItemsTable`, {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });
  }
}

export default DemoTable
