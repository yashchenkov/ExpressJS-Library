import express from 'express';
import Book from '../elements/Book.js';
import {stor} from '../middleware/file.js';
import fs from 'fs';

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
router.get('/api/books', (req, res) => {
	console.log(req.url);
	const {books} = store;
	books.forEach(el => {
		fs.writeFile(`public/${el.id}.json`, JSON.stringify(el), (err) => {
			if (err) throw err;
			console.log('file created');
		})
	})
	res.status(201);
	res.send(books);
});

//получить книгу по id
router.get('/api/books/:id', (req, res) => {
	const {books} = store;
	const {id} = req.params;
	const index = books.findIndex(el => el.id === id);
	if(index !== -1) {
		res.status(201);
	    res.json(books[index]);
	} else {
		res.status(404);
		res.json('404 | книга не найдена');
	}
});

//создать книгу
router.post('/api/books', stor.single('book'), (req, res) => {
	const {books} = store;
	const newBook = new Book();

	books.push(newBook);

	res.status(201);
	res.json(newBook);
})

//редактировать книгу по id
router.put('/api/books/:id', (req, res) => {
	const {books} = store;
	const {title, description, authors, favorite, fileCover, fileName} = req.body;
	const {id} = req.params;
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
	}
});

//удалить книгу по id
router.delete('/api/books/:id', (req, res) => {
	const {books} = store;
	const {id} = req.params;
	const index = books.findIndex(el => el.id === id);

	if(index !== -1) {
		books.splice(index, 1);
		res.status(201);
		res.json('ok');
	} else {
		res.status(404);
		res.json('404 | книга не найдена');
	}
});

//скачать книгу по id
router.get('/api/books/:id/download', (req, res) => {
	const {id, url} = req.params;
	
	router.use(`/public/${id}.json`, (err) => {
		if(err) throw err;
		console.log('done');
	})
});

