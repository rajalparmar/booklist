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

function initEventListeners() {
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
            view.showAlert('Book Added!', 'success');
            view.clearFields();
        }
    });
    document.getElementById('book-list').addEventListener('click', function(e) {
        e.preventDefault();

        const view = new BookListView();
        view.clearBookFromList(e.target);
        view.showAlert('Book Removed!', 'success');
    });
}

initEventListeners();


