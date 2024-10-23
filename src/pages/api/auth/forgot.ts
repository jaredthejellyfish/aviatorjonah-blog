// With `output: 'hybrid'` configured:
// export const prerender = false;
import type { APIRoute } from 'astro'

import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `http://localhost:3000/auth/login/new-password`,
  })

  console.error(error)
  return redirect('/auth/login/check-your-email')
}
