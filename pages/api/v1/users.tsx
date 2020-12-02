import {NextApiHandler} from 'next';

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  console.log(username, 'username')
  console.log(password, 'password')
  console.log(passwordConfirmation, 'passwordConfirmation')
  const errors = {username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]}
  res.setHeader('Content-Type', 'application/json')
  if (password !== passwordConfirmation) {
    res.statusCode = 422
    errors.passwordConfirmation.push('密码不匹配')
    res.write(JSON.stringify(errors))
  }
  res.end()
}

export default Users
