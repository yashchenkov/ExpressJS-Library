import BookInterface from '../interfaces/BooksInterface';

export default class BookRepository implements BookInterface{
	id: string
	title: string
	description: string
	authors: string
	favorite: string
	fileCover: string
	fileName: string

	createBook(book): Book{}
	getBook(id): Book{}
	getBooks(): Array{}
	updateBook(id): boolean{}
	deleteBook(id): boolean{}
}