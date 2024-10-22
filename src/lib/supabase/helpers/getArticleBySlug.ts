import { supabase } from '../client'

export async function getArticleBySlug(slug: string) {
  const { data } = await supabase
    .from('articles')
    .select('id, title, slug, image, created_at, excerpt, content')
    .eq('slug', slug)
    .single()

  return data
}

export type Article = Awaited<ReturnType<typeof getArticleBySlug>>
