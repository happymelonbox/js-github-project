
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
        let userList = document.getElementById('user-list')
        let userInfo
        for (let i=0;i<dataValues[2].length;i++){
            userInfo = dataValues[2][i]
            userInnerList.innerHTML = `Username: ${userInfo.login}>`
            avatarImg.setAttribute('src', `${userInfo.avatar_url}`)
            profile.innerHTML = 'Profile'
            profile.setAttribute('target', '_blank')
            profile.setAttribute('href', `https://github.com/${userInfo.login}`)
        console.log(dataKeys)
        console.log(dataValues)
    }}
    )
})
})