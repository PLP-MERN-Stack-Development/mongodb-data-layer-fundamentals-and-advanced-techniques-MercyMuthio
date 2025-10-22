// queries.js - MongoDB CRUD and Advanced Queries

// 1. Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year (e.g., 2000)
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find books by a specific author (e.g., George Orwell)
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (e.g., '1984')
db.books.updateOne({ title: "1984" }, { $set: { price: 12.99 } });

// 5. Delete a book by its title (e.g., 'Moby Dick')
db.books.deleteOne({ title: "Moby Dick" });

// --- Advanced Queries ---

// 6. Find books in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sort by price ascending
db.books.find().sort({ price: 1 });

// 9. Sort by price descending
db.books.find().sort({ price: -1 });

// 10. Pagination: Limit 5 books per page (Page 1)
db.books.find().limit(5);

// Page 2 (skip first 5)
db.books.find().skip(5).limit(5);

// --- Aggregation Pipeline ---

// 11. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 12. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// 13. Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id": 1 } }
]);

// --- Indexing ---

// 14. Create index on title
db.books.createIndex({ title: 1 });

// 15. Create compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 16. Analyze index performance
db.books.find({ title: "1984" }).explain("executionStats");
