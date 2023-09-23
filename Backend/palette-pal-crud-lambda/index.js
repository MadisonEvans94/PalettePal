const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
	if (event.httpMethod === "POST") {
		return await handlePost(event);
	} else if (event.httpMethod === "GET") {
		return await handleGet(event);
	} else if (event.httpMethod === "DELETE") {
		return await handleDelete(event);
	} else {
		return {
			statusCode: 405,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify("Method not supported"),
		};
	}
};

const handlePost = async (event) => {
	const userId = event.headers.userid;
	const reqBody = JSON.parse(event.body);

	const imageId = uuid.v4();

	const lambdaParams = {
		FunctionName: "ImageUploadFunction",
		InvocationType: "RequestResponse",
		Payload: JSON.stringify({
			body: reqBody.image,
			headers: {
				userid: userId,
			},
		}),
	};

	let imageUrl, thumbnailUrl;

	try {
		const lambdaResponse = await lambda.invoke(lambdaParams).promise();
		const lambdaResult = JSON.parse(lambdaResponse.Payload);
		let lambdaResultBody = JSON.parse(lambdaResult.body);
		imageUrl = lambdaResultBody.imageUrl;
		thumbnailUrl = lambdaResultBody.thumbnailUrl;
	} catch (error) {
		const response = {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify("Error uploading image"),
		};

		return response;
	}

	const params = {
		TableName: "Palettes",
		Item: {
			userId: userId,
			imageId: imageId,
			palette: reqBody.palette,
			imageUrl: imageUrl,
			thumbnailUrl: thumbnailUrl,
		},
	};

	try {
		const dynamoDbResult = await dynamoDB.put(params).promise();
		const response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify({ userId, imageId, imageUrl, thumbnailUrl }),
		};

		return response;
	} catch (error) {
		const response = {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify("Error writing data to DynamoDB"),
		};

		return response;
	}
};

const handleGet = async (event) => {
	const userId = event.headers.userid;

	const params = {
		TableName: "Palettes",
		KeyConditionExpression: "userId = :userId",
		ExpressionAttributeValues: {
			":userId": userId,
		},
	};

	try {
		const data = await dynamoDB.query(params).promise();
		const response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify(data.Items),
		};

		return response;
	} catch (error) {
		const response = {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify("Error fetching data from DynamoDB"),
		};

		return response;
	}
};

const handleDelete = async (event) => {
	const userId = event.headers.userid;
	const imageId = event.pathParameters.imageId;
	console.log("IMAGE ID: ", imageId);
	const params = {
		TableName: "Palettes",
		Key: {
			userId: userId,
			imageId: imageId,
		},
	};

	try {
		const data = await dynamoDB.delete(params).promise();
		const response = {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify({ message: "Delete successful", data: data }),
		};

		return response;
	} catch (error) {
		const response = {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			},
			body: JSON.stringify({
				message: "Error deleting data from DynamoDB",
				data: data,
			}),
		};

		return response;
	}
};
