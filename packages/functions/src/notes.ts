import * as uuid from 'uuid';
import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export async function list() {
  const getParams = {
    TableName: Table.Notes.tableName,
  };
  const results = await dynamoDb.scan(getParams).promise();

  return {
    statusCode: 200,
    body: results.Items,
  };
}

export const create = async(event) => {
    const data = JSON.parse(event?.body || '');

    const params = {
      TableName: Table.Notes.tableName,
      Item: {
          id: uuid.v4(),
          content: data.content, 
          userId: data.userId, 
          createdAt: Date.now(), 
      },
    };
  
    await dynamoDb.put(params).promise();
  
    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
}

  