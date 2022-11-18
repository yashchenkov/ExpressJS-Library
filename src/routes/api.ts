import express from 'express';
import Book from '../elements/Book.js';
import {stor} from '../middleware/file.js';
import fs from 'fs';
import {modell} from '../models/BookModelDB.js';
import container from '../elements/container.js';

export const router = express.Router();


const store = {
	books: [
	  new Book(),
	  new Book()
	]
}



router.post('/api/user/login', (req, res) => {
	res.status(201)
    res.json({
    	id: 1,
    	mail: "test@mail.ru"
    })
});

//получить все книги
router.get('/api/books', async (req, res) => {
	try {
		const repo: BookRepository = container.get(BookRepository);
		console.log(repo);
		const books = await modell.find().select('-__v');
		res.status(201).json(books)
	} catch(e) {
		res.status(500).json(e);
	}
});

//получить книгу по id
router.get('/api/books/:id', async (req, res) => {
	const {id} = req.params;
	try {
		const repo: BookRepository = container.get(BookRepository);
		console.log(repo);
		const books = await modell.findById(id).select('-__v');
		res.status(201).json(books);
	} catch(e) {
		res.status(500).json(e);
	}
	/*const {books} = store;
	const index = books.findIndex(el => el.id === id);
	if(index !== -1) {
		res.status(201);
	    res.json(books[index]);
	    fetch(`http://localhost:81/counter/${id}/incr`,{method: 'POST'})
	      .then((response) => {
	      	response.json()
	      	console.log('im here')
	      })
	      .then((data) => console.log('ok'))

	} else {
		res.status(404);
		res.json('404 | книга не найдена');
	}*/
});

//создать книгу
router.post('/api/books', async (req, res) => {
	const {id, title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
	const newBook = new modell({id, title, description, authors, favorite, fileCover, fileName, fileBook});
	const repo: BookRepository = container.get(BookRepository);
	console.log(repo);

	try {
		await newBook.save();
		res.status(201).json(newBook);
	} catch(e) {
		res.status(500).json(e);
	}
	/*const {books} = store;

	fs.writeFile(`public/${newBook.id}.json`, JSON.stringify(newBook), (err) => {
		if (err) throw err;
		console.log('file created');
	})

	books.push(newBook);

	res.status(201);
	res.json(newBook);*/
})

//редактировать книгу по id
router.put('/api/books/:id', async (req, res) => {
    const {id} = req.params;
	const {title, description, authors, favorite, fileCover, fileName} = req.body;
	const repo: BookRepository = container.get(BookRepository);
	console.log(repo);

	try {
		await modell.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName});
		res.redirect(`/api/books/${id}`);
	} catch(e) {
		res.status(500).json(e);
	}
	/*const {books} = store;
	const index = books.findIndex(el => el.id === id);

	if(index !== -1) { 
		books[index] = {
			...books[index],
			title,
			description,
			authors,
			favorite,
			fileCover,
			fileName
		}
		res.status(201);
		res.json(books[index]);
	} else {
		res.status(404);
		res.json('404 | книга не найдена');
	}*/
});

//удалить книгу по id
router.delete('/api/books/:id', async (req, res) => {
	const {id} = req.params;
	const repo: BookRepository = container.get(BookRepository);
	console.log(repo);
	try {
		await modell.deleteOne({_id: id});
		res.json(true);
	} catch(e) {
		res.status(500).json(e);
	}
	/*const {books} = store;
	const index = books.findIndex(el => el.id === id);

	if(index !== -1) {
		books.splice(index, 1);
		res.status(201);
		res.json('ok');
	} else {
		res.status(404);
		res.json('404 | книга не найдена');
	}*/
});

//скачать книгу по id
router.get('/api/books/:id/download', (req, res) => {
	try {

	} catch(e) {
		res.status(500).json(e);
	}
	const {id, url} = req.params;
	const {books} = store;
	let name;
	books.forEach(el => {
		if(el.id === id){
			name = el.fileBook;
		}
	});
	
	console.log(name);
	res.download(`public/${name}`, 'book', () => {
		console.log('done');
	})
});

