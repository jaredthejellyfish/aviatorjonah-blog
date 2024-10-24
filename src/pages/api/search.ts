import type { APIRoute } from 'astro'

import { supabase } from '@/lib/supabase'

export const GET: APIRoute = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get('query')

  if (!query) return new Response(JSON.stringify({ error: 'No query provided' }), { status: 400 })

  const { data, error } = await supabase
    .rpc('search_articles', {
      search_term: query ?? '',
    })
    .select()

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  return new Response(JSON.stringify(data), { status: 200 })
}
