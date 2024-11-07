import {Book} from "../models/book.js";
import {showAlert} from "../utils/alert.js";

export class LibraryController {
    constructor(bookForm, bookList) {
        try {
            this.books = JSON.parse(localStorage.getItem("books")) || [];
        } catch (error) {
            console.error("Error loading books from localStorage:", error);
            this.books = [];
        }
        this.bookForm = bookForm;
        this.bookList = bookList;
        
        // Bind methods to ensure correct 'this' context
        this.deleteBook = this.deleteBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.toggleBookStatus = this.toggleBookStatus.bind(this);
    }

    addBook(bookData) {
        // Add input validation
        if (!bookData.title || !bookData.author || !bookData.year) {
            showAlert("error", "Semua field harus diisi!");
            return;
        }
        
        const newBook = new Book(
            Date.now(),
            bookData.title,
            bookData.author,
            bookData.year
        );
        this.books.push(newBook);
        this.saveAndRender();
        showAlert("success", "Buku Berhasil ditambahkan!");
    }

    editBook(id) {
        id = parseInt(id);
        const book = this.books.find((b) => b.id === id);
        if (book) {
            this.bookForm.render((updatedBook) => {
                const index = this.books.findIndex((b) => b.id === id);
                this.books[index] = {...updatedBook, id};
                this.saveAndRender();
                showAlert("success", "Buku Berhasil diperbarui!");
            });
            this.bookForm.fillForm(book);
        }
    }
    
    deleteBook(id) {
        id = parseInt(id);
        
        // Add deletion animation
        const bookCard = document.querySelector(`[data-id="${id}"]`).closest('.book-card');
        bookCard.classList.add('deleting');
        
        // Wait for animation to complete
        setTimeout(() => {
            this.books = this.books.filter((b) => b.id !== id);
            this.saveAndRender();
            showAlert("warning", "Buku Berhasil dihapus!");
        }, 500);
    }

    saveAndRender() {
        try {
            localStorage.setItem("books", JSON.stringify(this.books));
            this.bookList.render(
                this.books,
                this.deleteBook,  // No need for bind() here since we bound in constructor
                this.editBook,
                this.toggleBookStatus
            );
        } catch (error) {
            console.error("Error saving books to localStorage:", error);
            showAlert("error", "Gagal menyimpan data!");
        }
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains("theme-dark")
        ? "dark"
        : "light";
        document.body.classList.toggle("theme-dark", currentTheme === "light");
        document.body.classList.toggle("theme-light", currentTheme === "dark");
        localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeIcon = document.getElementById("theme-icon");
        const isDarkTheme = document.body.classList.contains("theme-dark");
        themeIcon.classList.toggle("bi-sun-fill", isDarkTheme);
        themeIcon.classList.toggle("bi-moon-fill", !isDarkTheme);
    }

    initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.body.classList.toggle("theme-dark", savedTheme === "dark");
        document.body.classList.toggle("theme-light", savedTheme === "light");
        this.updateThemeIcon();
    }

    toggleBookStatus(bookId, newStatus) {
        try {
            const bookIndex = this.books.findIndex(book => book.id === parseInt(bookId));
            if (bookIndex !== -1) {
                this.books[bookIndex].status = newStatus;
                localStorage.setItem("books", JSON.stringify(this.books));
                showAlert("success", `Status buku berhasil diubah menjadi ${newStatus === 'ready' ? 'Tersedia' : 'Dipinjam'}`);
            }
        } catch (error) {
            console.error("Error updating book status:", error);
            showAlert("error", "Gagal mengubah status buku");
        }
    }

    render() {
        this.bookForm.render(this.addBook.bind(this));
        this.bookList.render(
            this.books,
            this.deleteBook,
            this.editBook,
            this.toggleBookStatus
        );
    }
}
