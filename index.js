//////////////// How This Calendar Works and Fair Vol Earings Explanation button //////////////////////
var coll = document.getElementsByClassName("ernVolInstruct");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//////////////// forward vol button //////////////////////
var coll = document.getElementsByClassName("forwardVol");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//////////////// time zone button //////////////////////
var coll = document.getElementsByClassName("timeZone");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//////////////// time zone button //////////////////////
var coll = document.getElementsByClassName("carryData");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//////////////// holidays button //////////////////////
var coll = document.getElementsByClassName("holidays");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// this section pushes todays date...
// sets the html id of nowDate......gives it a default value
// running a function onload was not working

  // the variable now is the new Date()....when new Date() is called it gives your the current time CST...
  // you don't have the date picker problem of today's date at 12am less 5 hrs...which makes the date equal to yday
  // however getFullMonth needs to add 1 bc its 0-11 and the date is adj by dayTimeFix to make sure it always has
  // two digits
  var now = new Date ();
  var gfy = now.getFullYear();
  var gm = now.getMonth() + 1;
  var gd = now.getDate();
  var gH = now.getHours();
  var gMin = now.getMinutes();
  var gS = now.getSeconds();
  var nowDefault = gfy+"-"+gm+"-"+gd ;

  // the functions dayTimeFix and monthTimeFix get the day and month in correct date picker format

  function dayTimeFix () {

    var check = gd-10;

    if (check < 0){
      return "0"+gd
    }
    else{
      return gd
    }
  }

  var gdFix = dayTimeFix();
  gdFix;


  function monthTimeFix () {

    var check = gm-10;

    if (check < 0){
      return "0"+gm
    }
    else{
      return gm
    }
  }

  var gmFix = monthTimeFix();
  gmFix;



  var nowDefaultFix = gfy+"-"+gmFix+"-"+gdFix ;
  nowDefaultFix;


  document.getElementById("nowDate").defaultValue = nowDefaultFix ;

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////






/// date picker will always return date at 12am (0 hour)...10-31-2020 at 12am (exact start of day)
/// The new Date () method goes by GMT time....so it takes in 10-31-2020 at 12am and adjusts it by
/// subtracting 5 hours.......therefore it returns 10-30-2020 at 7pm.
/// this function will take in the date picker date and add 1 day to the date and make the time 3pm
/// so 10-31-2020 in the date picker goes to 10-30-2020 in new Date () but we add a day back and
/// then set the time to 3pm
function pushFullStartDate() {
  var start = document.getElementById("nowDate").value ;
  var fullStartDate = new Date (start);

  var gFY = fullStartDate.getFullYear() ;
  var gM = fullStartDate.getMonth() ;
  var gDate = fullStartDate.getDate() + 1;
  var gDay = fullStartDate.getDay() ;

  var adjStartDate = new Date (gFY,gM,gDate,15,0,0,0) ;
  var gTZ = adjStartDate.getTimezoneOffset() ;

  document.getElementById("fullStartDate").value = adjStartDate ;
  document.getElementById("startDateTZoneOffset").value = gTZ ;
}


function pushFullExpirDate() {
  var expir = document.getElementById("expirationDate").value ;
  var fullExpirDate = new Date (expir);

  var gFY = fullExpirDate.getFullYear() ;
  var gM = fullExpirDate.getMonth() ;
  var gDate = fullExpirDate.getDate() + 1;
  var gDay = fullExpirDate.getDay() ;

  var adjExpirDate = new Date (gFY,gM,gDate,15,0,0,0) ;
  var gTZ = adjExpirDate.getTimezoneOffset() ;

  document.getElementById("fullExpirDate").value = adjExpirDate ;
  document.getElementById("expirDateTZoneOffset").value = gTZ
}




function pushMilli() {
  var adjFullStartDate = document.getElementById("fullStartDate").value ;
  var calcStartDateMilli = new Date (adjFullStartDate) ;
  document.getElementById("startDateMilli").value = calcStartDateMilli.getTime() ;

  var adjFullExpirDate = document.getElementById("fullExpirDate").value ;
  var calcExpirDateMilli = new Date (adjFullExpirDate) ;
  document.getElementById("expirDateMilli").value = calcExpirDateMilli.getTime() ;

  var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
  var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
  var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
  var milliPerMin = 1000 * 60 ;
  var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin ;

  var milliSecsToExpir = calcExpirDateMilli.getTime() - calcStartDateMilli.getTime() + adjTZMilli ;
  document.getElementById("milliToExpir").value = milliSecsToExpir ;

  var daysToExpir = milliSecsToExpir / millisecondsPerDay ;
  document.getElementById("dte").value = daysToExpir ;

}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//start trading days calc
document.getElementById("calc").addEventListener("click",yoYo) ;
document.getElementById("calc").addEventListener("click",stockBuySettleDate) ;
document.getElementById("calc").addEventListener("click",stockSellSettleDate) ;
document.getElementById("calc").addEventListener("click",optionBuySettleDate) ;
document.getElementById("calc").addEventListener("click",optionSellSettleDate) ;
document.getElementById("calc").addEventListener("click",pushStockSettleInMillisecs) ;
document.getElementById("calc").addEventListener("click",pushStockCarryDays) ;
document.getElementById("calc").addEventListener("click",pushOptionSettleInMillisecs) ;
document.getElementById("calc").addEventListener("click",pushOptionCarryDays) ;
document.getElementById("calc").addEventListener("click",ernVol) ;
document.getElementById("calc").addEventListener("click",impliedErnMove) ;
document.getElementById("calc2").addEventListener("click",pushFullExpir1Date) ;
document.getElementById("calc2").addEventListener("click",pushMilli1) ;
document.getElementById("calc2").addEventListener("click",yoYo1) ;
document.getElementById("calc2").addEventListener("click",pushFullExpir2Date) ;
document.getElementById("calc2").addEventListener("click",pushMilli2) ;
document.getElementById("calc2").addEventListener("click",yoYo2) ;
document.getElementById("calc2").addEventListener("click",pushForwardVol) ;
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
// yoYo function creates trading days
function yoYo() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = document.getElementById("dte").value * 1 ;
    var startDateInMilli = document.getElementById("startDateMilli").value * 1 ;
    var expirDateInMilli = document.getElementById("expirDateMilli").value * 1 ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////


  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0  ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  document.getElementById("tradingDays").value = seeTradingDaysToExpirList.length ;






