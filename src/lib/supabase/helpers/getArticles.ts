import readingTime from 'reading-time'

import { supabase } from '../client'

export async function getArticles() {
  const { data } = await supabase
    .from('articles')
    .select('id, title, slug, image, created_at, excerpt, content')

  const articlesWithReadTime = data?.map((article) => ({
    ...article,
    read_time: readingTime(article.content).minutes.toFixed(0),
    content: undefined,
  }))

  return articlesWithReadTime
}

export type Articles = Awaited<ReturnType<typeof getArticles>>
