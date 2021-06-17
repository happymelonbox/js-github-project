
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
        const createNewUserList = function(){
            let userListUl = userList.appendChild(document.createElement('li')).appendChild(document.createElement('ul'))
            userListUl.setAttribute('class', 'Users')
            userListUserName = userListUl.appendChild(document.createElement('li'))
            userListUserName.innerHTML = `Username: ${userInfo.login}`
            userListAvatar = userListUl.appendChild(document.createElement('li')).appendChild(document.createElement('img'))
            userListAvatar.setAttribute('src', `${userInfo.avatar_url}`)
            userListProfile = userListUl.appendChild(document.createElement('li')).appendChild(document.createElement('a'))
            userListProfile.innerHTML = 'Profile'
            userListProfile.setAttribute('target', '_blank')
            userListProfile.setAttribute('href', `https://github.com/${userInfo.login}`)
            userListProfile.addEventListener('click', function(){
                fetch(`https://api.github.com/users/${input}/repos?per_page=100&type=owner`)
                .then(resp => resp.json())
                .then((json) => {
                    console.log(Object(json))
                    let repoCount = Object(json).length
                    if (repoCount === undefined){
                        return repoCount = `0`
                    }
                    let repoCountLi = userListUl.appendChild(document.createElement('li'))
                    repoCountLi.innerHTML = `Total number of Repositories: ${repoCount}`
                })
            })
        }
        for (let i=0;i<dataValues[2].length;i++){
            userInfo = dataValues[2][i]
            createNewUserList(userInfo)
        }
        })
})
})