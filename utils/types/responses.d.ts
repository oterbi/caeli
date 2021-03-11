import { APIGatewayProxyResult } from "aws-lambda";
import { ApiResponse } from "./models/api-response";
/**
 * Generates a success response with the given body
 * @param response the response body
 * @returns the success response
 */
export declare function successResponse(body: ApiResponse): APIGatewayProxyResult;
/**
 * Generates a bad request response with the given body
 * @param response the response body
 * @returns the bad request response
 */
export declare function badRequestResponse(body: ApiResponse): APIGatewayProxyResult;
/**
 * Generates a method not allowed response with the given body
 * @param response the response body
 * @returns the method not allowed response
 */
export declare function notAllowedResponse(body: ApiResponse): APIGatewayProxyResult;
/**
 * Generates an error response with the given body
 * @param response the response body
 * @returns the error response
 */
export declare function errorResponse(body: ApiResponse): APIGatewayProxyResult;
