import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Base } from './Base';
import { User } from './User';
import { Book } from './Book';

@Entity()
export class Borrow extends Base {
  @Column()
  userId: number;
  @Column()
  bookId: number;
  @Column({ default: 0 })
  score: number;
  @Column('boolean', { default: false })
  isReturned: boolean;

  @ManyToOne('User', 'borrows')
  user: Relation<User>;
  @ManyToOne('Book', 'borrows')
  book: Relation<Book>;
}
