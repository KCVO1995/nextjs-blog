import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  title: string
  @Column('text')
  content: string
  constructor(title: string, content: string) {
    this.title = title
    this.content = content
  }
}
