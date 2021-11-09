const searchBox = document.getElementById("searchBox")
const searchButton = document.getElementById("searchButton")
const random = document.getElementById("random").addEventListener("click", randomHero)
// ^ Search variables

const heightDiv = document.getElementById("height")
const imagebox = document.getElementById("imagehere")
const heroname = document.getElementById("heroname")
// ^Dynamic content variables

// Saves search in local storage
window.addEventListener('load', function(){
   let lastQuery = localStorage.getItem("query");
   searchBox.value = lastQuery;
   })

// Finds what hero the user searches for and saves that into a query variable.
searchButton.addEventListener('click', function () {
    const query = searchBox.value
    searchHero(query)
})


// Clear any previous results and change the bakcground to white.
function clear (){
   heightDiv.innerHTML = ''
   imagebox.innerHTML = ''
   heroname.innerHTML = ''
   document.body.style.background = "white";
}

// This function takes what user searches for, searches in API for hero and returns image and height info 
async function searchHero (query){
     clear ()

   query = searchBox.value;
   localStorage.setItem('query', query);

   
    const response = await fetch(`https://www.superheroapi.com/api.php/10165671923715611/search/${query}`)
    const data = await response.json()
    console.log(data)
    
   // Displays heros name or error message if can't find
   if (data.error){
    heroname.append("Sorry, we can't find that hero. Try again") 
    } else {
       // If there a multiple results for a search, ie "Venom", "Venom II" we will take the first ([0]) result and display data for that hero 
     const name =  data.results[0].name
    heroname.append(name) 

     // Saving results of height
   const height = data.results[0].appearance.height[0] 
      
   // If height recorded, display it to user. If not, send an error message.
if (height == "-"){
   heightDiv.append(`Sorry, there was no height recorded for ${name}. Maybe they are really short and want to keep it a secret.`) 
} else {
   heightDiv.append(`${name} is ` + height + `ft tall`)  
}  

//  add heros image
  let newImg = document.createElement('img')
  newImg.src = data.results[0].image.url
  imagehere.append(newImg)
   console.log(newImg.src)

}}
  
// Random hero function
  
async function randomHero() {
   clear ()
    
    // First pick a random number between 1 - 731(How many heros in the API) and searches for the random ID
    const id = Math.floor(Math.random() * (731 - 1 + 1)) + 1;
    const response = await fetch(`https://www.superheroapi.com/api.php/10165671923715611/${id}`)
    const data = await response.json()
    console.log(data)
    
    // Saving name and height data
    const height = data.appearance.height[0]
    const name = data.name
    
    // Add heros name to top of card
    heroname.append(name) 
    
    // If height was recorded, display to user
    if (height == "-"){
        heightDiv.append(`Sorry, there was no height recorded for ${name}. Maybe they are really short and want to keep it a secret.`) 
     } else {
        heightDiv.append(`${name} is ` + height + `ft tall`) 
    
     }

    // add heros image
    let newImg = document.createElement('img')
    newImg.src = data.image.url
    imagehere.append(newImg)
    
}

