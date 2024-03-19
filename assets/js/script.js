
var timeDisplayEl = $('#time-display');
var trackerDisplayBmiEl = $('#project-display-bmi');
var trackerFormBmiEl = $('#project-form-bmi');
var trackerBmiAgeEl = $('#age-input-bmi');
var trackerBmiGenderEl = $('#gender-input-bmi');
var trackerBmiHeightEl = $('#height-input-bmi');
var trackerBmiWeightEl = $('#weight-input-bmi');
var trackerBmiDateInputEl = $('#date-input-bmi');

// DISPLAYS TIME
function displayTime() {
  var currentTime = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(currentTime);
}

// BMI INPUT SECTION

// SAVES BMI TO LOCAL STORAGE; bmiLocalStorage, saveAllBmiDataToStorage
function bmiLocalStorage() {
  var allBmiData = localStorage.getItem('allBmiData');
  if (allBmiData) {  
    allBmiData = JSON.parse(allBmiData);    
  } else {
    allBmiData = [];
  }
  return allBmiData;
}

function saveAllBmiDataToStorage(allBmiData) {
  localStorage.setItem('allBmiData', JSON.stringify(allBmiData));  
}

// PRINTS BMI TO TABLE
function printBmiData() {
  trackerDisplayBmiEl.empty();
  var allBmiData = bmiLocalStorage();

  // CREATES ROW CONTENT FOR BMI DATA
  for (var i = 0; i < allBmiData.length; i += 1) {
    var bmi = allBmiData[i];  
    var bmiDate = dayjs(bmi.date); 
    var today = dayjs().startOf('day');  

    var rowEl = $('<tr>');  
    var ageEL = $('<td>').text(bmi.age);
    var genderEl = $('<td>').text(bmi.gender);
    var heightEl = $('<td>').text(bmi.height);
    var weightEl = $('<td>').text(bmi.weight);
    var dateEl = $('<td>').text(bmiDate.format('MM/DD/YYYY'));

    var deleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );

    // COLOR CODE FOR CURRENT DATE VS PAST DATE
    if (bmiDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (bmiDate.isSame(today)) {
      rowEl.addClass('project-today');
    }
  
    rowEl.append(ageEL, genderEl, heightEl, weightEl, dateEl, deleteEl);
    trackerDisplayBmiEl.append(rowEl);
  }
}

// DELETES BMI INFO WHEN 'X' IS PRESSED AND REMOVES FROM LOCAL STORAGE
function handleDeleteBmi() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var allBmiData = bmiLocalStorage();
  allBmiData.splice(projectIndex, 1);
  saveAllBmiDataToStorage(allBmiData);

  printBmiData();
}

// BMI MODAL SUBMISSION
function handleBmiFormSubmit(event) {
  event.preventDefault();  

  var bmiAge = trackerBmiAgeEl.val().trim();     
  var bmiGender = trackerBmiGenderEl.val();
  var bmiHeight = trackerBmiHeightEl.val(); 
  var bmiWeight = trackerBmiWeightEl.val(); 
  var bmiDate = trackerBmiDateInputEl.val(); 

var bmiData = {     
    age: bmiAge,
    gender: bmiGender,
    height: bmiHeight,
    weight: bmiWeight,
    date: bmiDate,
  };

  var bmiDataList = bmiLocalStorage();

  bmiDataList.push(bmiData);
  saveAllBmiDataToStorage(bmiDataList);

  printBmiData();

  trackerBmiAgeEl.val('');
  trackerBmiGenderEl.val('');
  trackerBmiHeightEl.val('');
  trackerBmiWeightEl .val('');
  trackerBmiDateInputEl.val('');
}

trackerFormBmiEl.on('submit', handleBmiFormSubmit);
trackerDisplayBmiEl.on('click', '.btn-delete-project', handleDeleteBmi);
printBmiData();

// FOOD INPUT SECTION

var displayFoodEl = $('#display-food');
var formFoodEl = $('#form-food');
var inputFoodEl = $('#input-food');
var dateInputFoodEl = $('#date-input-food');

// SAVES FOOD TO LOCAL STORAGE; foodLocalStorage, saveAllFoodDataToStorage
function foodLocalStorage() {

  var allFoodData = localStorage.getItem('allFoodData');
  if (allFoodData) {  
    allFoodData = JSON.parse(allFoodData);    
  } else {
    allFoodData = [];
  }
  return allFoodData;
}

function saveAllFoodDataToStorage(allFoodData) {
  localStorage.setItem('allFoodData', JSON.stringify(allFoodData));  
}

// PRINTS FOOD TO TABLE
function printFoodData() {
  displayFoodEl.empty();
  var allFoodData = foodLocalStorage();

  // CREATES ROW CONTENT FOR FOOD DATA
  for (var i = 0; i < allFoodData.length; i += 1) {
    var foods = allFoodData[i];  
    var foodsDate = dayjs(foods.date); 
    var today = dayjs().startOf('day');  

    var secondRowEl = $('<tr>');  
    var foodSelectionEl = $('<td>').text(foods.foodSelection);
    var foodCalorieEl = $('<td>').text(foods.foodCalorie);
    var foodDateEl = $('<td>').text(foodsDate.format('MM/DD/YYYY'));

    var secondDeleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );

    // COLOR CODE FOR CURRENT DATE VS PAST DATE
    if (foodsDate.isBefore(today)) {
      secondRowEl.addClass('project-late');
    } else if (foodsDate.isSame(today)) {
      secondRowEl.addClass('project-today');
    }
  
    
    secondRowEl.append(foodSelectionEl, foodCalorieEl, foodDateEl, secondDeleteEl);
    displayFoodEl.append(secondRowEl);
  }
}

// DELETES FOOD INFO WHEN 'X' IS PRESSED AND REMOVES FROM LOCAL STORAGE
function handleDeleteFood() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var allFoodData = foodLocalStorage();
  allFoodData.splice(projectIndex, 1);
  saveAllFoodDataToStorage(allFoodData);

  printFoodData();
}

// FOOD MODAL SUBMISSION
function handleFoodFormSubmit(event) {
  event.preventDefault();  

  var ingredient = inputFoodEl.val().trim();
  var foodsDate = dateInputFoodEl.val(); 

  getCaloriesFromAPI(ingredient);
  var caloriesPromise = getCaloriesFromAPI(ingredient);
  caloriesPromise.then(function(calories){
    var foodData = {     
      foodSelection: ingredient,
      date: foodsDate,
      foodCalorie: calories,
    };
  
    var foodDataList = foodLocalStorage();
  
    foodDataList.push(foodData);
    saveAllFoodDataToStorage(foodDataList);
  
    printFoodData();
  
    inputFoodEl.val('');
    dateInputFoodEl.val('');
  })
}

formFoodEl.on('submit', handleFoodFormSubmit);
displayFoodEl.on('click', '.btn-delete-project', handleDeleteFood);
printFoodData();

displayTime();
setInterval(displayTime, 1000);  


//API Calories
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9dbcd8e5dfmsha70214446503936p14ec91jsn5d557cae99ce',
		'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
	}
};


var getCaloriesFromAPI = function (ingredient) {
  var apiUrl = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + ingredient;
  //gets data from our API and also gives them the passkey
  return fetch(apiUrl, options)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          //this returns an integer
          return data[0].calories;
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })

};