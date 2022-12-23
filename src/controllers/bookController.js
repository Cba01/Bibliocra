import Book from "../models/book";

const renderBooks = async function(req, res){
    const books = await Book.find();

    res.status(200).send(books)
}

//funcion no terminada
const searchBook = async function(req, res){
    const data = req.body.nombre;
    
    const books = await Book.find({title: data});

    res.status(200).send(books)
}

const addBook = async function(req, res){
    const book = Book(req.body);
  
    const bookSaved = await book.save();
  
    console.log(bookSaved);
    res.redirect("/admin/books");
}

const deleteBook = async function(req, res){
    var {id} = req.params;

    console.log(id)
    
    await Book.remove({_id: id});

    res.redirect("/admin/books")
}

module.exports = {
    renderBooks,
    addBook,
    deleteBook,
    searchBook
}