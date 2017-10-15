(function() {
    var searchForm = document.getElementById("search-form");
    var searchKeyword = document.getElementById("search-keyword");
    searchKeyword.focus();
    let searchText;
    var resultsContainer = document.getElementById("results-container");
    
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        resultsContainer.innerHTML = '';
        searchText = searchKeyword.value;

        // Error Handling
        function requestError(e, part) {
            console.log(e);
            resultsContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
        
        //Post results on page
        function addArticles(data) {
            var content = '';
            let title = data[1];
            let description = data[2];
            let link = data[3];
            console.log(data);
            for (var i = 0; i < title.length; i++) {
                content += `<a href=${link[i]} target="_blank">
                    <div id="articles">
                        
                        <h1>${title[i]}</h1>
                        <p>${description[i]}...</p>
                    </div>
                </a>`;
            }

            resultsContainer.insertAdjacentHTML('beforeend', content);
        }

        
        // <li><h3>${summary}</h3></li>
        // <li><p><a href="${link}>Read More</a></p></li>

        //Form API query URL
        fetch(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=opensearch&search=${searchText}`, {
            headers: new Headers( {
                'Api-User-Agent': 'WikiViewer/1.0 (https://timh1203.github.io/wikipedia-viewer/; )'
            })
        })
        .then(response => response.json())
        .then(addArticles)
        .catch(err => requestError(err, 'image'));
    })  
})();

// // Using fetch
// fetch( remoteUrlWithOrigin, {
//     method: 'POST',
//     headers: new Headers( {
//         'Api-User-Agent': 'Example/1.0'
//     } )
//     // Other init settings such as 'credentials'
// } ).then( function ( response ) {
//     if ( response.ok ) {
//         return response.json();
//     }
//     throw new Error( 'Network response was not ok: ' + response.statusText );
// } ).then( function ( data ) {
//     // do something with data
// })
// .then(response => response.json())
// .then(addImage)
// .catch(err => requestError(err, 'image')); // end of add image fetch 

// https://timh1203.github.io/wikipedia-viewer/

// (https://example.org/MyCoolTool/; MyCoolTool@example.org)

// // Add articles function and fetch request
// function addArticles(data) {
//     let htmlContent = '';

//     if (data.response && data.response.docs && data.response.docs.length > 1) {
//         htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
//             <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
//             <p>${article.snippet}</p>
//             </li>`
//         ).join('') + '</ul>';
//     } else {
//         htmlContent = '<div class="error-no-articles">No articles available</div>';
//     }

//     responseContainer.insertAdjacentHTML('beforeend', htmlContent);
// } // end of addArticles()

// fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=62441442c2604cc69e2a2c6f8b100ac4`)
// .then(response => response.json())
// .then(addArticles)
// .catch(err => requestError(err, 'image')); // end of add articles fetch
// });