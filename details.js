function getBookIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}


function createBookListItem(book) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `

        <div class="d-flex mt-5">
        <img src="${book.img}" alt="pictures-book" class="w-25 h-25">
        <div>
        <p class="m-2"><strong>${book.title}</strong></p>
        <p class="m-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia atque cumque fugiat? Veritatis, impedit inventore! Debitis asperiores aperiam optio numquam architecto consequuntur natus aliquid explicabo, alias eos quod atque voluptatem.</p>
        </div>
        
        </div>
        
        
    `;
    return listItem;
}


function fetchBookDetails() {
    const bookId = getBookIdFromUrl(); // estrae l'id dall'URL

    if (!bookId) {
        console.error("Nessun ID libro trovato nell'URL.");
        return;
    }

    
    fetch(`https://striveschool-api.herokuapp.com/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            const bookList = document.getElementById('book-list');
            if (bookList) {
                
                bookList.innerHTML = '';

                const listItem = createBookListItem(book);
                bookList.appendChild(listItem);
            } else {
                console.error("Elemento con ID 'book-list' non trovato nel DOM.");
            }
        })
        .catch(error => {
            console.error("Errore nel recupero del libro:", error);
        });
}

window.onload = fetchBookDetails;