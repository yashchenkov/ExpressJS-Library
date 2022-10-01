import Book from './elements/Book.js';
import express from 'express';
import {router} from './routes/api.js';




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

const PORT = process.env.PORT || 3000
app.listen(PORT);
