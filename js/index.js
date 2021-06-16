
document.addEventListener('DOMContentLoaded', function(){
let form = document.getElementById('github-form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    let input = document.getElementById('search').value
    fetch(`https://api.github.com/search/users?q=${input}`)
    .then(response => response.json())
    .then(function(data){
        console.log(data)
        
    }
    )
})
})