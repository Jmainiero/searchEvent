const filterObject = {
  0: 'dayFilter',
  1: 'paidFilter',
  2: 'categoryFilter'
};

const filterFor = {
  'categoryFilter': 'category_id',
  'paidFilter': 'is_free'
};
//Recieves API response from Main.js and prints to screen || Also rewrites screen when search filters are selected
const printScreen = (dataEvents) => {
  let apiResults = "<div class ='resultList'>";

  //Prints <div> containing API results 
  for (let i = 0; i < dataEvents.length; i++) {
    confirmDate(dataEvents[i].start.local, i);
    apiResults += "<div class='resultDetail clearfix display" + categories.getCategory(dataEvents[i]["category_id"]) + "'>"

    if (dataEvents[i].logo != null) {
      apiResults += "<img clas = 'logoImg' src= '" + dataEvents[i].logo.url + "'/>";
    }
    apiResults += "<a href = '" + dataEvents[i].url + "'>" + dataEvents[i].name.text + "</a>" + "<p class = 'dateTime'>" + confirmDate(dataEvents[i].start.local, i) + "</p>" + "<p class = 'categoryID'>" + categories.getCategory(dataEvents[i]["category_id"]) + "</p>";
    // apiResults += "<p class = 'paidStatus'>" + dataEvents[i]["is_free"] + "</p>";
    apiResults += "</div>";
  }
  apiResults += "</div>";

  $('#resultWrapper').html(apiResults);
  $('html,body').animate({
      scrollTop: $("#searchResults").offset().top
    },
    500);
};
//Determines which search filter is being selected and what the value is. Will then send finalized informatiion to printScreen() to be sent displayed
const adjustResults = (dataEvents, filterType, filterValue) => {
  const newPrint = [];
  if (filterType == 'category_id') {
    for (let i = 0; i < dataEvents.length; i++) {
      if (filterValue == categories.getCategory(dataEvents[i]["category_id"])) {
        newPrint.push(dataEvents[i]);
      }
    }
    for (let i = 0; i < dataEvents.length; i++) {
      if (filterValue != categories.getCategory(dataEvents[i]["category_id"])) {
        newPrint.push(dataEvents[i]);
      }
    }
  }
  if (filterType == 'is_free') {
    if (filterValue === "Paid") {
      const isFree = false;
      for (let i = 0; i < dataEvents.length; i++) {
        if (isFree == dataEvents[i]["is_free"]) {
          newPrint.push(dataEvents[i]);
        }
      }
    } else {
      const isFree = true;
      for (let i = 0; i < dataEvents.length; i++) {
        if (isFree == dataEvents[i]["is_free"]) {
          newPrint.push(dataEvents[i]);
        }
      }
    }
  }
  printScreen(newPrint);
};

//Determines which date range is being selected on primary form
const checkRange = () => {
  let dateRange = document.getElementsByClassName("data_range");
  for (var i = 0; i < dateRange.length; i++) {
    if (dateRange[i].selected == true) {
      return dateRange[i].value;
    }
  }
};