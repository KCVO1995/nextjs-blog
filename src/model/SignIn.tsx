import {User} from '../entity/User';
import getDatabaseConnection from '../../lib/getDatabaseConnection';
import md5 from 'md5';

export class SignIn {
  username: string
  password: string
  user: User

  errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]}
  async validate() {
    if (!this.username.trim()) this.errors.username.push('请输入用户名')
    if (!this.password) this.errors.password.push('请输入密码')

    const connection = await getDatabaseConnection()
    this.user = await connection.manager.findOne(User, { username: this.username })
    if (this.user) {
      if (this.user.passwordDigest !== md5(this.password)) {
        this.errors.password.push('密码和用户名不匹配')
      }
    } else {
      this.errors.username.push('用户名不存在')
    }
  }

  hasError() {
    const hasError = Object.values(this.errors).find(value => value.length > 0)
    return hasError && hasError.length > 0
  }
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

}
