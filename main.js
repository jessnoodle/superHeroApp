const searchBox = document.getElementById("searchBox")
const searchButton = document.getElementById("searchButton")
const heightDiv = document.getElementById("height")
const info = document.getElementById("info")






searchButton.addEventListener('click', function () {
    const query = searchBox.value
    searchHero(query)
})

async function searchHero (query){
    
    const response = await fetch(`https://www.superheroapi.com/api.php/10165671923715611/search/${query}`)
    const data = await response.json()
    console.log(data)
    const height = data.results[0].appearance.height[0]
    
    // console.log(data.results[0].biography.aliases)
    const aliases = data.results[0].biography.aliases
    heightDiv.append(height)
    info.append(aliases)
    
    const image = data.results[0].image.url
    console.log(image)
    
    let newImg = document.createElement('img')
    newImg.src = data.results[0].image.url
    imagehere.append(newImg)
    

}
