$(document).ready(function() {
  var currentDate = moment().format("dddd MMM. Do, YYYY");
  $("#current-date").text(currentDate);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=chuck%norris";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    $("#quote-count").text(results.length);

    for (var i = 0; i < results.length; i++) {
      var gifUrl = results[i].images.original.url;

      var carouselItemEl = createCarouselItem(i);

      var img = $("<img>");
      img.attr({ src: gifUrl, class: "d-block w-100", alt: "gif" });

      carouselItemEl.append(img);

      chuckDevJoke(carouselItemEl);

      $(".carousel-inner").append(carouselItemEl);
    }
    // results.forEach((gif, i) => {
    //   var gifUrl = gif.images.original.url;
    //   var carouselItemEl = createCarouselItem(i);
    //   var img = $("<img>");
    //   img.attr({ src: gifUrl, class: "d-block w-100", alt: "gif" });
    //   carouselItemEl.append(img);
    //   chuckDevJoke(carouselItemEl);
    //   $(".carousel-inner").append(carouselItemEl);
    // });
  });

  function createCarouselItem(index) {
    var carouselItemEl =
      index === 0
        ? $("<div class='carousel-item active' data-interval='6000'>")
        : $("<div class=carousel-item data-interval='6000'>");
    return carouselItemEl;
  }

  function chuckDevJoke(element) {
    var queryURL =
      "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories";
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random?category=dev",
      method: "GET",
      headers: {
        "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
        "x-rapidapi-key": "26fcba3080msh3a2259b034b4c3dp1f9e01jsn7b1d1f231b17",
        accept: "application/json"
      }
    };
    $.ajax(settings).then(function(response) {
      var captionEl = $("<div></div>");
      captionEl.addClass("carousel-caption d-none d-md-block");
      var text = response.value;
      var textEl = $(`<h2>${text}</h2>`);
      captionEl.append(textEl);
      element.append(captionEl);
    });
  }
});
