
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
        let repoList = document.getElementById('repos-list')
        let userInfo
        let repoName
        const createNewUserList = function(){
            let userListUl = userList.appendChild(document.createElement('li')).appendChild(document.createElement('ul'))
            userListUl.setAttribute('class', 'Users')
            userListUserName = userListUl.appendChild(document.createElement('li'))
            userListUserName.innerHTML = `Username: ${userInfo.login}`
            userListAvatar = userListUl.appendChild(document.createElement('li')).appendChild(document.createElement('img'))
            userListAvatar.setAttribute('src', `${userInfo.avatar_url}`)
            userListProfile = userListUl.appendChild(document.createElement('li')).appendChild(document.createElement('a'))
            userListProfile.innerHTML = 'Profile'
            userListProfile.setAttribute('id', `${userInfo.login}`)
            userListProfile.addEventListener('click', function(){
                let user = userInfo.login
                fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`,{
                    cache: 'no-store'
                })
                .then(resp => resp.json())
                .then((json) => {
                    let repoCount = Object(json).length
                    let repos = Object(json)
                    if (repoCount === undefined){
                        return repoCount = `No repositories available`
                    }
                    let repoCountLi = userListUl.appendChild(document.createElement('li'))
                    let repoItems = repoList.appendChild(document.createElement('li'))
                    repoCountLi.innerHTML = `Total number of Repositories: ${repoCount}`
                    for (let i=0;i<repoCount;i++){
                        let repoItem = repoItems.appendChild(document.createElement('li').appendChild(document.createElement('a')))
                        repoName = repos[i].name
                        repoItem.innerHTML = `${repoName}`
                        repoItem.parentElement.setAttribute('class', 'repoItem')
                        repoItem.setAttribute('class', 'eachRepo')
                        repoItem.setAttribute('href', `https://www.github.com/${userInfo.login}/${repoName}`)
                        repoItem.setAttribute('target', '_blank')
                    }})
                    })
                }
                for (let i=0;i<dataValues[2].length;i++){
                    userInfo = dataValues[2][i]
                    createNewUserList(userInfo)
                }
                })})})