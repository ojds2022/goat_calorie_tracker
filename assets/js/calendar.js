var calendarEl = document.querySelector(".calendar");
var monthDisplayEl = $('#month');

var text = "";
var currenyday = "";

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

var cal = "#Calories" + currenyday ;
var calorieEl = $(cal);
calorieEl.text("Calories: " + text)


// function data()
// {
       


// }

displayTime();