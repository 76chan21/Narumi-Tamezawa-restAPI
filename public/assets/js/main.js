document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#search-btn").addEventListener("click", searchDefinition);
});

async function searchDefinition() {
    const term = document.querySelector('#search').value;
    const word = document.querySelector('#word'); // h3
    const definition = document.querySelector('#definition'); // p
    word.innerHTML = 'Loading...';

    // getting API
    const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${term}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a603d5c304mshb5eefc0fdbcfff2p1f7b5cjsn10f7bddfc943',
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // check the data (all the definitions)
        console.log(data);

        if (data.list && data.list.length > 0) {
            word.innerHTML = `${term}`;
            definition.innerHTML = `${data.list[0].definition}`;
        } else {
            word.innerHTML = 'No definition found.';
            // make sure p is empty
            definition.innerHTML = '';
        }
    } catch (error) {
        word.innerHTML = 'Error fetching definition.';
        console.error(error);
    }
}
