#!/usr/bin/node
/* script to detect when checkbox of amenities changes and list the amenities checked*/

$(function() {
  const amenities_dict = {};
  let amenityIds = [];
  let amen = {};
  const checkbox = $(".popover ul li input");
  console.log(checkbox);
  checkbox.on('change', function()
    {
      console.log(this.checked);
      if (this.checked) {
        amenities_dict[this.getAttribute('data-id')] = this.getAttribute('data-name');
        console.log(this.getAttribute('data-id'));
      } else {
        delete amenities_dict[this.getAttribute('data-id')];
      }
    

      console.log(amenities_dict);
      let amenities = "";
      amenityIds = [];
      for (const amenity in amenities_dict) {
        amenities += amenities_dict[amenity] + ', ';
        amenityIds.push(amenity);
      }
      amen.amenities = amenityIds;
 
      const h4 = $('.amenities h4');
      if (JSON.stringify(amenities_dict) !== '{}') {
        h4.text(amenities);
        h4.css({'text-overflow': 'ellipsis', 'white-space': 'nowrap'});
      } else {
        h4.html('&nbsp;');
      }

    });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/v1/status/',
    success: function(data) {
      console.log(data.status);
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function() {
      $('div#api_status').removeClass('available');
    }
  });

    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      success: function(places) {
        console.log(places);
        $.each(places, function(i, place) {
          let guests = "";
          if (place.max_guest != 1) {
            guests = "s";
	  }

          let rooms = "";
          if (place.number_rooms != 1) {
            rooms = "s";
	  }

          let baths = "";
          if (place.number_bathrooms != 1) {
            baths = "s";
	  }

          $('section.places').append(`<article>
	    <div class="title_box">
	      <h2>${place.name}</h2>
	      <div class="price_by_night">${place.price_by_night}</div>
	    </div>
	    <div class="information">
	      <div class="max_guest">${place.max_guest} Guest${guests}</div>
	      <div class="number_rooms">${place.number_rooms} Bedroom${rooms}</div>
	      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${baths}</div>
	    </div>
	    <div class="user">
	    </div>
	    <div class="description">
	      ${place.description}
	    </div>
	  </article>`);
        });
      }
    });

  $('button').on('click', function() {
    console.log(amen);
    console.log(`amenityIds: ${amenityIds}`);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify(amen),
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      success: function(places) {
        console.log(places);
        $('section.places').find('article').remove();
        $.each(places, function(i, place) {
          let guests = "";
          if (place.max_guest != 1) {
            guests = "s";
	  }

          let rooms = "";
          if (place.number_rooms != 1) {
            rooms = "s";
	  }

          let baths = "";
          if (place.number_bathrooms != 1) {
            baths = "s";
	  }

          $('section.places').append(`<article>
	    <div class="title_box">
	      <h2>${place.name}</h2>
	      <div class="price_by_night">${place.price_by_night}</div>
	    </div>
	    <div class="information">
	      <div class="max_guest">${place.max_guest} Guest${guests}</div>
	      <div class="number_rooms">${place.number_rooms} Bedroom${rooms}</div>
	      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${baths}</div>
	    </div>
	    <div class="user">
	    </div>
	    <div class="description">
	      ${place.description}
	    </div>
	  </article>`);
        });
      }
    });
  });
});
