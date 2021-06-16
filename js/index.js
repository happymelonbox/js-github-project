
document.addEventListener('DOMContentLoaded', function(){
let form = document.getElementById('github-form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    let input = document.getElementById('search').value
    fetch(`https://api.github.com/search/users?q=${input}`)
    .then(response => response.json())
    .then(function(data){
        let dataKeys = Object.keys(data)
        let dataValues = Object.values(data)
        let userNameHeading = document.createElement('h2')
        userNameHeading.setAttribute('id', 'userNameHeading')
        let userName = dataValues[2][0].login
        userNameHeading.innerHTML = 'Username:'
        document.body.appendChild(userNameHeading)
        let displayUserName = document.createElement('p')
        displayUserName.setAttribute('id', 'displayUserName')
        displayUserName.innerHTML = userName
        document.body.appendChild(displayUserName)

        // console.log(dataKeys)
        // console.log(dataValues[2][0].login)
    }
    )
})
})