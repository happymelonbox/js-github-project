
document.addEventListener('DOMContentLoaded', function(){

    const form = document.getElementById('github-form')
    let toggleButton, input

    toggleButton = document.getElementById('toggle')
    toggleButton.addEventListener('click', function(event){
        if (toggleButton.className === 'toggleToRepos' || toggleButton.className === undefined){
            toggleButton.innerHTML = 'Click to search for users'
            toggleButton.setAttribute('class', 'toggleToUsers')
        } else if (toggleButton.className === 'toggleToUsers' || toggleButton.className === undefined){
            toggleButton.innerHTML = 'Click to search for repositories'
            toggleButton.setAttribute('class', 'toggleToRepos')
        }
    })
    form.addEventListener('submit', function(event){
        event.preventDefault()
        input = document.getElementById('search').value
        if(toggleButton.className === 'toggleToRepos'){
        fetch(`https://api.github.com/search/users?q=${input}`)
        .then(response => response.json())
        .then(function(data){
            let dataValues = Object.values(data)
            let userList = document.getElementById('user-list')
            let repoList = document.getElementById('repos-list')
            let userInfo, repoName
            let isClicked = false
            if(input === 0 || input === undefined || input === ''){
                return alert('Please input a keyword')
            }
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
                        let repoCountLi, repoItems, allCurrentRepos, totalRepos
                        if (isClicked){
                            allCurrentRepos = document.querySelectorAll('li.repoItem')
                            allCurrentRepos[0].remove()
                            totalRepos = document.querySelectorAll('li.totalRepos')
                            totalRepos[0].remove()
                        }
                            if (repos.length === undefined || repos.length === 0){
                                alert(`No repositories available`)
                            }
                            isClicked = true
                            repoCountLi = userListUl.appendChild(document.createElement('li'))
                            repoItems = repoList.appendChild(document.createElement('li'))
                            repoCountLi.setAttribute('class', 'totalRepos')
                            repoCountLi.innerHTML = `Total number of Repositories: ${repos.length}`
                            for (let i=0;i<repos.length;i++){
                                let repoItem = repoItems.appendChild(document.createElement('li').appendChild(document.createElement('a')))
                                repoName = repos[i].name
                                repoItem.innerHTML = `${repoName}`
                                repoItem.parentElement.setAttribute('class', 'repoItem')
                                repoItem.setAttribute('class', 'eachRepo')
                                repoItem.setAttribute('href', `https://www.github.com/${user}/${repoName}`)
                                repoItem.setAttribute('target', '_blank')
                            }
                    })
                })
            }
                for (let i=0;i<dataValues[2].length;i++){
                    userInfo = dataValues[2][i]
                    createNewUserList(userInfo.login)
                }
        })
    }else if (toggleButton.className === 'toggleToUsers'){
        fetch(`https://api.github.com/search/repositories?q=${input} in:name`, {
        headers: {
                'Accept': 'application/vnd.github.v3.text-match+json'}})
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
        })}
})})