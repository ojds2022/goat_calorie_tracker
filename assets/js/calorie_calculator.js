var userFormEl = document.querySelector('#project-form-bmi');

 //Declare Variables changed based on index.html id
var firstnameEl = document.querySelector('#firstName-input-bmi');
var lastnameEl = document.querySelector('#lastName-input-bmi');
var neckEl = document.querySelector('#neck-input-bmi');
var hipEl = document.querySelector('#hip-input-bmi');
var genderEl =  document.querySelector('#gender-input-bmi');
var ageEl = document.querySelector('#age-input-bmi');
var heightEl = document.querySelector('#height-input-bmi');
var weightEl = document.querySelector('#weight-input-bmi');
var firstDisplay = document.querySelector ('#fName')

//to do 
var DisplayContainerEl = document.querySelector('#Display-container');

genderEl.addEventListener('change', function() {
 // console.log('Selected gender:', genderEl.value);
});


renderLastuserInfo();



function renderLastuserInfo() {

 console.log(localStorage.getItem ("firstname"));

  // firstnameEl.value = localStorage.getItem ("firstname");
  // lastnameEl.value  = localStorage.getItem("lastname");
 //  neckEl.value = window.localStorage.getItem ("neck");
//   ageEl.value = window.localStorage.getItem("age");
 //  hipEl.value =  window.localStorage.getItem ("hip");
  // genderEl.value = window.localStorage.getItem("gender");
 // // heightEl.value = window.localStorage.getItem ("height");
 //  weightEl.value = window.localStorage.getItem("weight");


 firstDisplay.value = localStorage.getItem ("firstname");
 //lastnameEl.value  = localStorage.getItem("lastname");



}


var formSubmitHandler = function (event) {
  event.preventDefault();
  var firstname = firstnameEl.value.trim(); 
  var lastname = lastnameEl.value.trim(); 
  var neck = neckEl.value.trim(); 
  var hip = hipEl.value.trim();
  var age = ageEl.value.trim();
  var height = heightEl.value.trim();
  var weight = weightEl.value.trim();
  var gender = genderEl.value.trim();
 


  console.log (firstname);
  console.log (lastname); 
  console.log (neck);
  console.log (hip);
  console.log (age);
  console.log (height);
  console.log (weight);
  console.log (gender);
 



  if (firstname && lastname && gender && age && neck && hip && height && weight) {
   
   UsersInfo(firstname,lastname,neck,hip,gender,age,height,weight);


  } else {
    alert('Please enter all the inforamtion');
  }
};




