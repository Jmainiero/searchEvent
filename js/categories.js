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
  121: 'Any Category',
  getCategory: function (categoryID) {

    if (categories[categoryID]) {
      return categories[categoryID];
    } else {
      return "Uncategorized";
    }
  }
};
//Creates dynamic <select> element to be printed to screen
const printFilters = {
  printPaid: function () {
    const paidFree = {
      0: "Paid",
      1: "Free",
      2: 'Any Price'
    };
    let priceDropDown = "<select id ='paidFilter' class ='filterDropDown'>";

    for (let i = 0; i < Object.values(paidFree).length; i++) {

      priceDropDown += "<option selected>" + paidFree[i] + "</option>";
    }
    priceDropDown += "</selected>";
    return priceDropDown;
  },
  printCategory: function () {
    let categoryDropDown = "<select id ='categoryFilter' class ='filterDropDown'>";
    for (let i = 0; i < Object.values(categories).length - 2; i++) {
      // console.log(Object.values(categories)[i]);
      categoryDropDown += "<option selected>" + Object.values(categories)[i] + "</option>";
    }
    categoryDropDown += "</selected>";
    return categoryDropDown;
  }
  // printDate: function () {
  //   const dateSelect = {
  //     0: "This Week",
  //     1: "Next Week",
  //     2: "This Weekend",
  //     3: "Next Weekend",
  //     4: "Next Month",
  //     5: "Tomorrow",
  //     6: "Today",
  //     7: "Any Date"
  //   };
  //   let dayDropDown = "<select id ='dayFilter' class ='filterDropDown'>";
  //   for (let i = 0; i < Object.keys(dateSelect).length; i++) {

  //     dayDropDown += "<option selected>" + dateSelect[i] + "</option>";
  //   }
  //   dayDropDown += "</selected>";
  //   return dayDropDown;
  // }
};