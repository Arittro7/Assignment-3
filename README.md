# Library Management System 📚
### A Library Management System using Express, TypeScript, and MongoDB (via Mongoose).

# 🧺Features
+ **CURD** CURD functionality for ***Book Management***.
+  **Filtering and Sorting**
+  **Borrow System**
+  **Aggregation Summary**
+  **Business Logic**
+  **Error Handling**  

  
# 	:rocket: Getting Start
### :file_folder: Clone repository
```
git clone https://github.com/Arittro7/Assignment-3
cd Assignment-3
```

### :toolbox: Install Dependencies
```
npm install
```

### :package: Environment Variables
Create a .env file in the root of the project 
```
DB_URL = your_mongodb_connection_uri
```

### :arrow_forward: Start the Server
```
npm run dev
```

----

# :books: Book Management - CURD
## :palm_tree: API Endpoints
### :green_book: Create Book 
```
POST /api/books
```
Request Body: 
```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
### :blue_book: Get All Books
```
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

### :notebook: Get Book by Id

```
GET /api/books/:bookId
```
### :orange_book: Update Book

```
PATCH /api/books/:bookId
```
Example: Update Copies
```
{
  "copies": 50
}
```
Response:
```
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```
### :closed_book: Delete Book
```
DELETE /api/books/:bookId
```
Response:
```
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```
----

# :four_leaf_clover: Borrow Book

## Business Logic
- Verify the book has enough available copies.
- Deduct the requested quantity from the book’s copies.
- If copies become 0, update available to false (implement this using a static method or instance method).
- Save the borrow record with all relevant details.

### API Endpoint

```
POST /api/borrow
```

Request:
```
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### :microscope: Borrowed Books Summary (Using Aggregation)

```
GET /api/borrow
```


# :globe_with_meridians: Live Demo
[Live Link](https://assignment-3-eta-ten.vercel.app/)