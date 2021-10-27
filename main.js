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


// Takes that user searches for, searches in API for hero and returns image, height info 
async function searchHero (query){
    
   // clear any previous results
   heightDiv.innerHTML = ''
   imagebox.innerHTML = ''

    const response = await fetch(`https://www.superheroapi.com/api.php/10165671923715611/search/${query}`)
    const data = await response.json()
    console.log(data)
    
    // If there a multiple results for a search, ie "Venom", "Venom II" we will take the first result and display data for that hero + Display the heros Name.
    const height = data.results[0].appearance.height[0]
    heightDiv.append(height) 
    let name = data.results[0].name
    heroname.append(name) 
    console.log(name)
    
    
    // Testing to see if can return alias info too
    // console.log(data.results[0].biography.aliases)
    // const aliases = data.results[0].biography.aliases
    // info.append(aliases)
    
    // Returns image results and displays in Image Div
    const image = data.results[0].image.url
    let newImg = document.createElement('img')
    newImg.src = data.results[0].image.url
    imagehere.append(newImg)

}


// Random hero function
  
async function randomHero() {
    // First pick a random number betwen 1 - 731(How many heros in the API)
    const id = Math.floor(Math.random() * (731 - 1 + 1)) + 1;
    console.log(id)
    
    // clear any previous results
    heightDiv.innerHTML = ''
    imagebox.innerHTML = ''
    heroname.innerHTML = ''
    
    
    const response = await fetch(`https://www.superheroapi.com/api.php/10165671923715611/${id}`)
    const data = await response.json()
    console.log(data)
    
    const height = data.appearance.height[0]
    const image = data.image.url
    const name = data.name
    
    heightDiv.append(height) 
    heroname.append(name) 

    console.log(height)
    console.log(name)
    let newImg = document.createElement('img')
    newImg.src = data.image.url
    imagehere.append(newImg)
    
}