export class BookList {
    constructor() {
        this.bookListContainer = document.getElementById("book-list");
        this.originalBooks = [];
    }

    searchBooks(books, searchTerm) {
        if (!searchTerm) return books;
        
        searchTerm = searchTerm.toLowerCase();
        return books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.year.toString().includes(searchTerm)
        );
    }

    render(books, onDelete, onEdit) {
        this.originalBooks = books;

        this.bookListContainer.innerHTML = `
            ${books.length === 0 ? 
                '<p class="text-center">Belum ada buku yang ditambahkan.</p>' :
                `<div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="d-flex align-items-center gap-4">
                        <h2 class="h4 mb-0">Daftar Buku</h2>
                        <div class="book-stats-card">
                            <div class="stats-icon">
                                <i class="fas fa-book-open"></i>
                            </div>
                            <div class="stats-info">
                                <span class="stats-label">Total Buku</span>
                                <span class="stats-value">${books.length}</span>
                            </div>
                        </div>
                    </div>
                    <div class="search-container">
                        <div class="input-group">
                            <input 
                                type="text" 
                                class="form-control rounded-pill search-input" 
                                id="searchInput" 
                                placeholder="Cari judul, penulis, atau tahun..."
                            >
                            <span class="input-group-text rounded-pill ms-2 search-icon">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row" id="booksList">
                    ${this.renderBooks(books)}
                </div>`
            }
        `;

        if (books.length > 0) {
            const searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("input", (e) => {
                const searchTerm = e.target.value;
                const filteredBooks = this.searchBooks(this.originalBooks, searchTerm);
                const booksListContainer = document.getElementById("booksList");
                
                if (filteredBooks.length === 0) {
                    booksListContainer.innerHTML = this.renderEmptySearchResult();
                } else {
                    booksListContainer.innerHTML = this.renderBooks(filteredBooks);
                    this.addEventListeners(onDelete, onEdit);
                }
            });

            this.addEventListeners(onDelete, onEdit);
        }
    }

    renderBooks(books) {
        return books.map(book => `
            <div class="col-md-6 mb-3">
                <div class="card shadow-neumorphic book-card glassy">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <div class="book-info">
                            <p class="card-text mb-1"><strong>Penulis:</strong> ${book.author}</p>
                            <p class="card-text mb-1"><strong>Tahun:</strong> ${book.year}</p>
                            <p class="card-text mb-1"><strong>Kategori:</strong> 
                                <span class="badge">${book.category || 'Tidak ada kategori'}</span>
                            </p>
                            ${book.synopsis ? `
                                <div class="synopsis-container mt-2">
                                    <p class="card-text mb-1"><strong>Sinopsis:</strong></p>
                                    <p class="synopsis-text">${book.synopsis}</p>
                                </div>
                            ` : ''}
                        </div>
                        <div class="d-flex justify-content-end align-items-center mt-3">
                            <div>
                                <button class="btn btn-warning btn-sm me-2 edit-btn" 
                                    data-id="${book.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" 
                                    data-id="${book.id}">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");
    }

    addEventListeners(onDelete, onEdit) {
        this.bookListContainer.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => onDelete(button.dataset.id));
        });

        this.bookListContainer.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", () => onEdit(button.dataset.id));
        });
    }

    renderEmptySearchResult() {
        return `
            <div class="col-12">
                <div class="card shadow-neumorphic empty-search-card">
                    <div class="card-body text-center">
                        <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                        <h5 class="card-title">Buku Tidak Ditemukan</h5>
                        <p class="card-text text-muted">
                            Maaf, tidak ada buku yang sesuai dengan pencarian Anda.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
};