///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// function createBankHolidayList() {
//   var holiday1 = document.getElementById("bankHolidayOne").value ;
//   var holiday2 = document.getElementById("bankHolidayTwo").value ;
//   var holiday3 = document.getElementById("bankHolidayThree").value ;
//   var holiday4 = document.getElementById("bankHolidayFour").value ;
//   var holiday5 = document.getElementById("bankHolidayFive").value ;
//   var holiday6 = document.getElementById("bankHolidaySix").value ;
//   var holiday7 = document.getElementById("bankHolidaySeven").value ;
//   var holiday8 = document.getElementById("bankHolidayEight").value ;
//   var holiday9 = document.getElementById("bankHolidayNine").value ;
//   var holiday10 = document.getElementById("bankHolidayTen").value ;
//   var holiday11 = document.getElementById("bankHolidayEleven").value ;
//   var holiday12 = document.getElementById("bankHolidayTwelve").value ;
//   var holiday13 = document.getElementById("bankHolidayThirteen").value ;
//   var holiday14 = document.getElementById("bankHolidayFourteen").value ;
//   var holiday15 = document.getElementById("bankHolidayFifteen").value ;
//   var holiday16 = document.getElementById("bankHolidaySixteen").value ;
//   var holiday17 = document.getElementById("bankHolidaySeventeen").value ;
//   var holiday18 = document.getElementById("bankHolidayEighteen").value ;
//   var holiday19 = document.getElementById("bankHolidayNineteen").value ;
//   var holiday20 = document.getElementById("bankHolidayTwenty").value ;
//   var holiday21 = document.getElementById("bankHolidayTwentyOne").value ;
//
//   var bankHolidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21] ;
//
//   return bankHolidayList
// }
//
// var seeBankHolidayList = createBankHolidayList() ;
// seeBankHolidayList;
//
//
// /////
// function creatBankHolidayListDateFormat() {
//   var count = 0 ;
//   var iter = 0 ;
//   var bankHolidayDateFormatList = [] ;
//
//   while (count < seeBankHolidayList.length) {
//     bankHolidayDateFormatList.push( new Date (seeBankHolidayList[count])) ;
//     count = count + 1 ;
//   }
//   return bankHolidayDateFormatList
// }
//
// var seeBankHolidayDateFormatList = creatBankHolidayListDateFormat() ;
// seeBankHolidayDateFormatList ;
//
// ////
// function createAdjBankHolidayDateFormatList() {
//   var count = 0 ;
//   var iter = 0 ;
//   var adjBankHolidayDateFormatList = [] ;
//
//   while (count < seeBankHolidayDateFormatList.length){
//     var gFY = seeBankHolidayDateFormatList[count].getFullYear() ;
//     var gM = seeBankHolidayDateFormatList[count].getMonth() ;
//     var gDate = seeBankHolidayDateFormatList[count].getDate() + 1 ;
//
//     var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
//     var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
//     var milliPerMin = 1000 * 60 ;
//     var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin ;
//     var milliPerHour = 1000 * 60 * 60 ;
//     var adjMilliHours = adjTZMilli / milliPerHour ;
//     var gHour = 15 + adjMilliHours ;
//
//
//     var adjBankHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;
//
//     adjBankHolidayDateFormatList.push(adjBankHolidayDateFormat) ;
//     count = count + 1 ;
//   }
//   return adjBankHolidayDateFormatList
// }
//
// var seeAdjBankHolidayDateFormatList =  createAdjBankHolidayDateFormatList() ;
// seeAdjBankHolidayDateFormatList ;
//
//
// ////
// function createScrubBankHolidayList() {
//   var count = 0;
//   var scrubBankHolidayList = []
//
//   while (count < seeTradingDaysToExpirList.length) {
//     var iter = 0 ;
//     while (iter < seeAdjBankHolidayDateFormatList.length) {
//       if (seeTradingDaysToExpirList[count][0].getTime() == seeAdjBankHolidayDateFormatList[iter].getTime() ) {
//         break;
//       }
//       else if (iter == seeAdjBankHolidayDateFormatList.length-1) {
//         scrubBankHolidayList.push(seeTradingDaysToExpirList[count]) ;
//         iter = iter + 1 ;
//       }
//       else {
//         iter = iter + 1 ;
//       }
//     }
//     count = count + 1 ;
//   }
//   return scrubBankHolidayList
// }
//
// var seeScrubBankHolidayList = createScrubBankHolidayList() ;
// seeScrubBankHolidayList ;
//
//
//
// //return seeTradingDaysToExpirList
// return seeScrubBankHolidayList
//return seeAdjHolidayDateFormatList
return seeDateAndDayInfo

//end of yoYo
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


function stockBuySettleDate() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = (document.getElementById("dte").value * 1) + 14 ;
    var startDateInMilli = document.getElementById("startDateMilli").value * 1 ;
    var expirDateInMilli = (document.getElementById("expirDateMilli").value * 1) + (14 * 1000 * 24 * 60 * 60) ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0 ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  //document.getElementById("tradingDays").value = seeTradingDaysToExpirList.length ;






