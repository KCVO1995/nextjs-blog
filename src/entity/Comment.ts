import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ManyToOne} from 'typeorm/browser';
import {User} from './User';
import {Post} from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('text')
  content: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updateAt: Date
  @ManyToOne(() => User, user => user.comments)
  user: User;
  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
