// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// View Constructor
function BookListView() {
}

BookListView.prototype.addBookToList = function(book) {
    var list = document.getElementById('book-list');
}

var helperFunctions = {
    getFormValues: function() {
        var formValues = {};
        formValues.title = document.getElementById('title').value;
        formValues.author = document.getElementById('author').value;
        formValues.isbn = document.getElementById('isbn').value;
        return formValues;
    }
}
// Event Listeners
function initEventListeners() {
    document.getElementById('book-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var title = helperFunctions.getFormValues().title;
        var author = helperFunctions.getFormValues().author;
        var isbn = helperFunctions.getFormValues().isbn;
        // Instantiate Book
        var book = new Book(title, author, isbn);
        // Instantiate View
        var view = new BookListView();
        view.addBookToList(book);

    });
}
initEventListeners();