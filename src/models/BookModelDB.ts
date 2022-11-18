import {Schema, model} from 'mongoose';

const BookSchema = new Schema({
	id: {
		type: String, 
		required: true
	},
	title: {
		type: String, 
		required: true,
		default: ''
	},
	description: {
		type: String, 
		required: true,
		default: ''
	},
	authors: {
		type: String, 
		required: true,
		default: ''
	},
	favorite: {
		type: String, 
		required: true,
		default: ''
	},
	fileCover: {
		type: String, 
		required: true,
		default: ''
	},
	fileName: {
		type: String, 
		required: true,
		default: ''
	},
	fileBook: {
		type: String, 
		required: true,
		default: ''
	}
});

export const modell = model('Book', BookSchema);