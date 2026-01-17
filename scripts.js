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

function readOrNot() {
  const read = document.querySelector("#read");
  const notRead = document.querySelector("#notRead");

  if (read.checked) return true;
  if (notRead.checked) return false;

  return;
}

function createCards() {
  const cardsContainer = document.querySelector(".cardsContainer");
  cardsContainer.innerHTML = "";

  for (book of myLibrary) {
    const card = document.createElement("div");
    card.classList.add(".card");

    const title = document.createElement("h3");
    title.innerText = book.title;

    const author = document.createElement("h5");
    author.innerText = book.author;

    const pages = document.createElement("p");
    pages.innerText = book.pages;

    const read = document.createElement("p");
    if (book.read) {
      read.innerText = "Read";
    } else {
      read.innerText = "Not Read";
    }

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

    card.append(title, author, pages, read, clearButton);
    cardsContainer.append(card);
  }
}
