const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.results')
const container = document.querySelector('.container')
const submitButton = document.querySelector('#search')
let searchQuery = '';
const APP_ID = '243a6226'
const APP_KEY = 'c226ec80248eb422b5e4d3231cf05f51'


submitButton.addEventListener('click',(e)=>{
    //e.preventDefault()
    searchQuery = document.querySelector('input').value;
    fetchAPI()
    //console.log(searchQuery)
})
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value;
    fetchAPI()
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits)
    //console.log(data)
}
function generateHTML(results){
    let generatedHTML = ''
    results.map(result => {
        generatedHTML += 
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}" target="_blank" class="view-button">View Recipe</a>
        </div>
        <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label : ${result.recipe.dietLabels}</p>
        <p class="item-data">Health Label : ${result.recipe.healthLabels}</p>
        </div>
        `
    })
    searchResult.innerHTML = generatedHTML
}