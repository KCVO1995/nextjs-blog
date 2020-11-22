import {useEffect, useState} from 'react';
import axios from 'axios';

type Post = {
  id: string,
  date: string,
  title: string
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    axios.get('/api/v1/posts').then(res => {
      if (res.data.length === 0) setIsEmpty(true)
      setPosts(res.data)
    }).finally(() => setIsLoading(false))
  }, [])

  return {posts, setPosts, isLoading, setIsLoading, isEmpty, setIsEmpty}

}
