
/**
 * Decodes an obfuscated string back to a JSON object.
 * @param {string} obfuscatedString - The obfuscated string to be decoded.
 * @returns {object} The JSON object.
 */
function decodeJSON(obfuscatedString) {
  // 1. Base64 decode and parse JSON
  let decoded = atob(obfuscatedString);

  // 2. remap original characters
  const mapping = {
    '","': "~",
    "','": "~",
    '":"': "@",
    "':'": "@",
    '{"': "$",
    "{'": "$",
    '"}': "!",
    "'}": "!"
  };

  for (const key in mapping) {
    const val = mapping[key];
    decoded = decoded.replaceAll(val, key);
  }
  const jsonObject = JSON.parse(decoded);

  console.log(jsonObject)
  return jsonObject;
}
