#!/usr/bin/node
/* script to detect when checkbox of amenities changes and list the amenities checked*/

$(function() {
  const amenities_dict = {};
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
      let amenities = ""
      for (const amenity in amenities_dict) {
        amenities += amenities_dict[amenity] + ', ';
      }
 
      const h4 = $('.amenities h4');
      if (JSON.stringify(amenities_dict) !== '{}') {
        h4.text(amenities);
        h4.css({'text-overflow': 'ellipsis', 'white-space': 'nowrap'});
      } else {
        h4.html('&nbsp;');
      }

    });
})
