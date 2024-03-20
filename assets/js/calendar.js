var calendarEl = document.querySelector(".calendar");
var monthDisplayEl = $('#month');

var text = "Example ";
var currenyday = dayjs().format('D');

function displayTime() {
var currentTime = dayjs().format('MMMM YYYY');
monthDisplayEl.text(currentTime);
}

// This loop adds the dates and the data for each date on the calandar
for(let i =1; i <= 31; i++) {
       calendarEl.insertAdjacentHTML("beforeend", `
       <div id=day> ${i}
        <ul id="day${i}" class="dayUl">

        <li id="Calories${i}">Calories: </li>
        <li id="Weight${i}">Weight: </li>
        <li id="BMI${i}">BMI: </li>

       </ul> 
       </div>`);
}

// //This is not going to be loop,
// //it will be a function with specifc value it runs each time
// for(let i =1; i<= 4; i++)
// {
// var day1 = document.getElementById("day1")
// var li = document.createElement("li");
// var text = "Example ";
// var textNode = document.createTextNode(text)
// li.appendChild(textNode);

// day1.appendChild(li);
// }

//this gets the data from local storage and parses it. 
var allFoodData = localStorage.getItem('allFoodData');
allFoodData = JSON.parse(allFoodData);

//this accounts for multiple foods being submitted and updates new calories just for that day
var caloriesFinalList = {};

loopsForFoodDay();

function loopsForFoodDay(){
       for (var i = 0; i < allFoodData.length; i++) {

              foodDateIfSame= dayjs(allFoodData[i].date).format('D');
              if (!caloriesFinalList[foodDateIfSame]){
                     caloriesFinalList[foodDateIfSame]= 0;
              }
                            
              caloriesFinalList[foodDateIfSame] += (allFoodData[i].foodCalorie);   
       }    
}



//this allows for all the items in the data set to be put into the calendar

for (var i = 0; i < allFoodData.length; i ++) {
       //this variable selects just the day of the month so that we can have it select the day on the calendar as well
       var dateFromStorage = dayjs(allFoodData[i].date).format('D');
       var text = caloriesFinalList[dateFromStorage].toFixed(3);              
       var cal = "#Calories" + dateFromStorage ;
       var calorieEl = $(cal);
       calorieEl.text("Calories: " + text);
       
}

// data retrieved from index.html and printed onto this page

displayTime();