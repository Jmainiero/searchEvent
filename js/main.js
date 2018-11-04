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

  const searchFilters = () => {
    // let dateFilter = printFilters.printDate();
    let categoryFilter = printFilters.printCategory();
    let eventPrice = printFilters.printPaid();
    $('#searchFilters').html(categoryFilter);
    // $('#searchFilters').append(dateFilter);
    $('#searchFilters').append(eventPrice);
  };
  let eventSearch;
  let eventLocation;
  const apiParameters = {
    q: eventSearch,
    // price: "paid",
    sort_by: "date",
    "start_date.keyword": checkRange(),
    "location.address": eventLocation,
    "location.within": "25mi"
  };
  $(document).ready(function () {
    $('form').submit(function (evt) {
      evt.preventDefault();
      apiParameters.q = document.getElementById('eventName').value;
      apiParameters["location.address"] = document.getElementById('location').value;
      $.getJSON(settingsEvent, apiParameters,
        function (data) { //Call back function

          console.log(data);
          printScreen(data.events)
          searchFilters();
          //The following will determine a change on the search filters and determine which fitler and value was changed
          document.addEventListener("change", function (e) {
            for (let i = 0; i < Object.keys(filterObject).length; i++) {
              if (e.target && e.target.id == filterObject[i]) {
                const filteredItem = document.getElementById(filterObject[i]);
                let filterType = filterFor[filterObject[i]];
                let filterValue = filteredItem.value;
                adjustResults(data.events, filterType, filterValue);
                // console.log(dataEvents[i]["category_id"]);
                // console.log(filterValue);
                // console.log(filterType);
              }
            }
          });
        }); // end Json
    }); // end ready
  }); // End Form Submit