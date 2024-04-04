import { Service } from 'typedi';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { Book, Borrow, User } from '../models';

@Service()
export default class UserService {
  private readonly userRepository: Repository<User>;
  private readonly borrowRepository: Repository<Borrow>;
  private readonly bookRepository: Repository<Book>;

  constructor() {
    this.userRepository = Container.get(DataSource).getRepository(User);
    this.bookRepository = Container.get(DataSource).getRepository(Book);
    this.borrowRepository = Container.get(DataSource).getRepository(Borrow);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'name'],
    });
  }

  public async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name'],
      relations: ['borrows'],
    });
    const userBooks = user.books;
    Reflect.deleteProperty(user, 'borrows');
    return {
      ...user,
      books: userBooks,
    };
  }

  public async create(user: any): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async borrowBook(userId: number, bookId: number): Promise<boolean> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (book.isBorrowed) {
      throw new Error('Book already borrowed');
    }
    await this.bookRepository.save({
      id: bookId,
      isBorrowed: true,
    });
    await this.borrowRepository.save({
      bookId,
      userId,
    });
    return true;
  }

  public async returnBook(userId: number, bookId: number, score: number): Promise<boolean> {
    const borrow = await this.borrowRepository.findOne({ where: { bookId, userId } });
    await this.borrowRepository.save({
      id: borrow.id,
      isReturned: true,
      score,
    });
    await this.bookRepository.save({
      id: bookId,
      isBorrowed: false,
    });
    return true;
  }
}
