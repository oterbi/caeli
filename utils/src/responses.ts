import { APIGatewayProxyResult } from "aws-lambda";
import { HEADERS } from "./constants/headers";
import { StatusCodes } from "./constants/status-codes";
import { ApiResponse } from "./models/api-response";

/**
 * Generates a success response with the given body
 * @param response the response body
 * @returns the success response
 */
export function successResponse(body: ApiResponse): APIGatewayProxyResult {
  return generateResponse(StatusCodes.Ok, body);
}

/**
 * Generates a bad request response with the given body
 * @param response the response body
 * @returns the bad request response
 */
export function badRequestResponse(body: ApiResponse): APIGatewayProxyResult {
  return generateResponse(StatusCodes.BadRequest, body);
}

/**
 * Generates an error response with the given body
 * @param response the response body
 * @returns the error response
 */
export function errorResponse(body: ApiResponse): APIGatewayProxyResult {
  return generateResponse(StatusCodes.InternalServerError, body);
}

/**
 * Generates a generic response with the given status code and body
 * @param statusCode the status code
 * @param body the body
 * @returns the generic response
 */
function generateResponse(statusCode: number, body: ApiResponse) {
  return {
    statusCode: statusCode,
    headers: HEADERS,
    body: JSON.stringify(body),
  };
}
