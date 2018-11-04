const filterObject = {
  0: 'dayFilter',
  1: 'paidFilter',
  2: 'categoryFilter'
};

const filterFor = {
  'categoryFilter': 'category_id',
  'paidFilter': 'is_free'
};

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
    apiResults += "</div>";
  }
  apiResults += "</div>";
  // let apiResults = originalRequest(data.events);

  $('#resultWrapper').html(apiResults);
  $('html,body').animate({
      scrollTop: $("#searchResults").offset().top
    },
    500);
};

const adjustResults = (dataEvents, filterType, filterValue) => {

  if (filterType == 'category_id') {
    const newPrint = [];
    for (let i = 0; i < dataEvents.length; i++) {
      // console.log(categories.getCategory(dataEvents[i]["category_id"]));
      if (filterValue == categories.getCategory(dataEvents[i]["category_id"])) {
        apiParameters.categories = dataEvents[i]["category_id"];
        console.log(dataEvents[i]["category_id"]);
        console.log(dataEvents[i]);
        newPrint.push(dataEvents[i]);
        console.log(newPrint);

      }
    }
    printScreen(newPrint);
  }

};
//Determines which date range is being selected on form
const checkRange = () => {
  let dateRange = document.getElementsByClassName("data_range");
  for (var i = 0; i < dateRange.length; i++) {
    if (dateRange[i].selected == true) {
      return dateRange[i].value;
    }
  }
};