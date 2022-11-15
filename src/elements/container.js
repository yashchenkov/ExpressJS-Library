import { Container } from "inversify";

import BookRepository from './BookRepository.ts';

export default const container = new Container();
container.bind(BookRepository).toSelf();