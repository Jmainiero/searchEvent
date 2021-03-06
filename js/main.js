  //OAuth for API Call
  const settingsEvent = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.eventbriteapi.com/v3/events/search/",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer VDKBJN4WPOGWGIVHXVLJ",
    }
  };

  //Converts Date functins into Day of the week and readbable hour + minutes
  const confirmDate = (apiDate) => {
    let postDate = apiDate;
    let testDate = new Date(postDate);
    let returnMonth = testDate.getMonth();
    let returnHour = testDate.getHours();
    let returnMinute = testDate.getMinutes();
    let returnDay = testDate.getDay();
    let finalDate = " " + weekDay[returnDay] + ", " + dateConversion[returnMonth] + " " + testDate.getDate() + ", " + dateConversion.convertTime(returnHour, returnMinute);
    return (finalDate);
  };
  //Prints Search Filters to screen
  const searchFilters = () => {
    let categoryFilter = printFilters.printCategory();
    let eventPrice = printFilters.printPaid();
    $('#searchFilters').html(categoryFilter);
    $('#searchFilters').append(eventPrice);
  };

  $(document).ready(function () {
    $('form').submit(function (evt) {
      evt.preventDefault();

      let eventSearch = document.getElementById('eventName').value;
      let eventLocation = document.getElementById('location').value;

      //API Parameters
      const apiParameters = {
        q: eventSearch,
        // price: "paid",
        sort_by: "date",
        "start_date.keyword": checkRange(),
        "location.address": eventLocation,
        "location.within": "25mi"
      };
      $.getJSON(settingsEvent, apiParameters,
        function (data) { //Call back function

          console.log(data.events);
          printScreen(data.events)
          searchFilters();
          // filterResults.originalData = data.events;
          //The following will determine a change on the search filters and determine which fitler and value was changed
          document.addEventListener("change", function (e) {
            for (let i = 0; i < Object.keys(filterObject).length; i++) {
              if (e.target && e.target.id == filterObject[i]) {
                const filteredItem = document.getElementById(filterObject[i]);
                let filterType = filterFor[filterObject[i]];
                let filterValue = filteredItem.value;
                adjustResults(data.events, filterType, filterValue);
              }
            }
          });
        }); // end Json
    }); // end ready
  }); // End Form Submit