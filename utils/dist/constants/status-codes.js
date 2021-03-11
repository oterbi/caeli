"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCodes = void 0;
/**
 * The HTTP response status codes
 */
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["Ok"] = 200] = "Ok";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    StatusCodes[StatusCodes["InternalServerError"] = 500] = "InternalServerError";
})(StatusCodes = exports.StatusCodes || (exports.StatusCodes = {}));