///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function createBankHolidayList() {
  var holiday1 = document.getElementById("bankHolidayOne").value ;
  var holiday2 = document.getElementById("bankHolidayTwo").value ;
  var holiday3 = document.getElementById("bankHolidayThree").value ;
  var holiday4 = document.getElementById("bankHolidayFour").value ;
  var holiday5 = document.getElementById("bankHolidayFive").value ;
  var holiday6 = document.getElementById("bankHolidaySix").value ;
  var holiday7 = document.getElementById("bankHolidaySeven").value ;
  var holiday8 = document.getElementById("bankHolidayEight").value ;
  var holiday9 = document.getElementById("bankHolidayNine").value ;
  var holiday10 = document.getElementById("bankHolidayTen").value ;
  var holiday11 = document.getElementById("bankHolidayEleven").value ;
  var holiday12 = document.getElementById("bankHolidayTwelve").value ;
  var holiday13 = document.getElementById("bankHolidayThirteen").value ;
  var holiday14 = document.getElementById("bankHolidayFourteen").value ;
  var holiday15 = document.getElementById("bankHolidayFifteen").value ;
  var holiday16 = document.getElementById("bankHolidaySixteen").value ;
  var holiday17 = document.getElementById("bankHolidaySeventeen").value ;
  var holiday18 = document.getElementById("bankHolidayEighteen").value ;
  var holiday19 = document.getElementById("bankHolidayNineteen").value ;
  var holiday20 = document.getElementById("bankHolidayTwenty").value ;
  var holiday21 = document.getElementById("bankHolidayTwentyOne").value ;

  var bankHolidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21] ;

  return bankHolidayList
}

var seeBankHolidayList = createBankHolidayList() ;
seeBankHolidayList;


/////
function creatBankHolidayListDateFormat() {
  var count = 0 ;
  var iter = 0 ;
  var bankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayList.length) {
    bankHolidayDateFormatList.push( new Date (seeBankHolidayList[count])) ;
    count = count + 1 ;
  }
  return bankHolidayDateFormatList
}

var seeBankHolidayDateFormatList = creatBankHolidayListDateFormat() ;
seeBankHolidayDateFormatList ;

////
function createAdjBankHolidayDateFormatList() {
  var count = 0 ;
  var iter = 0 ;
  var adjBankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayDateFormatList.length){
    var gFY = seeBankHolidayDateFormatList[count].getFullYear() ;
    var gM = seeBankHolidayDateFormatList[count].getMonth() ;
    var gDate = seeBankHolidayDateFormatList[count].getDate() + 1 ;

    var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
    var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
    var milliPerMin = 1000 * 60 ;
    var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0 ;
    var milliPerHour = 1000 * 60 * 60 ;
    var adjMilliHours = adjTZMilli / milliPerHour ;
    var gHour = 15 + adjMilliHours ;


    var adjBankHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

    adjBankHolidayDateFormatList.push(adjBankHolidayDateFormat) ;
    count = count + 1 ;
  }
  return adjBankHolidayDateFormatList
}

var seeAdjBankHolidayDateFormatList =  createAdjBankHolidayDateFormatList() ;
seeAdjBankHolidayDateFormatList ;


////
function createScrubBankHolidayList() {
  var count = 0;
  var scrubBankHolidayList = []

  while (count < seeTradingDaysToExpirList.length) {
    var iter = 0 ;
    while (iter < seeAdjBankHolidayDateFormatList.length) {
      if (seeTradingDaysToExpirList[count][0].getTime() == seeAdjBankHolidayDateFormatList[iter].getTime() ) {
        break;
      }
      else if (iter == seeAdjBankHolidayDateFormatList.length-1) {
        scrubBankHolidayList.push(seeTradingDaysToExpirList[count]) ;
        iter = iter + 1 ;
      }
      else {
        iter = iter + 1 ;
      }
    }
    count = count + 1 ;
  }
  return scrubBankHolidayList
}

var seeScrubBankHolidayList = createScrubBankHolidayList() ;
seeScrubBankHolidayList ;

var stockSettleTPlus = document.getElementById("stockSettleT").value * 1 ;
document.getElementById("stockBuySettleDate").value = seeScrubBankHolidayList[stockSettleTPlus][0] ;


//return seeTradingDaysToExpirList
return seeScrubBankHolidayList

//end of stockBuySettleDate
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function stockSellSettleDate() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = (document.getElementById("dte").value * 1) + 14 ;
    var startDateInMilli = document.getElementById("expirDateMilli").value * 1 ;
    var expirDateInMilli = (document.getElementById("expirDateMilli").value * 1) + (14 * 1000 * 24 * 60 * 60) ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0 ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  //document.getElementById("tradingDays").value = seeTradingDaysToExpirList.length ;






///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function createBankHolidayList() {
  var holiday1 = document.getElementById("bankHolidayOne").value ;
  var holiday2 = document.getElementById("bankHolidayTwo").value ;
  var holiday3 = document.getElementById("bankHolidayThree").value ;
  var holiday4 = document.getElementById("bankHolidayFour").value ;
  var holiday5 = document.getElementById("bankHolidayFive").value ;
  var holiday6 = document.getElementById("bankHolidaySix").value ;
  var holiday7 = document.getElementById("bankHolidaySeven").value ;
  var holiday8 = document.getElementById("bankHolidayEight").value ;
  var holiday9 = document.getElementById("bankHolidayNine").value ;
  var holiday10 = document.getElementById("bankHolidayTen").value ;
  var holiday11 = document.getElementById("bankHolidayEleven").value ;
  var holiday12 = document.getElementById("bankHolidayTwelve").value ;
  var holiday13 = document.getElementById("bankHolidayThirteen").value ;
  var holiday14 = document.getElementById("bankHolidayFourteen").value ;
  var holiday15 = document.getElementById("bankHolidayFifteen").value ;
  var holiday16 = document.getElementById("bankHolidaySixteen").value ;
  var holiday17 = document.getElementById("bankHolidaySeventeen").value ;
  var holiday18 = document.getElementById("bankHolidayEighteen").value ;
  var holiday19 = document.getElementById("bankHolidayNineteen").value ;
  var holiday20 = document.getElementById("bankHolidayTwenty").value ;
  var holiday21 = document.getElementById("bankHolidayTwentyOne").value ;

  var bankHolidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21] ;

  return bankHolidayList
}

var seeBankHolidayList = createBankHolidayList() ;
seeBankHolidayList;


/////
function creatBankHolidayListDateFormat() {
  var count = 0 ;
  var iter = 0 ;
  var bankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayList.length) {
    bankHolidayDateFormatList.push( new Date (seeBankHolidayList[count])) ;
    count = count + 1 ;
  }
  return bankHolidayDateFormatList
}

