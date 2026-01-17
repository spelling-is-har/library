console.log("hello");

function Book(author, title, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

//create some dummy objects
const testBook = new Book("The Rock", "How To Wrestle", 7, true);
const testBook2 = new Book(
  "Jonathan Winter",
  "This Dude Will Never Write a Book",
  126,
  false
);
const testBook3 = new Book("Mr. Potato Head", "A Life In Mash", 567, true);
const testBook4 = new Book(
  "Dwayne Johnson",
  "How to Stop Wrestling",
  1276,
  true
);

const myLibrary = [testBook, testBook2, testBook3, testBook4];

const form = document.querySelector("#makeBookForm");

//call function to create cards for test books
createCards();

//form to add new books
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");

  const read = readOrNot();

  const newBook = new Book(author.value, title.value, pages.value, read);
  myLibrary.push(newBook);
  createCards();
});

//initial check to see if the book has been read or not when a book is created
function readOrNot() {
  const read = document.querySelector("#read");
  const notRead = document.querySelector("#notRead");

  if (read.checked) return true;
  if (notRead.checked) return false;

  return;
}

function updateRead(card, radio) {
  for (let item of myLibrary) {
    if (card.dataset.id === item.id) {
      if (radio.value === "true") item.read = true;
      else item.read = false;
    }
  }
}

function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = book.id;

  return card;
}

function createTitle(book) {
  const title = document.createElement("h3");
  title.innerText = book.title;

  return title;
}

function createAuthor(book) {
  const author = document.createElement("h5");
  author.innerText = book.author;

  return author;
}

function createPages(book) {
  const pages = document.createElement("p");
  pages.innerText = book.pages;
}

//creates a button to keep track of whether the book has been read or not
function createReadButton(book, card) {
  const readButton = document.createElement("button");
  if (book.read) {
    readButton.innerText = "READ";
  } else {
    readButton.innerText = "NOT READ";
  }
  readButton.addEventListener("click", (event) => {
    //keeps track of the state of the button and updates the array and the button
    if (readButton.innerText === "READ") {
      readButton.innerText = "NOT READ";
      book.read = false;
    } else {
      readButton.innerText = "READ";
      book.read = true;
    }
  });

  return readButton;
}

//creates a button to clear the card and the entry in myLibrary[]
function createClear(book) {
  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear";
  clearButton.dataset.id = book.id;
  clearButton.addEventListener("click", (event) => {
    event.preventDefault;
    const index = myLibrary.findIndex(
      (book) => book.id === clearButton.dataset.id
    );
    myLibrary.splice(index, 1);
    createCards();
  });

  return clearButton;
}

//function to create all the cards for the books in myLibrary[]
function createCards() {
  const cardsContainer = document.querySelector(".cardsContainer");
  cardsContainer.innerHTML = "";

  for (book of myLibrary) {
    const card = createCard(book);
    const title = createTitle(book);
    const author = createAuthor(book);
    const pages = createPages(book);
    const readButton = createReadButton(book);
    const clearButton = createClear(book);

    card.append(title, author, pages, readButton, clearButton);
    cardsContainer.append(card);
  }
}
