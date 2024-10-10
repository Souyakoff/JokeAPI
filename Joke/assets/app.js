// Sélectionner les éléments du DOM
const fetchJokeBtn = document.getElementById('fetchJokeBtn');
const clearTableBtn = document.getElementById('clearTableBtn');
const addJokeBtn = document.getElementById('addJokeBtn');
const jokesTableBody = document.getElementById('jokesTableBody');
const userJokeInput = document.getElementById('userJokeInput');

// Fonction pour récupérer une blague depuis l'API
function fetchJoke() {
    const selectedCategory = document.getElementById('categorySelect').value;  // Récupérer la catégorie sélectionnée
    const apiUrl = `https://v2.jokeapi.dev/joke/${selectedCategory}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();  // Transformer la réponse en JSON
        })
        .then(jokeData => {
            console.log(jokeData);  // Pour vérifier les données reçues

            if (jokeData.joke) {
                addJokeToTable(jokeData.joke, selectedCategory); // Passer la catégorie ici
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
    const categoryCell = document.createElement('td'); // Nouvelle cellule pour la catégorie
    const actionCell = document.createElement('td');

    // Ajouter la blague
    jokeCell.textContent = joke;

    // Ajouter la catégorie
    categoryCell.textContent = category; // Afficher la catégorie

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
    row.appendChild(categoryCell); // Ajouter la cellule de catégorie
    row.appendChild(actionCell);
    
    // Ajouter la ligne au tableau
    jokesTableBody.appendChild(row);
}

// Fonction pour ajouter la blague de l'utilisateur
function addUserJoke() {
    const userJoke = userJokeInput.value.trim(); // Récupérer la blague de l'utilisateur
    const selectedCategory = document.getElementById('categorySelect').value; // Récupérer la catégorie sélectionnée
    if (userJoke) {
        addJokeToTable(userJoke, selectedCategory); // Passez la catégorie ici
        userJokeInput.value = ''; // Réinitialiser le champ de saisie
    } else {
        alert("Veuillez entrer une blague avant de l'ajouter.");
    }

    // Fonction pour vider le tableau

}
// Fonction pour vider le tableau
function clearTable() {
    jokesTableBody.innerHTML = ''; // Vide le corps du tableau
}


// Ajouter des événements aux boutons
fetchJokeBtn.addEventListener('click', fetchJoke);
clearTableBtn.addEventListener('click', clearTable);
addJokeBtn.addEventListener('click', addUserJoke);
