/**
 * Encodes the given object key
 * @param key the object key
 * @returns the base64 encoded key
 */
export function encodeKey(key: { [key: string]: any }): string {
  const encoded: Buffer = Buffer.from(JSON.stringify(key));
  return encoded.toString();
}

/**
 * Decodes the given base64 encoded key
 * @param key the base64 encoded key
 * @returns the object key
 */
export function decodeKey(key: string): { [key: string]: any } {
  const decoded: Buffer = Buffer.from(key, "base64");
  return JSON.parse(decoded.toString());
}