var seeBankHolidayDateFormatList = creatBankHolidayListDateFormat() ;
seeBankHolidayDateFormatList ;

////
function createAdjBankHolidayDateFormatList() {
  var count = 0 ;
  var iter = 0 ;
  var adjBankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayDateFormatList.length){
    var gFY = seeBankHolidayDateFormatList[count].getFullYear() ;
    var gM = seeBankHolidayDateFormatList[count].getMonth() ;
    var gDate = seeBankHolidayDateFormatList[count].getDate() + 1 ;

    var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
    var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
    var milliPerMin = 1000 * 60 ;
    var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin *0 ;
    var milliPerHour = 1000 * 60 * 60 ;
    var adjMilliHours = adjTZMilli / milliPerHour ;
    var gHour = 15 + adjMilliHours ;


    var adjBankHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

    adjBankHolidayDateFormatList.push(adjBankHolidayDateFormat) ;
    count = count + 1 ;
  }
  return adjBankHolidayDateFormatList
}

var seeAdjBankHolidayDateFormatList =  createAdjBankHolidayDateFormatList() ;
seeAdjBankHolidayDateFormatList ;


////
function createScrubBankHolidayList() {
  var count = 0;
  var scrubBankHolidayList = []

  while (count < seeTradingDaysToExpirList.length) {
    var iter = 0 ;
    while (iter < seeAdjBankHolidayDateFormatList.length) {
      if (seeTradingDaysToExpirList[count][0].getTime() == seeAdjBankHolidayDateFormatList[iter].getTime() ) {
        break;
      }
      else if (iter == seeAdjBankHolidayDateFormatList.length-1) {
        scrubBankHolidayList.push(seeTradingDaysToExpirList[count]) ;
        iter = iter + 1 ;
      }
      else {
        iter = iter + 1 ;
      }
    }
    count = count + 1 ;
  }
  return scrubBankHolidayList
}

var seeScrubBankHolidayList = createScrubBankHolidayList() ;
seeScrubBankHolidayList ;

var stockSettleTPlus = document.getElementById("stockSettleT").value * 1 ;
document.getElementById("stockSellSettleDate").value = seeScrubBankHolidayList[stockSettleTPlus][0] ;


//return seeTradingDaysToExpirList
return seeScrubBankHolidayList

//end of stockSellSettleDate
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
function pushStockSettleInMillisecs() {

  var stockBuySettleDate = document.getElementById("stockBuySettleDate").value ;
  var stockBuySettleDateMilli = new Date (stockBuySettleDate) ;
  document.getElementById("stockBuySettleDateMilli").value = stockBuySettleDateMilli.getTime() ;

  var stockSellSettleDate = document.getElementById("stockSellSettleDate").value ;
  var stockSellSettleDateMilli = new Date (stockSellSettleDate) ;
  document.getElementById("stockSellSettleDateMilli").value = stockSellSettleDateMilli.getTime() ;

}

function pushStockCarryDays() {

  var stockBuySettleDateMilli = document.getElementById("stockBuySettleDateMilli").value * 1 ;
  var stockSellSettleDateMilli = document.getElementById("stockSellSettleDateMilli").value * 1;

  var stockCarryMilli = stockSellSettleDateMilli - stockBuySettleDateMilli ;
  var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
  var stockCarryDays = stockCarryMilli / millisecondsPerDay ;
  var stockCarryDaysRounded = Math.round(stockCarryDays);
  document.getElementById("stockDaysCarry").value = stockCarryDaysRounded ;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function optionBuySettleDate() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = (document.getElementById("dte").value * 1) + 14 ;
    var startDateInMilli = document.getElementById("startDateMilli").value * 1 ;
    var expirDateInMilli = (document.getElementById("expirDateMilli").value * 1) + (14 * 1000 * 24 * 60 * 60) ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0 ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  //document.getElementById("tradingDays").value = seeTradingDaysToExpirList.length ;






///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function createBankHolidayList() {
  var holiday1 = document.getElementById("bankHolidayOne").value ;
  var holiday2 = document.getElementById("bankHolidayTwo").value ;
  var holiday3 = document.getElementById("bankHolidayThree").value ;
  var holiday4 = document.getElementById("bankHolidayFour").value ;
  var holiday5 = document.getElementById("bankHolidayFive").value ;
  var holiday6 = document.getElementById("bankHolidaySix").value ;
  var holiday7 = document.getElementById("bankHolidaySeven").value ;
  var holiday8 = document.getElementById("bankHolidayEight").value ;
  var holiday9 = document.getElementById("bankHolidayNine").value ;
  var holiday10 = document.getElementById("bankHolidayTen").value ;
  var holiday11 = document.getElementById("bankHolidayEleven").value ;
  var holiday12 = document.getElementById("bankHolidayTwelve").value ;
  var holiday13 = document.getElementById("bankHolidayThirteen").value ;
  var holiday14 = document.getElementById("bankHolidayFourteen").value ;
  var holiday15 = document.getElementById("bankHolidayFifteen").value ;
  var holiday16 = document.getElementById("bankHolidaySixteen").value ;
  var holiday17 = document.getElementById("bankHolidaySeventeen").value ;
  var holiday18 = document.getElementById("bankHolidayEighteen").value ;
  var holiday19 = document.getElementById("bankHolidayNineteen").value ;
  var holiday20 = document.getElementById("bankHolidayTwenty").value ;
  var holiday21 = document.getElementById("bankHolidayTwentyOne").value ;

  var bankHolidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21] ;

  return bankHolidayList
}

var seeBankHolidayList = createBankHolidayList() ;
seeBankHolidayList;


/////
function creatBankHolidayListDateFormat() {
  var count = 0 ;
  var iter = 0 ;
  var bankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayList.length) {
    bankHolidayDateFormatList.push( new Date (seeBankHolidayList[count])) ;
    count = count + 1 ;
  }
  return bankHolidayDateFormatList
}

var seeBankHolidayDateFormatList = creatBankHolidayListDateFormat() ;
seeBankHolidayDateFormatList ;

