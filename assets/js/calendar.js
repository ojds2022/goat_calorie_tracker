var calandarEl = document.querySelector(".calandar");


for(let i =1; i <= 31; i++) 
{
       calandarEl.insertAdjacentHTML("beforeend", `<div id=day> ${i}
        <ul id="day${i}" class="dayUl">
        <li>Calories: </li>
        <li>Weight: </li>
        <li>BMI: </li>
       </ul> </div>`);
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


function data()
{
       
       var currenydayEl = document.getElementById("day1")
       var li = document.createElement("li");
       var text = "Example ";
       var textNode = document.createTextNode(text)
       li.appendChild(textNode);

       day1.appendChild(li);

}