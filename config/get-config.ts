import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { resolve } from 'path';
import * as cdk from 'aws-cdk-lib';

export const getConfig = (app: cdk.App): {
  awsAccountID: string;
  awsRegion: string;
  stage: string;
} => {
  const stage = app.node.tryGetContext('stage');
  if (!stage) {
    throw new Error('Missing context var "stage" in call to cdk command');
  }

  const unparsedConfig = load(
    readFileSync(resolve(`./config/${stage}.yaml`), 'utf8')
  ) as any;

  return {
    awsAccountID: unparsedConfig['AWSAccountID']!,
    awsRegion: unparsedConfig['AWSRegion']!,
    stage
  };
};