////
function createAdjBankHolidayDateFormatList() {
  var count = 0 ;
  var iter = 0 ;
  var adjBankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayDateFormatList.length){
    var gFY = seeBankHolidayDateFormatList[count].getFullYear() ;
    var gM = seeBankHolidayDateFormatList[count].getMonth() ;
    var gDate = seeBankHolidayDateFormatList[count].getDate() + 1 ;

    var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
    var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
    var milliPerMin = 1000 * 60 ;
    var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0 ;
    var milliPerHour = 1000 * 60 * 60 ;
    var adjMilliHours = adjTZMilli / milliPerHour ;
    var gHour = 15 + adjMilliHours ;


    var adjBankHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

    adjBankHolidayDateFormatList.push(adjBankHolidayDateFormat) ;
    count = count + 1 ;
  }
  return adjBankHolidayDateFormatList
}

var seeAdjBankHolidayDateFormatList =  createAdjBankHolidayDateFormatList() ;
seeAdjBankHolidayDateFormatList ;


////
function createScrubBankHolidayList() {
  var count = 0;
  var scrubBankHolidayList = []

  while (count < seeTradingDaysToExpirList.length) {
    var iter = 0 ;
    while (iter < seeAdjBankHolidayDateFormatList.length) {
      if (seeTradingDaysToExpirList[count][0].getTime() == seeAdjBankHolidayDateFormatList[iter].getTime() ) {
        break;
      }
      else if (iter == seeAdjBankHolidayDateFormatList.length-1) {
        scrubBankHolidayList.push(seeTradingDaysToExpirList[count]) ;
        iter = iter + 1 ;
      }
      else {
        iter = iter + 1 ;
      }
    }
    count = count + 1 ;
  }
  return scrubBankHolidayList
}

var seeScrubBankHolidayList = createScrubBankHolidayList() ;
seeScrubBankHolidayList ;

var optionSettleTPlus = document.getElementById("optionSettleT").value * 1 ;
document.getElementById("optionBuySettleDate").value = seeScrubBankHolidayList[optionSettleTPlus][0] ;


//return seeTradingDaysToExpirList
return seeScrubBankHolidayList

//end of optionBuySettleDate
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////


function optionSellSettleDate() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = (document.getElementById("dte").value * 1) + 14 ;
    var startDateInMilli = document.getElementById("expirDateMilli").value * 1 ;
    var expirDateInMilli = (document.getElementById("expirDateMilli").value * 1) + (14 * 1000 * 24 * 60 * 60) ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0 ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  //document.getElementById("tradingDays").value = seeTradingDaysToExpirList.length ;






///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function createBankHolidayList() {
  var holiday1 = document.getElementById("bankHolidayOne").value ;
  var holiday2 = document.getElementById("bankHolidayTwo").value ;
  var holiday3 = document.getElementById("bankHolidayThree").value ;
  var holiday4 = document.getElementById("bankHolidayFour").value ;
  var holiday5 = document.getElementById("bankHolidayFive").value ;
  var holiday6 = document.getElementById("bankHolidaySix").value ;
  var holiday7 = document.getElementById("bankHolidaySeven").value ;
  var holiday8 = document.getElementById("bankHolidayEight").value ;
  var holiday9 = document.getElementById("bankHolidayNine").value ;
  var holiday10 = document.getElementById("bankHolidayTen").value ;
  var holiday11 = document.getElementById("bankHolidayEleven").value ;
  var holiday12 = document.getElementById("bankHolidayTwelve").value ;
  var holiday13 = document.getElementById("bankHolidayThirteen").value ;
  var holiday14 = document.getElementById("bankHolidayFourteen").value ;
  var holiday15 = document.getElementById("bankHolidayFifteen").value ;
  var holiday16 = document.getElementById("bankHolidaySixteen").value ;
  var holiday17 = document.getElementById("bankHolidaySeventeen").value ;
  var holiday18 = document.getElementById("bankHolidayEighteen").value ;
  var holiday19 = document.getElementById("bankHolidayNineteen").value ;
  var holiday20 = document.getElementById("bankHolidayTwenty").value ;
  var holiday21 = document.getElementById("bankHolidayTwentyOne").value ;

  var bankHolidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21] ;

  return bankHolidayList
}

var seeBankHolidayList = createBankHolidayList() ;
seeBankHolidayList;


/////
function creatBankHolidayListDateFormat() {
  var count = 0 ;
  var iter = 0 ;
  var bankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayList.length) {
    bankHolidayDateFormatList.push( new Date (seeBankHolidayList[count])) ;
    count = count + 1 ;
  }
  return bankHolidayDateFormatList
}

var seeBankHolidayDateFormatList = creatBankHolidayListDateFormat() ;
seeBankHolidayDateFormatList ;

////
function createAdjBankHolidayDateFormatList() {
  var count = 0 ;
  var iter = 0 ;
  var adjBankHolidayDateFormatList = [] ;

  while (count < seeBankHolidayDateFormatList.length){
    var gFY = seeBankHolidayDateFormatList[count].getFullYear() ;
    var gM = seeBankHolidayDateFormatList[count].getMonth() ;
    var gDate = seeBankHolidayDateFormatList[count].getDate() + 1 ;

    var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
    var expirTZOffset = document.getElementById("expirDateTZoneOffset").value * 1;
    var milliPerMin = 1000 * 60 ;
    var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin *0 ;
    var milliPerHour = 1000 * 60 * 60 ;
    var adjMilliHours = adjTZMilli / milliPerHour ;
    var gHour = 15 + adjMilliHours ;


    var adjBankHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

    adjBankHolidayDateFormatList.push(adjBankHolidayDateFormat) ;
    count = count + 1 ;
  }
  return adjBankHolidayDateFormatList
}

var seeAdjBankHolidayDateFormatList =  createAdjBankHolidayDateFormatList() ;
seeAdjBankHolidayDateFormatList ;


