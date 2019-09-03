function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function BookListView() {}

BookListView.prototype.addBookToList = function(book) {
    var list = document.getElementById('book-list');
    var row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

BookListView.prototype.clearBookFromList = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

BookListView.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

BookListView.prototype.showAlert = function(message, className) {
    var errorMessageElement = document.createElement('div');
    errorMessageElement.className = `alert ${className}`;
    errorMessageElement.appendChild(document.createTextNode(message));
    var container = document.querySelector('.container');
    var form = document.querySelector('#book-form');
    container.insertBefore(errorMessageElement, form);
    //Timeout after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

function initEventListeners() {
    document.getElementById('book-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var title = document.getElementById('title').value;
        var author = document.getElementById('author').value;
        var isbn = document.getElementById('isbn').value;

        var book = new Book(title, author, isbn);
        var view = new BookListView();

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

        var view = new BookListView();
        view.clearBookFromList(e.target);
        view.showAlert('Book Removed!', 'success');
    })
}
initEventListeners();