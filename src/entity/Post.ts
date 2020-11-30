import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {User} from './User';
import {Comment} from './Comment';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  title: string
  @Column('text')
  content: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @ManyToOne(() => User, user => user.posts)
  author: User;
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]

  constructor(title: string, content: string, author: User) {
    this.title = title
    this.content = content
    this.author = author
  }
}