////
function createScrubBankHolidayList() {
  var count = 0;
  var scrubBankHolidayList = []

  while (count < seeTradingDaysToExpirList.length) {
    var iter = 0 ;
    while (iter < seeAdjBankHolidayDateFormatList.length) {
      if (seeTradingDaysToExpirList[count][0].getTime() == seeAdjBankHolidayDateFormatList[iter].getTime() ) {
        break;
      }
      else if (iter == seeAdjBankHolidayDateFormatList.length-1) {
        scrubBankHolidayList.push(seeTradingDaysToExpirList[count]) ;
        iter = iter + 1 ;
      }
      else {
        iter = iter + 1 ;
      }
    }
    count = count + 1 ;
  }
  return scrubBankHolidayList
}

var seeScrubBankHolidayList = createScrubBankHolidayList() ;
seeScrubBankHolidayList ;

var optionSettleTPlus = document.getElementById("optionSettleT").value * 1 ;
document.getElementById("optionSellSettleDate").value = seeScrubBankHolidayList[optionSettleTPlus][0] ;


//return seeTradingDaysToExpirList
return seeScrubBankHolidayList

//end of optionSellSettleDate
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function pushOptionSettleInMillisecs() {

  var optionBuySettleDate = document.getElementById("optionBuySettleDate").value ;
  var optionBuySettleDateMilli = new Date (optionBuySettleDate) ;
  document.getElementById("optionBuySettleDateMilli").value = optionBuySettleDateMilli.getTime() ;

  var optionSellSettleDate = document.getElementById("optionSellSettleDate").value ;
  var optionSellSettleDateMilli = new Date (optionSellSettleDate) ;
  document.getElementById("optionSellSettleDateMilli").value = optionSellSettleDateMilli.getTime() ;

}


function pushOptionCarryDays() {

  var optionBuySettleDateMilli = document.getElementById("optionBuySettleDateMilli").value * 1;
  var optionSellSettleDateMilli = document.getElementById("optionSellSettleDateMilli").value  * 1;

  var optionCarryMilli = optionSellSettleDateMilli - optionBuySettleDateMilli ;
  var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
  var optionCarryDays = optionCarryMilli / millisecondsPerDay ;
  var optionCarryDaysRounded = Math.round(optionCarryDays);
  document.getElementById("optionDaysCarry").value = optionCarryDaysRounded ;

}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function ernVol() {

  var fairVol = (document.getElementById("fairVol").value * 1) /100 ;
  var ernMove = (document.getElementById("ernMove").value * 1) / 100 ;

  var tradingDaysPerYear = 252 ;
  var tradingDaysToExpir = document.getElementById("tradingDays").value * 1 ;
  var tradingDaysToExpirWithNoErn =  tradingDaysToExpir - 1 ;

  var dailyVariance = (fairVol**2) / tradingDaysPerYear ;
  var ernDayVariance = ernMove**2 ;

  var totalVariance = (dailyVariance * tradingDaysToExpirWithNoErn) + ernDayVariance ;
  var dailyVarianceBasedOnTotal = totalVariance / tradingDaysToExpir ;
  var annualizedVariance = dailyVarianceBasedOnTotal * tradingDaysPerYear ;

  var volWithErn = (annualizedVariance**0.5) * 100 ;

  document.getElementById("volWithErn").value = volWithErn.toFixed(2) ;


}


function impliedErnMove() {

  var fairVol = (document.getElementById("fairVol2").value * 1) /100 ;
  var impliedVolWithErn = (document.getElementById("impliedVolWithErn").value * 1) / 100 ;

  var tradingDaysPerYear = 252 ;
  var tradingDaysToExpir = document.getElementById("tradingDays").value * 1 ;
  var tradingDaysToExpirWithNoErn =  tradingDaysToExpir - 1 ;

  var dailyVarianceWithErn = (impliedVolWithErn**2) / tradingDaysPerYear ;
  var totalVarianceWithErn = dailyVarianceWithErn * tradingDaysToExpir ;

  var dailyFairVariance = (fairVol**2) / tradingDaysPerYear ;
  var totalFairVariance = dailyFairVariance * tradingDaysToExpirWithNoErn ;

  var impliedErnVariance = totalVarianceWithErn - totalFairVariance ;
  var impliedEarningsMove = (impliedErnVariance**0.5) * 100 ;
  //var ernDayVariance = ernMove**2 ;


  //var totalVariance = (dailyVariance * tradingDaysToExpirWithNoErn) + ernDayVariance ;
  //var dailyVarianceBasedOnTotal = totalVariance / tradingDaysToExpir ;
  //var annualizedVariance = dailyVarianceBasedOnTotal * tradingDaysPerYear ;

  //var volWithErn = (annualizedVariance**0.5) * 100 ;

  document.getElementById("impliedErnMove").value = impliedEarningsMove.toFixed(2) ;

}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// FORWARD VOL CALC

function pushFullExpir1Date() {
  var expir = document.getElementById("expiration1").value ;
  var fullExpirDate = new Date (expir);

  var gFY = fullExpirDate.getFullYear() ;
  var gM = fullExpirDate.getMonth() ;
  var gDate = fullExpirDate.getDate() + 1;
  var gDay = fullExpirDate.getDay() ;

  var adjExpirDate = new Date (gFY,gM,gDate,15,0,0,0) ;
  var gTZ = adjExpirDate.getTimezoneOffset() ;

  document.getElementById("fullExpir1Date").value = adjExpirDate ;
  document.getElementById("expir1TZoneOffset").value = gTZ
}




function pushMilli1() {
  var adjFullStartDate = document.getElementById("fullStartDate").value ;
  var calcStartDateMilli = new Date (adjFullStartDate) ;
  //document.getElementById("startDateMilli").value = calcStartDateMilli.getTime() ;

  var adjFullExpirDate = document.getElementById("fullExpir1Date").value ;
  var calcExpirDateMilli = new Date (adjFullExpirDate) ;
  document.getElementById("expir1Milli").value = calcExpirDateMilli.getTime() ;

  var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
  var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
  var expirTZOffset = document.getElementById("expir1TZoneOffset").value * 1;
  var milliPerMin = 1000 * 60 ;
  var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin ;

  var milliSecsToExpir = calcExpirDateMilli.getTime() - calcStartDateMilli.getTime() + adjTZMilli ;
  //document.getElementById("milliToExpir1").value = milliSecsToExpir ;

  var daysToExpir = milliSecsToExpir / millisecondsPerDay ;
  document.getElementById("daysToExpir1").value = daysToExpir ;

}

