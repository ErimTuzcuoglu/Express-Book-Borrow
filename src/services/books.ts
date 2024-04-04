import { Service } from 'typedi';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { Book } from '../models';

@Service()
export default class BookService {
  private readonly bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = Container.get(DataSource).getRepository(Book);
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
