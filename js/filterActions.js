const filterObject = {
  0: 'dayFilter',
  1: 'paidFilter',
  2: 'categoryFilter'
};

const filterFor = {
  'categoryFilter': 'category_id',
  'paidFilter': 'is_free'
};

const filterResults = {
  newPrint: [],
  adjustFilterPrint: [],
  categoryID: function (dataEvents, filterValue) {
    filterResults.newPrint = [];
    for (let i = 0; i < dataEvents.length; i++) {
      if (filterValue == categories.getCategory(dataEvents[i]["category_id"])) {
        filterResults.newPrint.push(dataEvents[i]);
      }
    }
    $("#paidFilter").val($("#paidFilter option:last").val());
  },
  paidFilter: function (dataEvents, filterValue) {
    filterResults.newPrint = [];
    if (filterValue === "Paid") {
      const isFree = false;
      for (let i = 0; i < dataEvents.length; i++) {
        if (isFree == dataEvents[i]["is_free"]) {
          filterResults.newPrint.push(dataEvents[i]);
        }
      }
    } else {
      const isFree = true;
      for (let i = 0; i < dataEvents.length; i++) {
        if (isFree == dataEvents[i]["is_free"]) {
          filterResults.newPrint.push(dataEvents[i]);
        }
      }
    }
  },
  categoryPaidFilter: function (filterValue, categoryValue) {
    const isFree = false;
    if (filterValue === "Paid") {
      filterResults.adjustFilterPrint = [];
      console.log(filterValue + ' Was selected');
      console.log(filterResults.newPrint);
      for (let i = 0; i < filterResults.newPrint.length; i++) {
        if (isFree === filterResults.newPrint[i]["is_free"] && categoryValue === categories.getCategory(filterResults.newPrint[i]["category_id"])) {
          filterResults.adjustFilterPrint.push(filterResults.newPrint[i]);
        }
      }
    } else {
      filterResults.adjustFilterPrint = [];
      for (let i = 0; i < filterResults.newPrint.length; i++) {
        if (isFree !== filterResults.newPrint[i]["is_free"] && categoryValue === categories.getCategory(filterResults.newPrint[i]["category_id"])) {
          filterResults.adjustFilterPrint.push(filterResults.newPrint[i]);
        }
      }
    }
  }
};
//Recieves API response from Main.js and prints to screen || Also rewrites screen when search filters are selected
const printScreen = (dataEvents) => {
  let apiResults = "<div class ='resultList'>";

  if (dataEvents.length == 0) {
    apiResults += "<h2 id ='resultsNull'>" + "No results found. Please try again." + "</h2>";
  } else {
    //Prints <div> containing API results 
    for (let i = 0; i < dataEvents.length; i++) {
      confirmDate(dataEvents[i].start.local, i);
      apiResults += "<div class='resultDetail clearfix display" + categories.getCategory(dataEvents[i]["category_id"]) + "'>"

      if (dataEvents[i].logo != null) {
        apiResults += "<img clas = 'logoImg' src= '" + dataEvents[i].logo.url + "'/>";
      }
      apiResults += "<a href = '" + dataEvents[i].url + "'>" + dataEvents[i].name.text + "</a>" + "<p class = 'dateTime'>" + confirmDate(dataEvents[i].start.local, i) + "</p>" + "<p class = 'categoryID'>" + categories.getCategory(dataEvents[i]["category_id"]) + "</p>";
      apiResults += "<p class = 'paidStatus'>" + dataEvents[i]["is_free"] + "</p>";
      apiResults += "</div>";
    }
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
  const categoryValue = document.getElementById('categoryFilter').value;
  if (filterType == 'category_id') {
    filterResults.categoryID(dataEvents, filterValue)
    printScreen(filterResults.newPrint);
  }
  if (filterType == 'is_free') {
    console.log(categoryValue);
    console.log(filterResults.newPrint);
    if (categoryValue != 'Any Category') {
      filterResults.categoryPaidFilter(filterValue, categoryValue);
      printScreen(filterResults.adjustFilterPrint);
    } else {
      filterResults.paidFilter(dataEvents, filterValue);
      printScreen(filterResults.newPrint);
    }
  }
};

//Determines which date range is being selected on primary form
const checkRange = () => {
  let dateRange = document.getElementsByClassName("data_range");
  for (let i = 0; i < dateRange.length; i++) {
    if (dateRange[i].selected == true) {
      return dateRange[i].value;
    }
  }
};