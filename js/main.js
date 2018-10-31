//Determines which date range is being selected on form
const checkRange = () => {
  let dateRange = document.getElementsByClassName("data_range");
  for (var i = 0; i < dateRange.length; i++) {
    if (dateRange[i].selected == true) {
      return dateRange[i].value;
    }
  }
}
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
}

$(document).ready(function () {
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

  $('form').submit(function (evt) {
    evt.preventDefault();
    let eventSearch = document.getElementById('eventName').value;
    let eventLocation = document.getElementById('location').value;
    $.getJSON(settingsEvent, {
        //Parameters for API Call
        q: eventSearch,
        page: 1,
        // price: "free",
        sort_by: "date",
        "start_date.keyword": checkRange(),
        "location.address": eventLocation,
        "location.within": "25mi"
      },
      function (data) { //Call back function
        console.log(eventLocation);
        console.log(data.events);
        let apiResults = "<div class ='resultList'>";
        let dataEvents = data.events;
        //Prints <div> containing API results
        for (let i = 0; i < dataEvents.length; i++) {
          confirmDate(dataEvents[i].start.local, i);

          // console.log("API Number: " + i + " " + data.events[i].logo);
          apiResults += "<div class='resultDetail clearfix'>"

          if (data.events[i].logo != null) {
            apiResults += "<img clas = 'logoImg' src= '" + dataEvents[i].logo.url + "'/>";
          }
          apiResults += "<a href = '" + dataEvents[i].url + "'>" + dataEvents[i].name.text + "</a>" + "<p class = 'dateTime'>" + confirmDate(dataEvents[i].start.local, i) + "</p>";
          apiResults += "</div>";
        }
        apiResults += "</div>";
        $('#resultWrapper').html(apiResults);
        $('html,body').animate({
            scrollTop: $("#resultWrapper").offset().top
          },
          500);
      }); // end Json
  }); // end ready
}); // End Form Submit