import path from 'path';
import fs, {promises as fsPromise} from 'fs';
import matter from 'gray-matter';

const markdownDir = path.join(process.cwd(), '/markdown')

export const getPosts = async () => {
  const fileName = await fsPromise.readdir(markdownDir)
  return fileName.map(filename => {
    const fullPath = path.join(markdownDir, filename)
    const {data: {title, date}} = matter(fs.readFileSync(fullPath, 'utf-8'))
    return {title, date, id: filename.replace('.md', '')}
  })
}

export const getPost = async (id: string) => {
  const fullPath = path.join(markdownDir, id + '.md')
  const { data: {title, date}, content } = matter(fs.readFileSync(fullPath, 'utf-8'))
  return {title, date, content}
}

export const getPostIds = async () => {
  const fileName = await fsPromise.readdir(markdownDir)
  return fileName.map(item => item.replace('.md', ''))
}
