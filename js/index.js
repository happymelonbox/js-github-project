
document.addEventListener('DOMContentLoaded', function(){
let form = document.getElementById('github-form')


form.addEventListener('submit', function(event){
    event.preventDefault()
    let input = document.getElementById('search').value
    console.log(input)
})

})