const searchForm = document.getElementById('search-form');
const input = document.getElementById('word-input');
const resultsContainer = document.getElementById('resultsa-container');

searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const word = input.ariaValueMax.trim();
    if (!word) return;

    // Show loading state
    resultsContainer.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(
            'https://api.dictionaryapi.dev/api/v2/entries/en/<word>'
        );

        if (!response.ok) {
            throw new Error("Word not found. Try another!");
        }

        const data = await response.json();
        displayResults(data[0]);

    } catch (error) {
        resultsContainer.innerHTML = '<p class="error">${error.message}</p>';
    }
});

function displayResults(data) {
    const phonetic = data.phonetic || "Phonetic unavailable";
    
    const meanings = data.meanings.map(m => {
        const definition = m.definitions[0].definition;
        const example = m.definition[0].example;

        return '<div class="definition-item">' +
        '<strong>' + m.partOfSpeech + '</strong>: ' + definition +
        (example ? '<br><em>Example:"' + example + '"</em>' : '') +
        '</div>';

    }).join('');

    resultsContainer.innerHTML = 
    '<h2>' + data.word + '</h2>' +
    '<p><em>' + phonetic + '</em></p>' +
    meanings;
}