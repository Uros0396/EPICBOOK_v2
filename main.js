const url = `https://striveschool-api.herokuapp.com/books`;
const inputSearchBooks = document.getElementById("search-books");
const divContainerCards = document.getElementById("cards-books");
const counterCart = document.getElementById("counterCart");
let globalCounterCart = 0;
let cartIcon = document.getElementById("cartOffCanvas");
let quantityOffCanvas = document.getElementById("cartItemCount");

const searchBooks = (event) => {
    event.preventDefault();
    const searchQuery = inputSearchBooks.value.trim(); 
    const urlBooks = `${url}?title=${(searchQuery)}`; 

    fetch(urlBooks)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Errore nella risposta di rete: ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            
            divContainerCards.innerHTML = ""; 
            if (data.length > 0) {
                data.filter(elem => !inputSearchBooks.value || elem.title.toLowerCase().trim().includes(inputSearchBooks.value.toLowerCase().trim())).forEach(book => createBooksCards(divContainerCards, book));
            } else {
                divContainerCards.innerHTML = "<p>Nessun libro trovato.</p>";
            }
        })
        .catch((error) => {
            console.error('Si è verificato un errore:', error);
            divContainerCards.innerHTML = "<p>Si è verificato un errore durante la ricerca dei libri.</p>";
        });
};

const createBooksCards = (divToAppend, cardData) => {
    const divCardWrapper = document.createElement("div");
    divCardWrapper.setAttribute("class", "col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center mb-4");
    
    const divCard = document.createElement("div");
    divCard.setAttribute("class", "card");
    
    const imgBook = document.createElement("img");
    imgBook.setAttribute("class", "card-img-top w-100");
    imgBook.src = cardData.img;

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title")
    title.innerText = cardData.title;
    
    const price = document.createElement("p");
    price.setAttribute("class", "card-text")
    price.innerText = cardData.price + "€";
    
    const category = document.createElement("p");
    category.setAttribute("class", "card-text")
    category.innerText = cardData.category;

    const divTwoButton = document.createElement("div");
    divTwoButton.setAttribute("class", "d-flex justify-content-between");

    const buttonSalta = document.createElement("button")
    buttonSalta.setAttribute("class", "btn btn-warning");
    buttonSalta.innerText = "SALTA";
    
    const buttonDettagli = document.createElement("button");
    buttonDettagli.setAttribute("class", "btn btn-secondary");
    buttonDettagli.innerText = "DETTAGLI";
    

     // EVENT LISTENER PER BUTTON "DETTAGLI"////////////
   buttonDettagli.addEventListener("click", () => {
    window.location.href = `details.html?id=${cardData.asin}`;
})

const divButton = document.createElement("div");
divButton.setAttribute("class", "card-footer text-center");

const button = document.createElement("button");
button.setAttribute("class", "btn btn-text");
button.innerText = "ACQUISTA LIBRO";

    
divTwoButton.append(buttonDettagli, buttonSalta);
divButton.appendChild(button);
cardBody.append(title, price, category);
divCard.append(imgBook, cardBody, divTwoButton, divButton);
divCardWrapper.append(divCard); 
divToAppend.append(divCardWrapper);

button.addEventListener("click", () => {
    if (globalCounterCart >= 0) {
    globalCounterCart++
    counterCart.innerText = globalCounterCart;
    quantityOffCanvas.innerText = globalCounterCart;
    divCard.classList.add("opacity")
    button.innerText = "AGGIUNTO AL CARRELLO";
    addToCart(cardData, divCard) 
    } 
})

cartIcon.addEventListener("click", () => {
    document.getElementById("offcanvasExample")
}) 

buttonSalta.addEventListener("click", () => {
    divCardWrapper.remove();
})} 
    
const addToCart = (cardData, originalCard) => {
    
    const cartCard = document.createElement("div");
    cartCard.setAttribute("class", "d-flex justify-content-between mb-2 border-bottom pb-2");

    const imgBook = document.createElement("img");
    imgBook.setAttribute("class", "w-25 modifyImg");
    imgBook.src = cardData.img;

    const cartCardBody = document.createElement("div");
    cartCardBody.setAttribute("class", "ms-3");

    const title = document.createElement("h5");
    title.setAttribute("class", "mb-1");
    title.innerText = cardData.title;

    const price = document.createElement("p");
    price.setAttribute("class", "mb-1");
    price.innerText = `€${cardData.price}`;

    const buttonRemove = document.createElement("button");
    buttonRemove.setAttribute("class", "btn btn-secondary h-50");
    buttonRemove.innerText = "X"

    cartCardBody.append(title, price);
    cartCard.append(imgBook, cartCardBody, buttonRemove);
    cartContainer.appendChild(cartCard);
        
    buttonRemove.addEventListener("click", () => {
        if (globalCounterCart > 0) {
            globalCounterCart--;
            counterCart.innerText = globalCounterCart;
            quantityOffCanvas.innerText = globalCounterCart;
            originalCard.classList.remove("opacity")
            originalCard.querySelector(".btn-text").innerText = "ACQUISTA LIBRO";
            
            cartCard.remove()                
    }})     
};

