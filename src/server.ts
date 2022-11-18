import Book from './elements/Book.js';
import express from 'express';
import {router} from './routes/api.ts';
import mongoose from 'mongoose';




const app = express();
app.use(express.json());


app.set('view engine', 'ejs');
app.use('/', router);
app.use('/public', express.static('/public'));
/*
//авторизация пользователя
app.use('/api/user/login', router);

//получить все книги
app.use('/api/books', router);

//получить книгу по id
app.use('/api/books/:id', router);

//создать книгу
app.use('/api/books', router);

//редактировать книгу по id
app.use('/api/books/:id', router);

//удалить книгу по id
app.use('/api/books/:id', router);
*/

async function start(PORT, UrlDB) {
	try {
		await mongoose.connect(UrlDB);
		app.listen(PORT);
	} catch(e) {
		console.log(e);
	}
}

const PORT = process.env.PORT || 3000
const UrlDB = process.env.UrlDB;
console.log(UrlDB);
start(PORT, UrlDB);
