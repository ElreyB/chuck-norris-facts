$(document).ready(function() {
  console.log("I am ready!");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=chuck%norris";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // var random = Math.floor(Math.random() * response.data.length) + 1;
    console.log(response.data);
    const results = response.data;
    results.forEach((gif, i) => {
      const gifUrl = gif.images.original.url;
      const carouselItemEl =
        i === 0
          ? $(`<div class="carousel-item active">`)
          : $(`<div class="carousel-item">`);
      const img = $("<img>");
      img.attr({ src: gifUrl, class: "d-block w-100", alt: "gif" });
      carouselItemEl.append(img);
      $(".carousel-inner").append(carouselItemEl);
    });
  });
});
