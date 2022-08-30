import Book from './elements/Book.js';
import express from 'express';


const store = {
	books: [
	  new Book(),
	  new Book()
	]
}

const app = express();
app.use(express.json());

//авторизация пользователя
app.post('/api/user/login', (req, res) => {
	res.status(201)
    res.json({
    	id: 1,
    	mail: "test@mail.ru"
    })
});

//получить все книги
app.get('/api/books', (req, res) => {
	const {books} = store;
	res.status(201);
	res.json(books);
});

//получить книгу по id
app.get('/api/books/:id', (req, res) => {
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
app.post('/api/books', (req, res) => {
	const {books} = store;
	const newBook = new Book();

	books.push(newBook);

	res.status(201);
	res.json(newBook);
})

//редактировать книгу по id
app.post('/api/books/:id', (req, res) => {
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
app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000
app.listen(PORT);
