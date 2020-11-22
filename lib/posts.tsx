import path from 'path';
import fs, {promises as fsPromise} from 'fs';
import matter from 'gray-matter';

export const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), '/markdown')
  const fileName = await fsPromise.readdir(markdownDir)
  return fileName.map(filename => {
    const fullPath = path.join(markdownDir, filename)
    const {data: {title, date}} = matter(fs.readFileSync(fullPath, 'utf-8'))
    return {title, date, id: filename.replace('.md', '')}
  })
}


