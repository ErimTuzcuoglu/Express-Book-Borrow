import { DataSource, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { IBookService } from './contracts/books';
import { Book } from '../models';
import { iocContainer } from '../config/ioc.container';
import { TYPES } from '../types/contract-types';

@injectable()
export default class BookService implements IBookService {
  private readonly bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = iocContainer.get<DataSource>(TYPES.DataSource).getRepository(Book);
  }

  public async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      select: ['id', 'name'],
    });
  }

  public async findOneById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      select: ['id', 'name'],
      relations: ['borrows'],
    });
    const score = book.score;
    Reflect.deleteProperty(book, 'borrows');
    return {
      ...book,
      score,
    };
  }

  public async create(book: any): Promise<Book> {
    return await this.bookRepository.save(book);
  }
}
