console.log("hello");

const myLibrary = [];

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

const form = document.querySelector("#makeBookForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const pages = document.querySelector("#pages");

  const read = readOrNot();

  const newBook = new Book(author.value, title.value, pages.value, read);
  myLibrary.push(newBook);
});

function readOrNot() {
  const read = document.querySelector("#read");
  const notRead = document.querySelector("#notRead");

  if (read.checked) return true;
  if (notRead.checked) return false;

  return;
}
