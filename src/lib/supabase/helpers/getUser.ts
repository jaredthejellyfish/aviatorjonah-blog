import { supabase } from '../client'

async function getUser() {
  const { data: session, error } = await supabase.auth.getUser()

  if (error) {
    return { user: null, error }
  }
  const user = session?.user

  const { data, error: userError } = await supabase
    .from('profile')
    .select('*')
    .eq('auth_id', user?.id)
    .maybeSingle()

  return { user: { ...user, ...data }, error: userError }
}

export type ServerUser = Awaited<ReturnType<typeof getUser>>['user']
export { getUser }
