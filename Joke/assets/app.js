
const fetchJokeBtn = document.getElementById('fetchJokeBtn');
const clearTableBtn = document.getElementById('clearTableBtn');
const addJokeBtn = document.getElementById('addJokeBtn');
const jokesTableBody = document.getElementById('jokesTableBody');
const userJokeInput = document.getElementById('userJokeInput');

// Fonction pour récupérer une blague depuis l'API
function fetchJoke() {
    const selectedCategory = document.getElementById('categorySelect').value; 
    const apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategory?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json(); 
        })
        .then(jokeData => {
            console.log(jokeData); 

            if (jokeData.joke) {
                addJokeToTable(jokeData.joke, selectedCategory); 
            } else {
                console.error("Erreur : aucune blague reçue.");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la requête API:", error);
        });
}

// Fonction pour ajouter une blague dans le tableau
function addJokeToTable(joke, category) {
    const row = document.createElement('tr');
    const jokeCell = document.createElement('td');
    const categoryCell = document.createElement('td');
    const actionCell = document.createElement('td');

    // Ajouter la blague
    jokeCell.textContent = joke;

    // Ajouter la catégorie
    categoryCell.textContent = category; 

    // Ajouter le bouton pour supprimer la blague
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Supprimer";
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
    deleteButton.onclick = function() {
        row.remove();
    };

    // Ajouter les cellules à la ligne
    actionCell.appendChild(deleteButton);
    row.appendChild(jokeCell);
    row.appendChild(categoryCell);
    row.appendChild(actionCell);
    
    // Ajouter la ligne au tableau
    jokesTableBody.appendChild(row);
}

// Fonction pour ajouter la blague de l'utilisateur
function addUserJoke() {
    const userJoke = userJokeInput.value.trim();
    const selectedCategory = document.getElementById('categorySelect').value; 
    if (userJoke) {
        addJokeToTable(userJoke, selectedCategory); 
        userJokeInput.value = '';
    } else {
        alert("Veuillez entrer une blague avant de l'ajouter.");
    }



}
// Fonction pour vider le tableau
function clearTable() {
    jokesTableBody.innerHTML = ''; 
}


// Ajouter des événements aux boutons
fetchJokeBtn.addEventListener('click', fetchJoke);
clearTableBtn.addEventListener('click', clearTable);
addJokeBtn.addEventListener('click', addUserJoke);
