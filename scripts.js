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

const newBook = new Book("jon", "jons book", 123, true);

console.log(newBook);

function addBookToLibrary(book) {
  myLibrary.push(book);
}
