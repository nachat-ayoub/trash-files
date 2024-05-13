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
    "'}": "!",
  };

  for (const key in mapping) {
    const val = mapping[key];
    decoded = decoded.replaceAll(val, key);
  }
  const jsonObject = JSON.parse(decoded);

  return jsonObject;
}

// Function to parse URL query parameters
function getQueryParam(name) {
  const url = window.location.search;
  const regex = /v=([^&=?]*)/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

$(document).ready(function () {
  // Check if the 'v' query parameter exists
  const videoParam = getQueryParam("v");

  // Define the regular expression pattern to match the URL structure
  const urlPattern = /\/\d{4}\/\d{2}\/[^\/]+\.html\?v=.+/;

  // Get the current URL
  const currentURL = window.location.href;

  // Check if the current URL matches the pattern
  if (urlPattern.test(currentURL) && videoParam) {
    const data = decodeJSON(videoParam);

    if (data && data?.s && data?.p && data?.b && data?.n && data?.title) {
      $("#go-watch").html(
        `<a class='btn btn-purple mx-auto' href='#watch-container'>شاهد ${decodeURIComponent(data.title).replace('الحلقة' ,'شاهد الحلقة')}</a>`
      );
      // Get the element with ID 'watch-container'
      const watchContainer = $("<div id='watch-container'></div>");
      // Append the watchContainer after the article element
      $("article").after(watchContainer);

      watchContainer.html(`
          <ul class='servers list-unstyled d-flex flex-wrap justify-content-center align-items-center mt-2 mb-1'>
            ${data.s
              .split("|")
              .map((s) => s.replace("-", " ").split("_"))
              .map(
                (s, index) =>
                  `<li><button onclick="(() => { $('#watch').attr('src', '${
                    s[1]
                  }'); $('.btn-secondary').toggleClass('btn-secondary btn-outline-secondary'); $(this).toggleClass('btn-outline-secondary btn-secondary') })()"
               class="btn btn-sm btn-${
                 index === 0 ? "" : "outline-"
               }secondary m-1 text-capitalize">${s[0]}</button></li>`
              )
              .join("")}
          </ul>

          <iframe id='watch' class='w-100' style='aspect-ratio:16/9; background-color: rgba(57, 62, 71,0.35);' src='${
            data.s.split("|")[0].split("_")[1]
          }' allowfullscreen></iframe>
          
          <div class='d-flex align-items-center justify-content-between mt-1 mb-3'>
            <a class='btn btn-sm btn-purple pe-3' href='${data.p}'>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
              الحلقة السابقة
          </a>

            <a class='btn mx-1 btn-primary' href='${data.b}'>العودة</a>

            <a class='btn btn-sm btn-purple ps-3' href='${
              data.n
            }'>الحلقة التالية
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
            </a>
          </div>`);
    }
  }
});
