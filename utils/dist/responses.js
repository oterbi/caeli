"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.badRequestResponse = exports.successResponse = void 0;
const headers_1 = require("./constants/headers");
const status_codes_1 = require("./constants/status-codes");
/**
 * Generates a success response with the given body
 * @param response the response body
 * @returns the success response
 */
function successResponse(body) {
    return generateResponse(status_codes_1.StatusCodes.Ok, body);
}
exports.successResponse = successResponse;
/**
 * Generates a bad request response with the given body
 * @param response the response body
 * @returns the bad request response
 */
function badRequestResponse(body) {
    return generateResponse(status_codes_1.StatusCodes.BadRequest, body);
}
exports.badRequestResponse = badRequestResponse;
/**
 * Generates an error response with the given body
 * @param response the response body
 * @returns the error response
 */
function errorResponse(body) {
    return generateResponse(status_codes_1.StatusCodes.InternalServerError, body);
}
exports.errorResponse = errorResponse;
/**
 * Generates a generic response with the given status code and body
 * @param statusCode the status code
 * @param body the body
 * @returns the generic response
 */
function generateResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: headers_1.HEADERS,
        body: JSON.stringify(body),
    };
}
