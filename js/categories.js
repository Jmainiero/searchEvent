$(document).ready(function () {
  //OAuth for API Call
  const settingsEvent = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.eventbriteapi.com/v3/categories/",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer VDKBJN4WPOGWGIVHXVLJ",
    }
  };

  $.getJSON(settingsEvent, {
      //Parameters for API Call
    },
    function (data) { //Call back function
      console.log(data);
      for (let i = 0; i < data.categories.length; i++) {
        console.log(data.categories[i].id + " " + data.categories[i]["short_name"]);
      }
    }); // end Json
});



const categories = {
  101: 'Business',
  110: 'Food & Drink',
  113: 'Community',
  105: 'Arts',
  104: 'Film & Media',
  108: 'Sports & Fitness',
  107: 'Health',
  102: 'Science & Techn',
  109: 'Travel & Outdoor',
  111: 'Charity & Causes',
  114: 'Spirituality',
  115: 'Family & Education',
  116: 'Holiday',
  112: 'Government',
  106: 'Fashion',
  117: 'Home & Lifestyle',
  118: 'Auto, Boat & Air',
  119: 'Hobbies',
  199: 'Other',
  120: 'School',
  121: 'Any Date',
  getCategory: function (categoryID) {

    if (categories[categoryID]) {
      // console.log(categories[categoryID]);
      return categories[categoryID];
    } else {
      // console.log("Doesnt exist");
      return "Uncategorized";
    }
  }
};

const printFilters = {
  printPaid: function () {
    const paidFree = {
      0: "Paid",
      1: "Free",
      2: 'Any Price'
    };
    let priceDropDown = "<select class ='filterDropDown'>";

    for (let i = 0; i < 2; i++) {

      priceDropDown += "<option selected>" + paidFree[i] + "</option>";
    }
    priceDropDown += "</selected";
    return priceDropDown;
  },
  printCategory: function () {
    let categoryDropDown = "<select class ='filterDropDown'>";
    for (let i = 0; i < Object.values(categories).length - 2; i++) {
      console.log(Object.values(categories)[i]);
      categoryDropDown += "<option selected>" + Object.values(categories)[i] + "</option>";
    }
    categoryDropDown += "</selected";
    return categoryDropDown;
  },
  printDate: function () {
    const dateSelect = {
      0: "This Week",
      1: "Next Week",
      2: "This Weekend",
      3: "Next Weekend",
      4: "Next Month",
      5: "Tomorrow",
      6: "Today",
      7: "Any Date"
    };
    let dayDropDown = "<select class ='filterDropDown'>";
    for (let i = 0; i < Object.keys(dateSelect).length; i++) {

      dayDropDown += "<option selected>" + dateSelect[i] + "</option>";
    }
    dayDropDown += "</selected";
    return dayDropDown;
  }
};