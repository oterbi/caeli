"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeKey = exports.encodeKey = void 0;
/**
 * Encodes the given object key
 * @param key the object key
 * @returns the base64 encoded key
 */
function encodeKey(key) {
    const encoded = Buffer.from(JSON.stringify(key));
    return encoded.toString();
}
exports.encodeKey = encodeKey;
/**
 * Decodes the given base64 encoded key
 * @param key the base64 encoded key
 * @returns the object key
 */
function decodeKey(key) {
    const decoded = Buffer.from(key, "base64");
    return JSON.parse(decoded.toString());
}
exports.decodeKey = decodeKey;
