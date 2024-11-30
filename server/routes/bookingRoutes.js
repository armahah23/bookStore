import express from "express";
import bookModule from "./../module/bookModule.js";
import Book from "./../module/bookModule.js";

const router = express.Router();

//create a new book
router.post("/", async (req, res) => {
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
  router.get("/", async (req, res) => {
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
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const selectedbook = await Book.findById(id);
      if (!selectedbook) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).send(selectedbook);
    } catch (error) {
      console.log(error);
      return res.status(500).send("An unexpected error occurred.");
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send("Please provide all the details.");
      }
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
      if (!result) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).send("Book updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("An unexpected error occurred.");
    }
  });
  
  router.delete("/:id", async (req, res) => {
      try {
          const { id } = req.params;
          const result = await Book.findByIdAndDelete(id);
          if (!result) {
              return res.status(404).send("Book not found");
          }
          return res.status(200).send("Book deleted successfully");
      } catch (error) {
          console.log(error);
          return res.status(500).send("An unexpected error occurred.");
      }
  });

 export default router;