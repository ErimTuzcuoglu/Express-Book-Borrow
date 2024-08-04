import { User } from '../../models';

export interface IUserService {
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  create(user: any): Promise<User>;
  borrowBook(userId: number, bookId: number): Promise<boolean>;
  returnBook(userId: number, bookId: number, score: number): Promise<boolean>;
}
