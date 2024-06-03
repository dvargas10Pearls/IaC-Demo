import { Duration } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

type EndpointLambdaProps = {
  scope: Construct;
  functionName: string;
  table: dynamodb.ITable;
  dynamoActions: string[];
  stage: string;
};

export const createEndpointLambda = ({
  scope,
  functionName,
  table,
  stage,
  dynamoActions
}: EndpointLambdaProps) => {
  const executionRole = new iam.Role(scope, `${functionName}EndpointLambda`, {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
  });

  const cloudWatchPolicy = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: [
      'logs:CreateLogGroup',
      'logs:CreateLogStream',
      'logs:PutLogEvents'
    ],
    resources: ['arn:aws:logs:*:*:*']
  });
  executionRole.addToPolicy(cloudWatchPolicy);

  const dynamoPolicy = new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: dynamoActions,
    resources: [table.tableArn]
  });
  executionRole.addToPolicy(dynamoPolicy);

  return new NodejsFunction(scope, `${functionName}Endpoint`, {
    memorySize: 512,
    timeout: Duration.seconds(120),
    runtime: lambda.Runtime.NODEJS_18_X,
    architecture: lambda.Architecture.ARM_64,
    entry: path.join(
      __dirname,
      `../lambda-code/endpoints/${functionName}.ts`
    ),
    bundling: {
      sourceMap: stage === 'prod' ? false : true,
      sourcesContent: false,
      esbuildArgs: {
        '--minify-whitespace': true,
        '--minify-identifiers': false,
        '--minify-syntax': true
      }
    },
    functionName: `${functionName}-endpoint`,
    handler: 'handler',
    role: executionRole,
    environment: {
      NODE_OPTIONS: stage === 'prod' ? '' : '--enable-source-maps',
      DEMO_TABLE_NAME: table.tableName,
      STAGE: stage
    },
  });
};
