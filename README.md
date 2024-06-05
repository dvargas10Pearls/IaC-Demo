# IaC-Demo
Infrastructure as code demo for 10Pearls Learning Session

## Prerequisites
- NPM: install node and the npm package manager from [here](https://nodejs.org/en/download)
- CDK CLI: install globally using npm by running `npm install -g aws-cdk`
- AWS CLI: download the installer from [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Configure credentials for the AWS account where you'll deploy the app.

This project was started by running `cdk init app --language=typescript` to create template project.

## How to deploy
The `package.json` contains two scripts for deployment. The first is `bootstrap-dev` and should only be run once per environment.The second is `deploy-dev` and is the one to be run every time you want to deploy a new change. Both use the default AWS credentials in your `~/.aws/credentials` file. If you wish to use a specific AWS profile for running these scripts, be sure to add `--profile {YOUR_PROFILE_NAME}` at the end. 

These scripts pass `-c stage=dev` in order to tell the stack which YAML config file to pull its parameters from. Feel free to create new versions of these scripts for each new environment you add and make sure to create the respective YAML config file inside the `/config` folder. For example, if you were adding a beta env, the deploy script would be called `deploy-staging` and in it you would pass `-c stage=staging` in order to pull the config from `/config/staging.yaml`.

Note: Make sure the role you use to run the scripts has the necessary IAM permissions.