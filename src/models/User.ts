import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Base } from './Base';
import { Borrow } from './Borrow';
import { Book } from './Book';

@Entity()
export class User extends Base {
  @Column()
  public name: string;

  get books(): Object {
    return {
      past: this.borrows.find((borrow) => borrow.isReturned) || [],
      present: this.borrows.find((borrow) => !borrow.isReturned) || [],
    };
  }

  @OneToMany('Borrow', 'user')
  borrows: Relation<Borrow[]>;
}
