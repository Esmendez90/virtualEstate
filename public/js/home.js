let rentalListing = document.getElementById("rentalListing");
let propStatus = document.getElementById("propStatus");
let citySearch = document.getElementById("city_search");
let stateSearch = document.getElementById("state_search");
let city;
let state;
let key = config.X_RAPIDAPI_KEY;
let host = config.X_RAPIDAPI_HOST;

$("#search_btn").on("click", function (event) {
  event.preventDefault();

  if (citySearch.value === "" || stateSearch.value === "") {
    alert("Please, enter a city and state to complete your search.");
  } else {
    city = encodeURI($("#city_search").val().trim());
    state = $("#state_search").val().trim();
    choosePropStatus();
  }
});

// Choose between rentals or for sale
function choosePropStatus() {
  propStatus.style.display = "block";
  // Rental button displays properties
  $("#rentalBtn").on("click", function (event) {
    event.preventDefault();
    searchForRent(city, state);
    propStatus.style.display = "none";
  });

  // On sale button will display properties
  $("#onSaleBtn").on("click", function (event) {
    event.preventDefault();
    searchOnSale(city, state);
    propStatus.style.display = "none";
  });
}

// Rentals search
function searchForRent(city, state) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?city=${city}&state_code=${state}&limit=10&offset=0&sort=relevance`,
    method: "GET",
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    },
  };
  $.ajax(settings).done(function (response) {
    let listings = response.listings;
    // console.log(listings);
    showListings(listings);
  });
}

// Rental Listings
function showListings(listings) {
  rentalListing.style.display = "block";
  for (let i = 0; i < listings.length; i++) {
    let propPhoto = listings[i].photo;
    let propStatus = listings[i].prop_status;
    let propPrice = listings[i].price;
    let propAddress = listings[i].address;
    let propBaths = listings[i].baths;
    let propBeds = listings[i].beds;

    $("#propListing").append(
      `
      <div id="cardListing" class="card">
        <img src="${propPhoto}" id="propertyImg" class="card-img-top" alt="Property house" />
          <div class="card-body">
            <p class="card-text">Property Status: ${propStatus}</p>
             <p class="card-text">Price: ${propPrice}</p>
             <p class="card-text">Address: ${propAddress}</p>
             <p class="card-text">Bathrooms: ${propBaths}</p>
            <p class="card-text">Beds: ${propBeds}</p>
          </div>
      </div>
      `
    );
  }
}

// For sale search
function searchOnSale(city, state){
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=${state}&city=${city}&offset=0&limit=10&sort=relevance`,
    "method": "GET",
    "headers": {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    },
  };
  
  $.ajax(settings).done(function (response) {
    let listings = response.listings;
    // console.log(listings);
    showListings(listings);
  });
}