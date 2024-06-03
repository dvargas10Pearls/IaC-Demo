#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IaCDemoStack } from '../lib/ia_c-demo-stack';
import { getConfig } from '../config/get-config';

const app = new cdk.App();

const config = getConfig(app);
console.log('Running with config:');
console.log(config);

const env: cdk.Environment = {
  account: config.awsAccountID,
  region: config.awsRegion
};

new IaCDemoStack(app, 'IaCDemoStack', {env, stage: config.stage});
