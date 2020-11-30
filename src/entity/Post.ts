import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ManyToOne} from 'typeorm/browser';
import {User} from './User';
import {Comment} from './Comment';

@Entity()
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
  updateAt: Date
  @ManyToOne(() => User, user => user.posts)
  author: User;
  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]
}
