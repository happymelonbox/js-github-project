
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
            let user = userInfo.login
            let userListUl = userList.appendChild(document.createElement('li')).appendChild(document.createElement('ul'))
            userListUl.setAttribute('class', 'Users')
            userListUserName = userListUl.appendChild(document.createElement('li'))
            userListUserName.innerHTML = `Username: ${user}`
            userListAvatar = userListUl.appendChild(document.createElement('li')).appendChild(document.createElement('img'))
            userListAvatar.setAttribute('src', `${userInfo.avatar_url}`)
            userListProfile = userListUl.appendChild(document.createElement('li')).appendChild(document.createElement('a'))
            userListProfile.innerHTML = 'Profile'
            userListProfile.setAttribute('id', `${user}`)
            userListProfile.addEventListener('click', function(){
                fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`,{
                    cache: 'no-store'
                })
                .then(resp => resp.json())
                .then((json) => {
                    let repos = Object(json)
                    if (repos.length === undefined || repos.length === 0){
                        return repos = `No repositories available`
                    }
                    let repoCountLi = userListUl.appendChild(document.createElement('li'))
                    let repoItems = repoList.appendChild(document.createElement('li'))
                    repoCountLi.innerHTML = `Total number of Repositories: ${repos.length}`
                    for (let i=0;i<repos.length;i++){
                        let repoItem = repoItems.appendChild(document.createElement('li').appendChild(document.createElement('a')))
                        repoName = repos[i].name
                        repoItem.innerHTML = `${repoName}`
                        repoItem.parentElement.setAttribute('class', 'repoItem')
                        repoItem.setAttribute('class', 'eachRepo')
                        repoItem.setAttribute('href', `https://www.github.com/${user}/${repoName}`)
                        repoItem.setAttribute('target', '_blank')
                    }})
                    })
                }
                for (let i=0;i<dataValues[2].length;i++){
                    userInfo = dataValues[2][i]
                    createNewUserList(userInfo.login)
                }
                })})})