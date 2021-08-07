const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const books = [
  {
    id: "1",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C Martin",
    editionYear: "2008",
  },
  {
    id: "2",
    title: "The Browser Hacker's Handbook",
    author: "Wade Alcorn, Christian Frichot, Michele Orru",
    editionYear: "2014",
  },
  {
    id: "3",
    title: "Learning GraphQL",
    author: "Eve Porcello e Alex Banks",
    editionYear: "2018",
  },
  {
    id: "4",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    editionYear: "2011",
  },
];

function startDb() {
  db.serialize(function () {
    db.run(
      "CREATE TABLE books (id TEXT, title TEXT, author TEXT, editionYear TEXT)"
    );

    const stmt = db.prepare(
      "INSERT INTO books(id, title, author, editionYear) VALUES (?, ?, ?, ?)"
    );
    books.forEach((book) => {
      stmt.run(book.id, book.title, book.author, book.editionYear);
    });
    stmt.finalize();
  });
}

module.exports = {
  startDb,
  db,
};
