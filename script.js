const searchForm = document.getElementById('search-form');
const input = document.getElementById('word-input');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const word = input.value.trim();
    if (!word) return;

    // Show loading state
    resultsContainer.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(
            'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
        );

        if (!response.ok) {
            throw new Error("Word not found. Try another!");
        }

        const data = await response.json();
        displayResults(data[0]);

    } catch (error) {
        resultsContainer.innerHTML = '<p class="error">' + error.message + '</p>';
    }
});

function displayResults(data) {
    // 1. Get the first meaning and the first definition from the lists
    const firstMeaning = data.meanings[0];
    const firstDefinition = firstMeaning.definitions[0].definition;
    const phonetic = data.phonetic || "Phonetic unavailable";
    
// 2. Build the HTML using single quotes and +
resultsContainer.innerHTML = 
'<h2>' + data.word + '</h2>' + 
'<p class="phonetic">' + phonetic + '</p>' + 
'<div class="meaning">' +
'<strong>' + firstMeaning.partOfSpeech + '</strong>' +
'<p>' + firstDefinition + '</p>' +
'</div>';
}