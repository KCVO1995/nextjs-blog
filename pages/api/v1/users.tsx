import {NextApiHandler} from 'next';
import getDatabaseConnection from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5';

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  console.log(username, 'username')
  console.log(password, 'password')
  console.log(passwordConfirmation, 'passwordConfirmation')
  const errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]}
  res.setHeader('Content-Type', 'application/json')
  if (!username.trim()) errors.username.push('用户名不能为空')
  if (!/[A-Za-z0-9]/.test(username.trim())) errors.username.push('用户名格式错误')
  if (username.length >= 20) errors.username.push('用户名太长')
  if (username.length < 2) errors.username.push('用户名太短')
  if (!password) errors.passwordConfirmation.push('密码不能为空')
  if (password.length < 6) errors.password.push('密码最少为6个字符')
  if (/[a-zA-Z][0-9]/g.test(username.trim())) errors.password.push('密码格式错误，需要有数组和字母组成')
  if (password !== passwordConfirmation) errors.passwordConfirmation.push('密码不匹配')

  const hasError = Object.values(errors).find(value => value.length > 0)
  if (hasError) {
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  } else {
    const connection = await getDatabaseConnection()
    const user = new User(username, md5(password))
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify({username, status: 'done'}))
  }
  res.end()
}

export default Users
