import { Book } from '../../models';

export interface IBookService {
  findAll(): Promise<Book[]>;
  findOneById(id: number): Promise<Book>;
  create(book: any): Promise<Book>;
}
