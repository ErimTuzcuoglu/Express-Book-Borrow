import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { Base } from './Base';
import { Borrow } from './Borrow';

@Entity()
export class Book extends Base {
  @Column()
  public name: string;

  @Column({ default: false })
  public isBorrowed: boolean;

  get score(): number {
    let totalScore = 0;
    this.borrows.map((borrow) => (totalScore += borrow.score));
    return totalScore / this.borrows.length;
  }

  @OneToMany('Borrow', 'book')
  borrows: Relation<Borrow[]>;
}
