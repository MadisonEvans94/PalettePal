import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: "us-east-2_kEG1omIQK",
	ClientId: "5bp260q6ivuu4d37aas40fb198",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default new CognitoUserPool(poolData);
