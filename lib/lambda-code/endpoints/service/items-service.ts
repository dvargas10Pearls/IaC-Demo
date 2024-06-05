import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

export class ItemsService {
  private static dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient()) 

  public static getItems = async () => {
    console.log("Running get items query");
    const command = new ScanCommand({
      TableName: process.env.DEMO_TABLE_NAME,
    });
    const dynamoResponse = await this.dynamoClient.send(command);
    console.log("Success getting items")

    return dynamoResponse.Items;
  }

  public static postItem = async (id: string) => {
    console.log("Running post item with ID: ", id)
    const command = new PutCommand({
      TableName: process.env.DEMO_TABLE_NAME,
      Item: {
        id
      },
    });
    await this.dynamoClient.send(command);
    console.log("Success posting item")
  }
}