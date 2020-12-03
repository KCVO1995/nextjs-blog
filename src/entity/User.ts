import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment'
import getDatabaseConnection from '../../lib/getDatabaseConnection';

@Entity('users')
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
  updatedAt: Date
  @OneToMany(() => Post, post => post.author)
  posts: Post[]
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[]

  errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]}
  password:string = ''
  passwordConfirmation:string = ''

  async validate() {
    if (!this.username.trim()) this.errors.username.push('用户名不能为空')
    if (this.username.length >= 20) this.errors.username.push('用户名太长')
    if (this.username.length < 2) this.errors.username.push('用户名太短')
    const isDuplicateName = await (await getDatabaseConnection()).manager.find(User, {username: this.username})
    if (isDuplicateName.length > 0) this.errors.username.push('用户名已存在')

    if (!this.password) this.errors.passwordConfirmation.push('密码不能为空')
    if (this.password.length < 6) this.errors.password.push('密码最少为6个字符')
    if (!/[a-zA-Z][0-9]/g.test(this.password.trim())) this.errors.password.push('密码格式错误，需要由数组和字母组成')
    if (this.password !== this.passwordConfirmation) this.errors.passwordConfirmation.push('密码不匹配')
    return this.errors
  }

  hasError() {
    const hasError = Object.values(this.errors).find(value => value.length > 0)
    return hasError && hasError.length > 0
  }

  constructor(username: string, passwordDigest: string) {
    this.username = username
    this.passwordDigest = passwordDigest
  }

}