var UsersInfo = function (firstname,lastname,neck,hip,gender,age,height,weight) {
  //adding firstname and lastname to local storage
 

  window.localStorage.setItem ("firstname", firstname);
  window.localStorage.setItem("lastname", lastname);
  window.localStorage.setItem ("neck", neck);
  window.localStorage.setItem("age", age);
  window.localStorage.setItem ("hip", hip);
  window.localStorage.setItem("gender", gender);
  window.localStorage.setItem ("height", height);
  window.localStorage.setItem("weight", weight);
  
  
  // login credential

  const Credential = {
    method: 'GET',
   headers: {
     'X-RapidAPI-Key': '4471ef3fecmshe1826f9ec6de9e5p119901jsn580c8fcbb269',
     'X-RapidAPI-Host': 'hipermega-fitness-calculator.p.rapidapi.com'
    }
  };
 
 // API Urls
   const Caloriesurl = 'https://hipermega-fitness-calculator.p.rapidapi.com/caloriesneeds?gender=' + gender + '&age='+ age +'&height='+ height + '&weight='+ weight +'&activity=active';
   
   
   
   
   
   const BMIurl = 'https://hipermega-fitness-calculator.p.rapidapi.com/bmi?height='+ height +'&weight=' + weight + "'";
   
  //Attention Please !!!!!! BFP Calculation generate error if gender value = Female, so I have to force value to be "male" not to generate error. API Error and I repored to api vendor
  //Calories Calculation accepts gender value as "Female"
   const BFPurl = 'https://hipermega-fitness-calculator.p.rapidapi.com/bfp?gender=' + "Male" + '&neck=' + neck + '&height=' + height + '&weight=' + weight + '&hip=' + hip + "'";





 // Calories Needed fatch
   fetch(Caloriesurl, Credential)
   .then(function (response) {
      if (response.ok) {
        response.json().then(function (Calories_data) {
       console.log (Calories_data);

     
      //adding values  to local storage as string 
       window.localStorage.setItem ("balance", JSON.stringify(Calories_data.balance) );
       window.localStorage.setItem ("mildWeightLoss", JSON.stringify(Calories_data.mildWeightLoss) );
       window.localStorage.setItem ("mildWeightGain", JSON.stringify(Calories_data.mildWeightGain) );
       window.localStorage.setItem ("heavyWeightLoss", JSON.stringify(Calories_data.heavyWeightLoss) );
       window.localStorage.setItem ("heavyWeightGain", JSON.stringify(Calories_data.heavyWeightGain) );


        });
      } else {
       alert('Error: ' + response.statusText);
      }
   })
   .catch(function (error) {
      alert('Unable to connect to HiperMega Fitness Calculator ');
   });



// BMI fetch
  

   fetch(BMIurl, Credential)
   .then(function (response) {
      if (response.ok) {
        response.json().then(function (BMI_data) {
       console.log (BMI_data);
         window.localStorage.setItem ("BMI_Result", JSON.stringify(BMI_data[0].bmiResult) );
         bmiResult = JSON.stringify(BMI_data[0].bmiResult);
        
        });
      } else {
       alert('Error: ' + response.statusText);
      }
   })
   .catch(function (error) {
      alert('Unable to connect to HiperMega Fitness Calculator ');
   });

   //BFP fetching

   

   fetch(BFPurl, Credential)
   .then(function (response) {
      if (response.ok) {
        response.json().then(function (BFP_data) {
       console.log (BFP_data);

       window.localStorage.setItem ("BodyFat%", JSON.stringify(BFP_data[0].body_fat) );
       bodyfat  = JSON.stringify(BFP_data[0].body_fat);
        });
      } else {
       alert('Error: ' + response.statusText);
      }
   })
   .catch(function (error) {
      alert('Unable to connect to HiperMega Fitness Calculator ');
   });

   //renderLastuserInfo();

  

  // DisplayUserInfo(localStorage.getItem("firstname"),lastname,localStorage.getItem("balance"),localStorage.getItem("heavyWeightGain"),localStorage.getItem("heavyWeightLoss"),
  // localStorage.getItem("mildWeightGain"),localStorage.getItem("mildWeightLoss"),localStorage.getItem("BMI_Result"),localStorage.getItem("BodyFat%"));

 };


// var DisplayUserInfo = function (firstname,lastname,balance,heavyWeightGain,heavyWeightLoss,mildWeightGain,mildWeightLoss,bmiResult,bodyfat) {
  
   //  var passingArray = [
  // { name: "firstname:", value: firstname, words: "" },
  //  { name: "lastname:", value: lastname, words: ""  },
  // { name: "To be balanced:", value: balance, words: "Calories"  },
  // { name: "heavyWeightGain:", value: heavyWeightGain, words: "Calories"  },
  // { name: "heavyWeightLoss:", value: heavyWeightLoss, words: "Calories"  },
  // { name: "mildWeightGain:", value: mildWeightGain, words: "Calories"  },
  // { name: "mildWeightLoss:", value: mildWeightLoss, words: "Calories" },
  //  { name: "bmiResult:", value: bmiResult, words: " BMI"},
   // { name: "bodyfat %:", value: bodyfat, words: " %"}
//];






  //var innerHtmlContents = ""; 


 
  //for (var i = 0; i <passingArray.length; i++ ) {

   // innerHtmlContents +=  "<p>" + passingArray[i].name + " " + passingArray[i].value  + " " + passingArray[i].words + "</P>"

 // }

 //console.log (innerHtmlContents)
  //DisplayContainerEl.innerHTML = innerHtmlContents
  
  
// }

   
 
   



















// to do





userFormEl.addEventListener('submit', formSubmitHandler);

