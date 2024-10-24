// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from 'astro'

import { supabase } from '@/lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()

  const data = {
    email: formData.get('email') as string,
    url: new URL(formData.get('url') as string).host,
  }

  console.log(`${data.url}/auth/login/new-password`)

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    // if url contains localhost use http, if prod use https
    redirectTo: `${data.url.includes('localhost') ? 'http' : 'https'}://${data.url}/auth/new-password`,
  })

  console.error(error)
  return redirect('/auth/check-your-email')
}
