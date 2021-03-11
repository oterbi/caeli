/**
 * Encodes the given object key
 * @param key the object key
 * @returns the base64 encoded key
 */
export declare function encodeKey(key: {
    [key: string]: any;
}): string;
/**
 * Decodes the given base64 encoded key
 * @param key the base64 encoded key
 * @returns the object key
 */
export declare function decodeKey(key: string): {
    [key: string]: any;
};