// yoYo function creates trading days
function yoYo1() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = document.getElementById("daysToExpir1").value * 1 ;
    var startDateInMilli = document.getElementById("startDateMilli").value * 1 ;
    var expirDateInMilli = document.getElementById("expir1Milli").value * 1 ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////


  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expir1TZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0  ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  document.getElementById("tradingDays1").value = seeTradingDaysToExpirList.length ;


//
//
// //return seeTradingDaysToExpirList
// return seeScrubBankHolidayList
//return seeAdjHolidayDateFormatList
return seeDateAndDayInfo

//end of yoYo1
}


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


function pushFullExpir2Date() {
  var expir = document.getElementById("expiration2").value ;
  var fullExpirDate = new Date (expir);

  var gFY = fullExpirDate.getFullYear() ;
  var gM = fullExpirDate.getMonth() ;
  var gDate = fullExpirDate.getDate() + 1;
  var gDay = fullExpirDate.getDay() ;

  var adjExpirDate = new Date (gFY,gM,gDate,15,0,0,0) ;
  var gTZ = adjExpirDate.getTimezoneOffset() ;

  document.getElementById("fullExpir2Date").value = adjExpirDate ;
  document.getElementById("expir2TZoneOffset").value = gTZ
}




function pushMilli2() {
  var adjFullStartDate = document.getElementById("fullStartDate").value ;
  var calcStartDateMilli = new Date (adjFullStartDate) ;
  //document.getElementById("startDateMilli").value = calcStartDateMilli.getTime() ;

  var adjFullExpirDate = document.getElementById("fullExpir2Date").value ;
  var calcExpirDateMilli = new Date (adjFullExpirDate) ;
  document.getElementById("expir2Milli").value = calcExpirDateMilli.getTime() ;

  var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
  var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
  var expirTZOffset = document.getElementById("expir2TZoneOffset").value * 1;
  var milliPerMin = 1000 * 60 ;
  var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin ;

  var milliSecsToExpir = calcExpirDateMilli.getTime() - calcStartDateMilli.getTime() + adjTZMilli ;
  //document.getElementById("milliToExpir1").value = milliSecsToExpir ;

  var daysToExpir = milliSecsToExpir / millisecondsPerDay ;
  document.getElementById("daysToExpir2").value = daysToExpir ;

}

