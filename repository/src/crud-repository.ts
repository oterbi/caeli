import {
  DeleteItemCommand,
  DeleteItemInput,
  DynamoDBClient,
  GetItemCommand,
  GetItemInput,
  GetItemOutput,
  PutItemCommand,
  PutItemInput,
  UpdateItemCommand,
  UpdateItemInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ApiResponse, errorResponse, successResponse } from "@caeli/utils";
import { APIGatewayProxyResult } from "aws-lambda";
import { Marks } from "./constants/marks";
import { RepositoryConfig } from "./models/repository-config";

/**
 * Generic repository class
 */
export class CrudRepository {
  // ~ Attributes
  // ======================================================

  private config: RepositoryConfig;
  private client: DynamoDBClient;

  // ~ Constructor
  // ======================================================

  constructor(config: RepositoryConfig) {
    this.config = config;
    this.client = new DynamoDBClient({ region: config.region });
  }

  // ~ Methods
  // ======================================================

  /**
   * Saves a new item with the given item attribute values
   * @param item the attribute values
   * @returns the API Gateway proxy result
   */
  public async create(item: {
    [key: string]: any;
  }): Promise<APIGatewayProxyResult> {
    try {
      const params: PutItemInput = {
        TableName: this.config.table,
        Item: marshall(item),
      };

      await this.client.send(new PutItemCommand(params));

      const response: ApiResponse = {
        message: "The item was successfully saved",
      };

      return successResponse(response);
    } catch (error) {
      const response: ApiResponse = {
        error: "An error ocurred saving the item",
        data: error,
      };

      return errorResponse(response);
    }
  }

  /**
   * Gets the item with the given key
   * @param key the item key
   * @returns the API Gateway proxy result
   */
  public async read(key: {
    [key: string]: any;
  }): Promise<APIGatewayProxyResult> {
    try {
      const params: GetItemInput = {
        TableName: this.config.table,
        Key: marshall(key),
      };

      const result: GetItemOutput = await this.client.send(
        new GetItemCommand(params)
      );

      const response: ApiResponse = {
        data: result.Item ? unmarshall(result.Item) : result.Item,
      };

      return successResponse(response);
    } catch (error) {
      const response: ApiResponse = {
        error: "An error ocurred reading the item",
        data: error,
      };

      return errorResponse(response);
    }
  }

  /**
   * Updates the item with the given key and the given attribute values
   * @param key the item key
   * @returns the API Gateway proxy result
   */
  public async update(
    key: {
      [key: string]: any;
    },
    values: {
      [key: string]: any;
    }
  ): Promise<APIGatewayProxyResult> {
    try {
      let updateExpression: string = "set";
      let expressionAttributeValues: { [key: string]: any } = {};

      const keys: string[] = Object.keys(values);

      keys.forEach((value, index) => {
        const name: string = Marks.Colons.concat(index.toString());

        updateExpression = updateExpression
          .concat(Marks.Space)
          .concat(value)
          .concat(Marks.Equal)
          .concat(name);

        if (index < keys.length - 1) {
          updateExpression = updateExpression.concat(Marks.Comma);
        }

        expressionAttributeValues[name] = values[value];
      });

      const params: UpdateItemInput = {
        TableName: this.config.table,
        Key: marshall(key),
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: marshall(expressionAttributeValues),
      };

      await this.client.send(new UpdateItemCommand(params));

      const response: ApiResponse = {
        message: "The item was successfully updated",
      };

      return successResponse(response);
    } catch (error) {
      const response: ApiResponse = {
        error: "An error ocurred updating the item",
        data: error,
      };

      return errorResponse(response);
    }
  }

  /**
   * Deletes the item with the given key
   * @param key the item key
   * @returns the API Gateway proxy result
   */
  public async delete(key: {
    [key: string]: any;
  }): Promise<APIGatewayProxyResult> {
    try {
      const params: DeleteItemInput = {
        TableName: this.config.table,
        Key: marshall(key),
      };

      await this.client.send(new DeleteItemCommand(params));

      const response: ApiResponse = {
        message: "The item was successfully deleted",
      };

      return successResponse(response);
    } catch (error) {
      const response: ApiResponse = {
        error: "An error ocurred deleting the item",
        data: error,
      };

      return errorResponse(response);
    }
  }
}
