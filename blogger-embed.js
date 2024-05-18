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
  const jsonObject = JSON.parse(decodeURIComponent(decoded));

  return jsonObject;
}

// Function to parse URL query parameters
function getQueryParam(name) {
  const url = window.location.search;
  const regex = /v=([^&=?]*)/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

// Function to change the iframe src
function changeIframeSrc(src) {
  $('#watch').attr('src', src);
}

// After page load
$(document).ready(function () {
  // Check if the 'v' query parameter exists
  const videoParam = getQueryParam("v");

  // Define the regular expression pattern to match the URL structure
  const urlPattern = /\/\d{4}\/\d{2}\/[^\/]+\.html\?v=.+/;

  // Get the current URL
  const currentURL = window.location.href;

  // Check if the current URL matches the pattern
  if (urlPattern.test(currentURL) && videoParam) {
    let data = decodeJSON(decodeURIComponent(videoParam));
    
    if (data && data?.title && data?.eps) {

      // Create a style element
      var mobileStyles = document.createElement('style');
     
      // Add the CSS rule to the style element
      mobileStyles.textContent = `
        .btn-purple {
          background-color: #8614f8;
          background-image: linear-gradient(#8614f8 0, #760be0 100%);
          border-radius: 5px;
          border-style: none;
          box-shadow: rgba(245, 244, 247, 0.25) 0 1px 1px inset;
          color: #fff;
          display: inline-block;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.05, 0.03, 0.35, 1);
          touch-action: manipulation;
          vertical-align: bottom;
         }
    
        .btn-purple:hover {
          opacity: 0.8;
          color:#fff;
        }
        .responsive-fs {
            /* Default font size for all devices */
            font-size: 1rem !important;
          }
          
          @media (max-width: 768px) {  /* Target screens smaller than 768px (common mobile breakpoint) */
            .responsive-fs {
              font-size: 0.85rem !important;  /* Adjust font size for mobile */
            }
          }`;
      $('head').append(mobileStyles);
      
      $("#go-watch").html(
        `<a class='btn btn-purple responsive-fs' href='#watch-container'>
            ${decodeURIComponent(data.title).replace('الحلقة', 'شاهد الحلقة')}
        </a>`
      );

      // Get the element with ID 'watch-container'
      const watchContainer = $("<div id='watch-container'></div>");
      // Append the watchContainer after the article element
      $("article").after(watchContainer);

      let episodesHtml = data.eps.map((ep, index) => 
        `<li>
          <button onclick="(() => { 
            changeIframeSrc('${ep.embed}');
            $('.btn-secondary').toggleClass('btn-secondary btn-outline-secondary');
            $(this).toggleClass('btn-outline-secondary btn-secondary');
          })()"
          class="btn btn-sm btn-${index === 0 ? '' : 'outline-'}secondary m-1 text-capitalize">
            ${ep.name}
          </button>
        </li>`
      ).join("");

      watchContainer.html(`
        <div class='pt-2'>
          <div class='btn btn-purple mx-auto mb-1 d-table responsive-fs'>${decodeURIComponent(data.title)}</div>
        </div>
        <ul class='servers list-unstyled d-flex flex-wrap justify-content-center align-items-center mt-2 mb-1'>
          ${episodesHtml}
        </ul>

        <iframe id='watch' class='w-100' style='aspect-ratio:16/9; background-color: rgba(57, 62, 71,0.35);' src='${data.eps[0].embed}' allowfullscreen></iframe>
        
        <div class='d-flex align-items-center justify-content-between mt-1 mb-3 responsive-fs'>
          <button class='btn btn-sm btn-purple pe-3' id='prev-episode'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M15 6l-6 6l6 6" />
            </svg>
            الحلقة السابقة
          </button>

          <button class='btn btn-sm mx-1 btn-primary' id='back-button'>العودة</button>

          <button class='btn btn-sm btn-purple ps-3 responsive-fs' id='next-episode'>
            الحلقة التالية
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </button>
        </div>`);

      let currentEpisodeIndex = 0;

      function updateEpisode(index) {
        if (index >= 0 && index < data.eps.length) {
          changeIframeSrc(data.eps[index].embed);
          currentEpisodeIndex = index;
        }
      }

      $('#prev-episode').on('click', function() {
        updateEpisode(currentEpisodeIndex - 1);
      });

      $('#next-episode').on('click', function() {
        updateEpisode(currentEpisodeIndex + 1);
      });

      $('#back-button').on('click', function() {
        window.history.back();
      });
    }
  }
});
