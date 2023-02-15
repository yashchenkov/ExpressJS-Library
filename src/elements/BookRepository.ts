import BookInterface from '../interfaces/BooksInterface';

export default class BookRepository implements BookInterface{
	id: string
	title: string
	description: string
	authors: string
	favorite: string
	fileCover: string
	fileName: string

	createBook(book: any): Book{}
	getBook(id: any): Book{}
	getBooks(): Array{}
	updateBook(id: any): boolean{}
	deleteBook(id: any): boolean{}
}