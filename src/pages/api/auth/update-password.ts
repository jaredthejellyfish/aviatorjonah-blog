// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from 'astro'

import { supabase } from '@/lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()

  const data = {
    newPassword: formData.get('new-password') as string,
    tokenHash: formData.get('token-hash') as string,
  }

  console.log(data)

  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
    nonce: data.tokenHash,
  })

  console.error(error)
  return redirect('/auth/login')
}
