const dateConversion = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
  convertTime: function (returnHour, returnMinute) {
    let meridiem = "am";
    let returnStatement = returnHour;

    if (returnHour > 12) {
      returnStatement = returnHour - 12;
      meridiem = "pm";
    } //  else if (returnHour = 12) {
    //   meridiem = "pm";
    //   returnStatement = returnHour;
    else {
      meridiem = "am";
      returnStatement = returnHour;
    }

    if (returnMinute >= 10) {
      returnStatement += ":" + returnMinute;
    }
    return returnStatement += meridiem;
  }
};

const weekDay = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};