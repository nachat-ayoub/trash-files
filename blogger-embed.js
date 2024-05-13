window.onload = function() {

    
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
  
    
  // Function to parse URL query parameters
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Check if the &quot;v&quot; query parameter exists
  const videoParam = getQueryParam(&quot;v&quot;);
  if (videoParam) {
    

	const data = decodeJSON(videoParam)
    console.log({data})
    if(data &amp;&amp; data?.w &amp;&amp; data?.p &amp;&amp; data?.b &amp;&amp; data?.n) {

    // Get the element with ID &quot;watch-container&quot;
    const watchContainer = document.getElementById(&quot;watch-container&quot;);
    // If the element exists, set its innerHTML to the specified iframe code
    if (watchContainer) {
      watchContainer.innerHTML = `
        <iframe class='w-100' src='${data.w}' style='aspect-ratio:16/9;'/>

        <div class='d-flex justify-content-between mt-3'>
          <a class='btn btn-primary' href='${data.p}'>Prev</a>
          <a class='btn btn-secondary' href='${data.b}'>Back</a>
          <a class='btn btn-success' href='${data.n}'>Next</a>
        </div>
    `;
    }
    }
  }
};
