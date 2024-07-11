document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

 form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm === '') return;
    userList.innerHTML = '';
    reposList.innerHTML = '';
    const userSearchEndpoint = `https://api.github.com/search/users?q=${searchTerm}`

  fetch(userSearchEndpoint)
  .then(response => response.json())
  .then(data => {
     data.items.forEach(user => {
        const userItem = document.createElement('li');
        const userLink = document.createElement('a');
        userLink.href = user.html_url;
        userLink.target = '_blank';
        userLink.textContent = user.login;
        userItem.appendChild(userLink);
        userList.appendChild(userItem);
    userLink.addEventListener('click', function(event) {
        event.preventDefault();
        fetch(user.repos_url)
        .then(response => response.json())
        .then(repos => {
            reposList.innerHTML = '';
            repos.forEach(repo => {
                const repoItem = document.createElement('li');
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.target = '_blank';
                repoLink.textContent = repo.name;
                repoItem.appendChild(repoLink);
                reposList.appendChild(repoItem);
                                });
                            })
.catch(error => console.error('Error fetching repositories:', error));
                    });
                });
    })
.catch(error => console.error('Error fetching users:', error));
    });
});
