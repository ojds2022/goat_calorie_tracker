
var timeDisplayEl = $('#time-display');

var trackerDisplayBmiEl = $('#project-display-bmi');
var trackerFormBmiEl = $('#project-form-bmi');
var trackerBmiAgeEl = $('#age-input-bmi');
var trackerBmiGenderEl = $('#gender-input-bmi');
var trackerBmiHeightEl = $('#height-input-bmi');
var trackerBmiWeightEl = $('#weight-input-bmi');
var trackerBmiDateInputEl = $('date-input-bmi');

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// Javascript for BMI inputs (first row)
function readProjectsFromStorage() {

  var projects = localStorage.getItem('projects');
  if (projects) {  
    projects = JSON.parse(projects);    
  } else {
    projects = [];
  }
  return projects;
}

function saveProjectsToStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));  
}

function printProjectData() {
  trackerDisplayBmiEl.empty();
  var projects = readProjectsFromStorage();

  for (var i = 0; i < projects.length; i += 1) {
    var project = projects[i];  
    var projectDate = dayjs(bmi.date); 
    var today = dayjs().startOf('day');  

    var rowEl = $('<tr>');  
    var ageEL = $('<td>').text(project.age);
    var genderEl = $('<td>').text(project.gender);
    var heightEl = $('<td>').text(project.height);
    var weightEl = $('<td>').text(project.weight);
    var dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

    var deleteEl = $(
      '<td><button class="btn btn-sm btn-delete-project" data-index="' +
        i +
        '">X</button></td>'
    );

    if (projectDate.isBefore(today)) {
      rowEl.addClass('project-late');
    } else if (projectDate.isSame(today)) {
      rowEl.addClass('project-today');
    }
  
    rowEl.append(ageEL, genderEl, heightEl, weightEl, dateEl, deleteEl);
    trackerDisplayBmiEl.append(rowEl);
  }
}

function handleDeleteProject() {
  var projectIndex = parseInt($(this).attr('data-index'));
  var projects = readProjectsFromStorage();
  projects.splice(projectIndex, 1);
  saveProjectsToStorage(projects);

  printProjectData();
}

function handleProjectFormSubmit(event) {
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

  var bmiDataList = readProjectsFromStorage();

  bmiDataList.push(bmiData);
  saveProjectsToStorage(bmiDataList);

  printProjectData();

  trackerBmiAgeEl.val('');
  trackerBmiGenderEl.val('');
  trackerBmiHeightEl.val('');
  trackerBmiWeightEl .val('');
  trackerBmiDateInputEl.val('');
}

trackerFormBmiEl.on('submit', handleProjectFormSubmit);

trackerDisplayBmiEl.on('click', '.btn-delete-project', handleDeleteProject);

displayTime();
setInterval(displayTime, 1000);  

printProjectData();


/*

var projectDisplayFoodEl = $('#project-display-food');
var projectFormFoodEl = $('#project-form-food');
var projectInputFoodEl = $('#input-food');
var projectDateInputFoodEl = $('#project-date-input-food');

*/