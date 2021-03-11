"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const utils_1 = require("@caeli/utils");
const marks_1 = require("./constants/marks");
/**
 * Generic repository class for the Caeli API
 */
class CrudRepository {
    // ~ Constructor
    // ======================================================
    constructor(config) {
        this.config = config;
        this.client = new client_dynamodb_1.DynamoDBClient({ region: config.region });
    }
    // ~ Methods
    // ======================================================
    /**
     * Saves a new item with the given item attribute values
     * @param item the attribute values
     * @returns the API Gateway proxy result
     */
    async create(item) {
        try {
            const params = {
                TableName: this.config.table,
                Item: util_dynamodb_1.marshall(item),
            };
            await this.client.send(new client_dynamodb_1.PutItemCommand(params));
            const response = {
                message: "The item was successfully saved",
            };
            return utils_1.successResponse(response);
        }
        catch (error) {
            const response = {
                error: "An error ocurred saving the item",
                data: error,
            };
            return utils_1.errorResponse(response);
        }
    }
    /**
     * Gets the item with the given key
     * @param key the item key
     * @returns the API Gateway proxy result
     */
    async read(key) {
        try {
            const params = {
                TableName: this.config.table,
                Key: util_dynamodb_1.marshall(key),
            };
            const result = await this.client.send(new client_dynamodb_1.GetItemCommand(params));
            const response = {
                data: result.Item ? util_dynamodb_1.unmarshall(result.Item) : result.Item,
            };
            return utils_1.successResponse(response);
        }
        catch (error) {
            const response = {
                error: "An error ocurred reading the item",
                data: error,
            };
            return utils_1.errorResponse(response);
        }
    }
    /**
     * Updates the item with the given key and the given attribute values
     * @param key the item key
     * @returns the API Gateway proxy result
     */
    async update(key, values) {
        try {
            let updateExpression = "set";
            let expressionAttributeValues = {};
            const keys = Object.keys(values);
            keys.forEach((value, index) => {
                const name = marks_1.Marks.Colons.concat(index.toString());
                updateExpression = updateExpression
                    .concat(marks_1.Marks.Space)
                    .concat(value)
                    .concat(marks_1.Marks.Equal)
                    .concat(name);
                if (index < keys.length - 1) {
                    updateExpression = updateExpression.concat(marks_1.Marks.Comma);
                }
                expressionAttributeValues[name] = values[value];
            });
            console.log("Update expression:", updateExpression);
            console.log("Expression attributes values:", expressionAttributeValues);
            const params = {
                TableName: this.config.table,
                Key: util_dynamodb_1.marshall(key),
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: util_dynamodb_1.marshall(expressionAttributeValues),
            };
            await this.client.send(new client_dynamodb_1.UpdateItemCommand(params));
            const response = {
                message: "The item was successfully updated",
            };
            return utils_1.successResponse(response);
        }
        catch (error) {
            const response = {
                error: "An error ocurred updating the item",
                data: error,
            };
            return utils_1.errorResponse(response);
        }
    }
    /**
     * Deletes the item with the given key
     * @param key the item key
     * @returns the API Gateway proxy result
     */
    async delete(key) {
        try {
            const params = {
                TableName: this.config.table,
                Key: util_dynamodb_1.marshall(key),
            };
            await this.client.send(new client_dynamodb_1.DeleteItemCommand(params));
            const response = {
                message: "The item was successfully deleted",
            };
            return utils_1.successResponse(response);
        }
        catch (error) {
            const response = {
                error: "An error ocurred deleting the item",
                data: error,
            };
            return utils_1.errorResponse(response);
        }
    }
}
exports.CrudRepository = CrudRepository;
