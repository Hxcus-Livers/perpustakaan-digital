export class BookForm {
    constructor() {
        this.formContainer = document.getElementById("book-form");
        this.quotes = [
            "Buku adalah jendela dunia yang tak pernah tertutup.",
            "Membaca adalah petualangan tanpa batas.",
            "Dalam setiap buku tersimpan sejuta pengetahuan.",
            "Perpustakaan adalah surga bagi mereka yang haus ilmu.",
            "Buku adalah teman setia yang tak pernah mengkhianati.",
            "Membaca membuka pintu menuju ribuan kehidupan.",
            "Ilmu adalah cahaya dalam kegelapan.",
            "Setiap halaman buku adalah sebuah perjalanan baru.",
            "Buku adalah warisan terbaik untuk generasi mendatang.",
            "Dalam membaca, kita tidak pernah sendiri."
        ];
        this.currentQuoteIndex = 0;
        this.quoteInterval = null;
        this.categories = [
            "Novel",
            "Karya Ilmiah",
            "Biografi",
            "Ensiklopedia",
            "Kamus",
            "Majalah",
            "Komik"
        ];
    }

    startQuoteRotation() {
        this.quoteInterval = setInterval(() => {
            this.rotateQuote();
        }, 5000);
    }

    stopQuoteRotation() {
        if (this.quoteInterval) {
            clearInterval(this.quoteInterval);
        }
    }

    rotateQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        const quoteElement = document.getElementById("quote-text");
        if (quoteElement) {
            quoteElement.style.opacity = "0";
            setTimeout(() => {
                quoteElement.textContent = this.quotes[this.currentQuoteIndex];
                quoteElement.style.opacity = "1";
            }, 500);
        }
    }

    render(onSubmit) {
        this.formContainer.innerHTML = `
            <div class="card shadow-neumorphic">
                <div class="card-body">
                    <div class="quote-card mb-4">
                        <p id="quote-text" class="quote-text">
                            ${this.quotes[this.currentQuoteIndex]}
                        </p>
                    </div>
                    <form>
                        <div class="mb-3">
                            <label for="title" class="form-label">Judul Buku</label>
                            <input type="text" class="form-control rounded-pill" id="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">Penulis</label>
                            <input type="text" class="form-control rounded-pill" id="author" required>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="year" class="form-label">Tahun Terbit</label>
                                <input type="number" class="form-control rounded-pill" id="year" required>
                            </div>
                            <div class="col-md-6">
                                <label for="category" class="form-label">Kategori</label>
                                <select class="form-select rounded-pill" id="category" required>
                                    <option value="">Pilih Kategori</option>
                                    ${this.categories.map(cat => `
                                        <option value="${cat}">${cat}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="synopsis" class="form-label">Sinopsis</label>
                            <textarea class="form-control" id="synopsis" rows="3" 
                                placeholder="Masukkan sinopsis buku..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-neumorphic">
                            Simpan Buku
                        </button>
                    </form>
                </div>
            </div>
        `;

        this.startQuoteRotation();

        this.formContainer.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const year = document.getElementById("year").value;
            const category = document.getElementById("category").value;
            const synopsis = document.getElementById("synopsis").value;
            
            onSubmit({ title, author, year, category, synopsis });
            this.resetForm();
        });
    }

    fillForm(book) {
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("year").value = book.year;
        document.getElementById("category").value = book.category || '';
        document.getElementById("synopsis").value = book.synopsis || '';
    }

    resetForm() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
        document.getElementById("category").value = "";
        document.getElementById("synopsis").value = "";
    }
}