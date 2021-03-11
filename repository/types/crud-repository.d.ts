import { APIGatewayProxyResult } from "aws-lambda";
import { RepositoryConfig } from "./models/repository-config";
/**
 * Generic repository class for the Caeli API
 */
export declare class CrudRepository {
    private config;
    private client;
    constructor(config: RepositoryConfig);
    /**
     * Saves a new item with the given item attribute values
     * @param item the attribute values
     * @returns the API Gateway proxy result
     */
    create(item: {
        [key: string]: any;
    }): Promise<APIGatewayProxyResult>;
    /**
     * Gets the item with the given key
     * @param key the item key
     * @returns the API Gateway proxy result
     */
    read(key: {
        [key: string]: any;
    }): Promise<APIGatewayProxyResult>;
    /**
     * Updates the item with the given key and the given attribute values
     * @param key the item key
     * @returns the API Gateway proxy result
     */
    update(key: {
        [key: string]: any;
    }, values: {
        [key: string]: any;
    }): Promise<APIGatewayProxyResult>;
    /**
     * Deletes the item with the given key
     * @param key the item key
     * @returns the API Gateway proxy result
     */
    delete(key: {
        [key: string]: any;
    }): Promise<APIGatewayProxyResult>;
}