// yoYo function creates trading days
function yoYo2() {

  function createDateList() {
    var count = 0 ;
    var iter = 0 ;
    var dateList = [] ;
    var daysToExpir = document.getElementById("daysToExpir2").value * 1 ;
    var startDateInMilli = document.getElementById("startDateMilli").value * 1 ;
    var expirDateInMilli = document.getElementById("expir2Milli").value * 1 ;
    var millisecondsPerDay = 1000 * 24 * 60 * 60 ;
    var mm = 0 ;

    while (count <= daysToExpir) {
      var dateGenerator = new Date (startDateInMilli + mm)
      var gFY = dateGenerator.getFullYear() ;
      var gM = dateGenerator.getMonth() ;
      var gDate = dateGenerator.getDate() ;
      //var gDay = fullExpirDate.getDay() ;
      //var gTZ = fullExpirDate.getTimezoneOffset() ;

      var adjDateGenerator = new Date (gFY,gM,gDate,15,0,0,0) ;

      dateList.push( adjDateGenerator ) ;

      mm = mm + millisecondsPerDay ;
      count = count + 1 ;
    }
    return dateList
  }

  var seeDateList = createDateList() ;
  seeDateList ;




  function createDayOfWeekList() {
    var count = 0;
    var iter = 0 ;
    var dayOfWeekList = []

    while (count < seeDateList.length) {
      dayOfWeekList.push( seeDateList[count].getDay() ) ;
      count = count + 1;
    }
    return dayOfWeekList
  }

  var seeDayOfWeekList = createDayOfWeekList() ;
  seeDayOfWeekList;



  ////////////////////////////////////////////////////////////////////////////////////
  ////ZIP
  ////////////////////////////////////////////////////////////////////////////////////
  function createDateandDayInfo(){
    function zip_upTwo (x,y){  //(x,y,z,a,b,c,d,e,f,g,h,i)
      var iter1 = x.length - 1;
      child1 = []
      parent1 = []
      count = 0

      while (count <= iter1){

        child1.push(x[count]) ;
        child1.push(y[count]) ;
        //child1.push(z[count]) ;
        //child1.push(a[count]) ;
        //child1.push(b[count]) ;
        //child1.push(c[count]) ;
        //child1.push(d[count]) ;
        //child1.push(e[count]) ;
        //child1.push(f[count]) ;
        //child1.push(g[count]) ;
        //child1.push(h[count]) ;
        //child1.push(i[count]) ;


        parent1.push(child1) ;
        child1 = [] ;
        count = count + 1 ;

      }

      return parent1

    }
    var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
    return dateAndDayInfo
  }


  //var dateAndDayInfo = zip_upTwo(seeDateList, seeDayOfWeekList);
  var seeDateAndDayInfo = createDateandDayInfo() ;
  seeDateAndDayInfo;


  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////


  function createHolidayList() {
    var holiday1 = document.getElementById("holidayOne").value ;
    var holiday2 = document.getElementById("holidayTwo").value ;
    var holiday3 = document.getElementById("holidayThree").value ;
    var holiday4 = document.getElementById("holidayFour").value ;
    var holiday5 = document.getElementById("holidayFive").value ;
    var holiday6 = document.getElementById("holidaySix").value ;
    var holiday7 = document.getElementById("holidaySeven").value ;
    var holiday8 = document.getElementById("holidayEight").value ;
    var holiday9 = document.getElementById("holidayNine").value ;
    var holiday10 = document.getElementById("holidayTen").value ;
    var holiday11 = document.getElementById("holidayEleven").value ;
    var holiday12 = document.getElementById("holidayTwelve").value ;
    var holiday13 = document.getElementById("holidayThirteen").value ;
    var holiday14 = document.getElementById("holidayFourteen").value ;
    var holiday15 = document.getElementById("holidayFifteen").value ;
    var holiday16 = document.getElementById("holidaySixteen").value ;
    var holiday17 = document.getElementById("holidaySeventeen").value ;
    var holiday18 = document.getElementById("holidayEighteen").value ;
    var holiday19 = document.getElementById("holidayNineteen").value ;
    var holiday20 = document.getElementById("holidayTwenty").value ;
    var holiday21 = document.getElementById("holidayTwentyOne").value ;
    var holiday22 = document.getElementById("extraHolidayOne").value ;
    var holiday23 = document.getElementById("extraHolidayTwo").value ;
    var holiday24 = document.getElementById("extraHolidayThree").value ;
    var holiday25 = document.getElementById("extraHolidayFour").value ;

    var holidayList = [holiday1,holiday2,holiday3,holiday4,holiday5,holiday6,holiday7,holiday8,holiday9,holiday10,holiday11,holiday12,holiday13,holiday14,holiday15,holiday16,holiday17,holiday18,holiday19,holiday20,holiday21,holiday22,holiday23,holiday24,holiday25] ;

    return holidayList
  }

  var seeHolidayList = createHolidayList() ;
  seeHolidayList;



  function creatHolidayListDateFormat() {
    var count = 0 ;
    var iter = 0 ;
    var holidayDateFormatList = [] ;

    while (count < seeHolidayList.length) {
      holidayDateFormatList.push( new Date (seeHolidayList[count])) ;
      count = count + 1 ;
    }
    return holidayDateFormatList
  }

  var seeHolidayDateFormatList = creatHolidayListDateFormat() ;
  seeHolidayDateFormatList ;




  function createAdjHolidayDateFormatList() {
    var count = 0 ;
    var iter = 0 ;
    var adjHolidayDateFormatList = [] ;

    while (count < seeHolidayDateFormatList.length){
      var gFY = seeHolidayDateFormatList[count].getFullYear() ;
      var gM = seeHolidayDateFormatList[count].getMonth() ;
      var gDate = seeHolidayDateFormatList[count].getDate() + 1 ;

      var startTZOffset = document.getElementById("startDateTZoneOffset").value * 1 ;
      var expirTZOffset = document.getElementById("expir2TZoneOffset").value * 1;
      var milliPerMin = 1000 * 60 ;
      var adjTZMilli = (startTZOffset - expirTZOffset) * milliPerMin * 0  ;
      var milliPerHour = 1000 * 60 * 60 ;
      var adjMilliHours = adjTZMilli / milliPerHour ;
      var gHour = 15 + adjMilliHours ;


      var adjHolidayDateFormat = new Date (gFY,gM,gDate,gHour,0,0,0) ;

      adjHolidayDateFormatList.push(adjHolidayDateFormat) ;
      count = count + 1 ;
    }
    return adjHolidayDateFormatList
  }

  var seeAdjHolidayDateFormatList =  createAdjHolidayDateFormatList() ;
  seeAdjHolidayDateFormatList ;



  //This is the dateAndDayInfo list but holidays are excluded
  function createScrubHolidayList() {
    var count = 0;
    var scrubHolidayList = []

    while (count < seeDateAndDayInfo.length) {
      var iter = 0 ;
      while (iter < seeAdjHolidayDateFormatList.length) {
        if (seeDateAndDayInfo[count][0].getTime() == seeAdjHolidayDateFormatList[iter].getTime() ) {
          break;
        }
        else if (iter == seeAdjHolidayDateFormatList.length-1) {
          scrubHolidayList.push(seeDateAndDayInfo[count]) ;
          iter = iter + 1 ;
        }
        else {
          iter = iter + 1 ;
        }
      }
      count = count + 1 ;
    }
    return scrubHolidayList
  }

  var seeScrubHolidayList = createScrubHolidayList() ;
  seeScrubHolidayList ;


  //this function creates a list of trading days before expiration (holidays and weekends are scrubbed)
  function createTradingDaysToExpirList() {
    var count = 0 ;
    var iter = 0;
    var tradingDaysToExpirList = [] ;

    while (count < seeScrubHolidayList.length) {
      if (seeScrubHolidayList[count][1] > 0 && seeScrubHolidayList[count][1] < 6) {
        tradingDaysToExpirList.push(seeScrubHolidayList[count]) ;
        count = count + 1 ;
      }
      else {
        count = count + 1 ;
      }
    }
    return tradingDaysToExpirList
  }

  var seeTradingDaysToExpirList = createTradingDaysToExpirList() ;
  seeTradingDaysToExpirList;

  document.getElementById("tradingDays2").value = seeTradingDaysToExpirList.length ;


//
//
// //return seeTradingDaysToExpirList
// return seeScrubBankHolidayList
//return seeAdjHolidayDateFormatList
return seeDateAndDayInfo

//end of yoYo2
}


function pushForwardVol() {

  var impliedVol1 = document.getElementById("impliedVol1").value ;
  var impliedVol2 = document.getElementById("impliedVol2").value ;

  var tradingDays1 = document.getElementById("tradingDays1").value ;
  var tradingDays2 = document.getElementById("tradingDays2").value ;

  var tradingDaysPerYear = 252 ;

  var impliedDailyVariance1 = (impliedVol1**2) / tradingDaysPerYear;
  var impliedDailyVariance2 = (impliedVol2**2) / tradingDaysPerYear;

  var totalVariance1 = impliedDailyVariance1 * tradingDays1 ;
  var totalVariance2 = impliedDailyVariance2 * tradingDays2 ;

  var forwardVariance = totalVariance2 - totalVariance1  ;
  var forwardDays = tradingDays2 - tradingDays1 ;
  var dailyForwardVariance = forwardVariance / forwardDays ;
  var forwardVol = (dailyForwardVariance**0.5) * (tradingDaysPerYear**0.5) ;

  document.getElementById("forwardVol").value = forwardVol.toFixed(2);

}
