import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column('varchar')
  username: string
  @Column('varchar')
  passwordDigest: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updateAt: Date
  @OneToMany(() => Post, post => post.author)
  posts: Post[]
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]
}
