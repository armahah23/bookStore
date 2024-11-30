import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MongoDBURL, PORT } from "./config.js";
import bookModule from "./module/bookModule.js";
import Book from "./module/bookModule.js";

const app = express();
app.use(express.json());
app.use(cors());

//connecting mongodb
mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

//create a new book
app.post("/book", async (req, res) => {
  try {
    if (
      !req.body.title?.trim() ||
      !req.body.author?.trim() ||
      !req.body.publishYear
    ) {
      return res.status(400).send("Please provide all the details.");
    }

    const newBook = {
      title: req.body.title.trim(),
      author: req.body.author.trim(),
      publishYear: req.body.publishYear,
    };

    const book = await bookModule.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).send("An unexpected error occurred.");
  }
});

//get ll the boks
app.get("/getallbooks", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An unexpected error occurred.");
  }
});

//get a book by id
app.get('/book/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const selectedbook = await Book.findById(id);
        if(!selectedbook) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send(selectedbook);
    } catch (error) {
        console.log(error);
        return res.status(500).send("An unexpected error occurred.");
    }
})

app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello World!");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
