export class Book {
    constructor(id, title, author, year, synopsis, category, status = 'ready') {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.synopsis = synopsis;
        this.category = category;
        this.status = status;
    }
}