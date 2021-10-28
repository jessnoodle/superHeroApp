const searchBox = document.getElementById("searchBox")
const searchButton = document.getElementById("searchButton")
const random = document.getElementById("random").addEventListener("click", randomHero)
// ^ Search variables

const heightDiv = document.getElementById("height")
const imagebox = document.getElementById("imagehere")
const heroname = document.getElementById("heroname")
// ^Dynamic content variables


// Finds what hero the user searches for and saves that into a variable - "query"
searchButton.addEventListener('click', function () {
    const query = searchBox.value
    searchHero(query)
})


// This function takes what user searches for, searches in API for hero and returns image, height info 


async function searchHero (query){
    
   // clear any previous results and clear the background
   heightDiv.innerHTML = ''
   imagebox.innerHTML = ''
   heroname.innerHTML = ''
   document.body.style.background = "white";

   // If there a multiple results for a search, ie "Venom", "Venom II" we will take the first result and display data for that hero + Display the heros Name.
    const response = await fetch(`https://www.superheroapi.com/api.php/10165671923715611/search/${query}`)
    const data = await response.json()
    console.log(data)
    

    
    // Saving results of height, name of hero and heros' image
    const height = data.results[0].appearance.height[0]
    const  name = data.results[0].name
   
    
    // Displays heros name
    heroname.append(name) 
    
    // Returns image results and displays in Image Div
    let newImg = document.createElement('img')
    newImg.src = data.results[0].image.url
    imagehere.append(newImg)
    
    // If height recorded, display it to user. If not, send an error message.
 if (height == "-"){
    heightDiv.append(`Sorry, there was no height recorded for ${name}. Maybe they are really short and want to keep it a secret.`) 
 } else {
    heightDiv.append(`${name} is ` + height + `ft tall`)  
 }
}
  


// Random hero function
  
async function randomHero() {
    
    // clear any previous results + clear background
    heightDiv.innerHTML = ''
    imagebox.innerHTML = ''
    heroname.innerHTML = ''
    document.body.style.background = "white";
    
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

