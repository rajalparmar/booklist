class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class BookListView {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        const errorMessageElement = document.createElement('div');

        errorMessageElement.className = `alert ${className}`;
        errorMessageElement.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(errorMessageElement, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    clearBookFromList(targetElement) {
        if (targetElement.className === 'delete') {
            targetElement.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
// Local Store Class
class Store {
    static getBooks() {
        let books = [];
        if(localStorage.getItem('books')) {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => {
            const ui = new BookListView();
            ui.addBookToList(book);
        });

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
function initEventListeners() {
    document.addEventListener('DOMContentLoaded', Store.displayBooks());
    document.getElementById('book-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        const book = new Book(title, author, isbn);
        const view = new BookListView();

        if (title === '' || author === '' || isbn === '') {
            view.showAlert('Please enter all fields', 'error');
        } else {
            view.addBookToList(book);

            // Add the book to local storage
            Store.addBook(book);

            view.showAlert('Book Added!', 'success');
            view.clearFields();
        }
    });
    document.getElementById('book-list').addEventListener('click', function(e) {
        e.preventDefault();

        const view = new BookListView();
        view.clearBookFromList(e.target);
        let isbn = e.target.parentElement.previousElementSibling.textContent;

        // Remove book from local storage
        Store.removeBook(isbn);
        view.showAlert('Book Removed!', 'success');
    });
}

initEventListeners();


