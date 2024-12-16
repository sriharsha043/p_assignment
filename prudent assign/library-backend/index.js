const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");
const genreRoutes = require("./routes/genres");
const searchRoutes = require('./routes/search')

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("./genres", genreRoutes);
// app.use("./search", searchRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });