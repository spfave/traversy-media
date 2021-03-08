// Book Class: Represent a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Storage.getBooks();

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const bookList = document.querySelector("#book-list");

    const bookRow = document.createElement("tr");
    bookRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    bookList.appendChild(bookRow);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    // Create alert div
    const div = document.createElement("div");
    div.className = `alert alert-${className} text-center`;
    div.appendChild(document.createTextNode(message));

    // insert Alert div in DOM
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Timeout alert message after 3sec
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Storage Class: Handles Storage
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Storage.getBooks();

    books.forEach((book, index) => {
      if ((book.isbn = isbn)) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (!title || !author || !isbn) {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // instantiate book
    const book = new Book(title, author, isbn);

    // Add book to list and render to page
    UI.addBookToList(book);

    // Store book in local storage
    Storage.addBook(book);

    // Show success message
    UI.showAlert("Book added", "success");

    // Clear form fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove book from book list display
  UI.deleteBook(e.target);

  // Remove book from local storage
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.showAlert("Book removed", "success");
});
