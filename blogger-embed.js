// After page load
$(document).ready(function () {
  let data = {
    title: "Koi wa Ameagari no You ni",
    eps: [
      {
        name: "الحلقة 12",
        embed: "https://www.mp4upload.com/embed-emq55af82zca.html"
      },
      {
        name: "الحلقة 11",
        embed: "https://www.mp4upload.com/embed-wrnrf03ik8av.html"
      },
      {
        name: "الحلقة 10",
        embed: "https://www.mp4upload.com/embed-j861fbak01vk.html"
      },
      {
        name: "الحلقة 9",
        embed: "https://www.mp4upload.com/embed-bbq9zbfbujhr.html"
      },
      {
        name: "الحلقة 8",
        embed: "https://www.mp4upload.com/embed-smswpg6l7e2i.html"
      },
      {
        name: "الحلقة 7",
        embed:
          "https://drive.google.com/file/d/1eh2yLsrV51_aMhEEDFfWbbYWCY60gfod/preview"
      },
      {
        name: "الحلقة 6",
        embed:
          "https://drive.google.com/file/d/1MD7c2lLt_8GxO_fN2I0-xs8bFvaSBVkA/preview"
      },
      {
        name: "الحلقة 5",
        embed: "https://www.mp4upload.com/embed-0qezqxpu13ap.html"
      },
      {
        name: "الحلقة 4",
        embed:
          "https://drive.google.com/file/d/145v1KhiZwzFAkcnDxWhUPPm6QA7u4uzO/preview"
      },
      {
        name: "الحلقة 3",
        embed: "https://www.mp4upload.com/embed-gva7bbefr7q6.html"
      },
      {
        name: "الحلقة 2",
        embed: "https://www.mp4upload.com/embed-sc4gkfc0dfj0.html"
      },
      {
        name: "الحلقة 1",
        embed: "https://www.mp4upload.com/embed-79hjdxnwkfo4.html"
      }
    ]
  };

  // Create a style element
  var mobileStyles = document.createElement("style");

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
  $("head").append(mobileStyles);

  $("#go-watch").html(
    `<a class='btn btn-purple' style='opacity:.6;' href='#'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" style="scale:1.6;"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg></a>`
  );
  // After 1 second, replace the SVG content with the title
  setTimeout(function () {
    $("#go-watch").html(
      `<a class='btn btn-purple responsive-fs' href='#watch-container'>
               شاهد ${data.title} 
       </a>`
    );
  }, 1500);
  // Get the element with ID 'watch-container'
  const watchContainer = $("<div id='watch-container'></div>");
  // Append the watchContainer after the article element
  $("article").after(watchContainer);

  watchContainer.html(`
          <!-- Container for Episode Viewer -->
<div id="episode-viewer" class='container'>
  <!-- Episodes List -->
  <ul id="episode-list" class="list-unstyled d-flex flex-wrap justify-content-center align-items-center mt-2 mb-1"></ul>
  <!-- Watch Container -->
  <div id="watch-container">
    <!-- Title -->
    <div class="pt-2">
      <div id="episode-title" class="btn btn-purple mx-auto mb-1 d-table responsive-fs"></div>
    </div>
    <!-- Episode Iframe -->
    <iframe id="watch" class="w-100" style="aspect-ratio:16/9; background-color: rgba(57, 62, 71,0.35);" allowfullscreen></iframe>
    <!-- Navigation Buttons -->
    <div class="d-flex align-items-center justify-content-between mt-1 mb-3 responsive-fs">
      <button id="prev-episode" class="btn btn-sm btn-purple pe-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
        الحلقة التالية
      </button> 
      <button id="next-episode" class="btn btn-sm btn-purple ps-3">
        الحلقة السابقة
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>

      </button>
    </div>
  </div>
</div>`);

  const episodes = data.eps;

  // Function to change the iframe src
  function changeIframeSrc(src) {
    $("#watch").attr("src", src);
  }

  $("#episode-title").text(anime.title);
  changeIframeSrc(episodes[0].embed);

  // Function to populate episodes
  function populateEpisodes() {
    const episodeList = $("#episode-list");

    episodes.forEach((episode, index) => {
      const button = $("<button>")
        .addClass(
          "btn btn-sm m-1 text-capitalize " +
            (index == episodes.length - 1
              ? "btn-secondary"
              : "btn-outline-secondary")
        )
        .text(episode.name)
        .on("click", function () {
          changeIframeSrc(episode.embed);
          $(".btn-secondary").toggleClass(
            "btn-secondary btn-outline-secondary"
          );
          $(this).toggleClass("btn-outline-secondary btn-secondary");
        });
      episodeList.append($("<li>").append(button));
    });
  }

  // Initialize
  populateEpisodes();

  // Previous Episode Button
  $("#prev-episode").on("click", function () {
    const buttons = $("#episode-list button");
    const selectedButton = buttons.filter(".btn-secondary");
    const prevButton = selectedButton.parent().prev().find("button");
    if (prevButton.length) {
      prevButton.trigger("click");
    }
  });

  // Next Episode Button
  $("#next-episode").on("click", function () {
    const buttons = $("#episode-list button");
    const selectedButton = buttons.filter(".btn-secondary");
    const nextButton = selectedButton.parent().next().find("button");
    if (nextButton.length) {
      nextButton.trigger("click");
    }
  });
});
