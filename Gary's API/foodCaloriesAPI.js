const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=1lb%20brisket%20with%20fries';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9dbcd8e5dfmsha70214446503936p14ec91jsn5d557cae99ce',
		'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
	}
};

var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var nameInputEl = document.querySelector('#username');
var userFormEl = document.querySelector('#user-form');

//prevents reload. this puts our input from the form and gives it to the API function
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var food = nameInputEl.value.trim();
  //api function getUserRepos down below
    if (food) {
      getUserRepos(food);
      //resets value 
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please try again');
    }
};

var getUserRepos = function (user) {
    var apiUrl = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + user;
    //gets data from our API and also gives them the passkey
    fetch(apiUrl, options)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var testing_data = [];
            //loops to create a list of calories if there's multiple food inputs
            for (var i = 0; i < data.length;i++){
              var caloriesListings = document.createElement("div");
              caloriesListings.classList = "list-item flex-row justify-space-between"
              testing_data = data[i].calories;
              caloriesListings.textContent = "Calories" + i + ":"+ testing_data;
              repoContainerEl.appendChild(caloriesListings);
            }
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect');
      });
};


//search button  
userFormEl.addEventListener('submit', formSubmitHandler);

  




