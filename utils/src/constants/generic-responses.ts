import { APIGatewayProxyResult } from "aws-lambda";
import { HEADERS } from "./headers";
import { StatusCodes } from "./status-codes";

/**
 * Generic error responses
 */
export const MISSING_KEY: APIGatewayProxyResult = {
  statusCode: StatusCodes.BadRequest,
  headers: HEADERS,
  body: JSON.stringify({
    error: "Missing key in the request",
  }),
};

export const NO_BODY_FOUND: APIGatewayProxyResult = {
  statusCode: StatusCodes.BadRequest,
  headers: HEADERS,
  body: JSON.stringify({
    error: "Missing body in the request",
  }),
};

export const MISSING_ELEMENTS: APIGatewayProxyResult = {
  statusCode: StatusCodes.BadRequest,
  headers: HEADERS,
  body: JSON.stringify({
    error: "Missing elements in the request",
  }),
};

export const METHOD_NOT_ALLOWED: APIGatewayProxyResult = {
  statusCode: StatusCodes.MethodNotAllowed,
  headers: HEADERS,
  body: JSON.stringify({
    error: "HTTP method not suported",
  }),
};
