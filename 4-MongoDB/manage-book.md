1. Tìm toàn bộ quyển sách trong document book

```
Query: db.books.find({})
```

```
Result:
 _id: ObjectId("63f0e47087476c970e8639e4"),
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  publication_date: '1960-07-11',
  pages: 281,
  genres: [
    'Novel',
    'Fiction',
    'Literary'
  ],
  publisher: {
    name: 'J. B. Lippincott & Co.',
    location: 'Philadelphia, PA'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639e5"),
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  publication_date: '1813-01-28',
  pages: 279,
  genres: [
    'Novel',
    'Fiction',
    'Romance'
  ],
  publisher: {
    name: 'Thomas Egerton',
    location: 'London, UK'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639e6"),
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  publication_date: '1951-07-16',
  pages: 214,
  genres: [
    'Novel',
    'Fiction',
    'Bildungsroman'
  ],
  publisher: {
    name: 'Little, Brown and Company',
    location: 'Boston, MA'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639e7"),
  title: "The Hitchhiker's Guide to the Galaxy",
  author: 'Douglas Adams',
  publication_date: '1979-10-12',
  pages: 214,
  genres: [
    'Science fiction',
    'Comedy',
    'Adventure'
  ],
  publisher: {
    name: 'Pan Books',
    location: 'London, UK'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639e8"),
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel García Márquez',
  publication_date: '1967-06-01',
  pages: 417,
  genres: [
    'Novel',
    'Magic realism'
  ],
  publisher: {
    name: 'Editorial Sudamericana',
    location: 'Buenos Aires, Argentina'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639e9"),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  publication_date: '1954-07-29',
  pages: 1178,
  genres: [
    'Fantasy',
    'Adventure'
  ],
  publisher: {
    name: 'George Allen & Unwin',
    location: 'London, UK'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639ea"),
  title: 'The Diary of a Young Girl',
  author: 'Anne Frank',
  publication_date: '1947-06-25',
  pages: 267,
  genres: [
    'Autobiography',
    'Diary'
  ],
  publisher: {
    name: 'Contact Publishing',
    location: 'Amsterdam, Netherlands'
  }
}
```

2. Tìm 1 quyển sách theo \_id

```
Query: db.books.find({ "_id": ObjectId("63f0e47087476c970e8639e8")})
```

```
Result:
{
  _id: ObjectId("63f0e47087476c970e8639e8"),
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel García Márquez',
  publication_date: '1967-06-01',
  pages: 417,
  genres: [
    'Novel',
    'Magic realism'
  ],
  publisher: {
    name: 'Editorial Sudamericana',
    location: 'Buenos Aires, Argentina'
  }
}
```

3. Thêm 1 quyển sách mới (insert toàn bộ thông tin)

```
Query: db.books.insertOne({title: "Broken Things", author: "Lauren Oliver", publication_date: "2018-10-2", pages: 416, genres: ["Literature", "Fiction"], publisher: {name: "HarperCollins", location: "New York City, U.S"}})
```

```
Result:
{
  acknowledged: true,
  insertedId: ObjectId("63f39b953184283f0eed9a62")
}

{
  _id: ObjectId("63f39b953184283f0eed9a62"),
  title: 'Broken Things',
  author: 'Lauren Oliver',
  publication_date: '2018-10-2',
  pages: 416,
  genres: [
    'Literature',
    'Fiction'
  ],
  publisher: {
    name: 'HarperCollins',
    location: 'New York City, U.S'
  }
}
```

4. Tìm 1 quyển sách có lớn hơn 400 trang và đúng 2 thể loại

```
Query: db.books.find({ pages: {$gt: 400}, genres: {$size: 2}})
```

```
Result:
{
  _id: ObjectId("63f0e47087476c970e8639e8"),
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel García Márquez',
  publication_date: '1967-06-01',
  pages: 417,
  genres: [
    'Novel',
    'Magic realism'
  ],
  publisher: {
    name: 'Editorial Sudamericana',
    location: 'Buenos Aires, Argentina'
  }
}
{
  _id: ObjectId("63f0e47087476c970e8639e9"),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  publication_date: '1954-07-29',
  pages: 1178,
  genres: [
    'Fantasy',
    'Adventure'
  ],
  publisher: {
    name: 'George Allen & Unwin',
    location: 'London, UK'
  }
}
{
  _id: ObjectId("63f39b953184283f0eed9a62"),
  title: 'Broken Things',
  author: 'Lauren Oliver',
  publication_date: '2018-10-2',
  pages: 416,
  genres: [
    'Literature',
    'Fiction'
  ],
  publisher: {
    name: 'HarperCollins',
    location: 'New York City, U.S'
  }
}
```

5. Update thông tin của quyển sách có title là "One Hundred Years Of Solitude"

- publisher_date
- genres
- Publisher

```
Query: db.books.updateOne({title: "One Hundred Years of Solitude"}, {$set: {publication_date: "1968-7-2", genres: ["Magic realism"], "publisher.name": "Gia Hao", "publisher.location": "TpHCM, VN"}})
```

```
Result:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

Before:
{
  _id: ObjectId("63f0e47087476c970e8639e8"),
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel García Márquez',
  publication_date: '1967-06-01',
  pages: 417,
  genres: [
    'Novel',
    'Magic realism'
    ],
  publisher: {
    name: 'Editorial Sudamericana',
    location: 'Buenos Aires, Argentina'
  }
  }

After:
  {
  _id: ObjectId("63f0e47087476c970e8639e8"),
  title: 'One Hundred Years of Solitude',
  author: 'Gabriel García Márquez',
  publication_date: '1968-7-2',
  pages: 417,
  genres: [
    'Magic realism'
  ],
  publisher: {
    name: 'Gia Hao',
    location: 'TpHCM, VN'
  }
}
```

6. Delete những quyển sách xuất bản trước năm 1967

```
Query: db.books.deleteMany({"publication_date": {$lt: "1967-01-01"}})
```

```
Result:
{
  acknowledged: true,
  deletedCount: 5
}
```
