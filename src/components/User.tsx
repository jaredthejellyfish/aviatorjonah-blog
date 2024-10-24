import type { ServerUser } from "@/lib/supabase"

function User({ user }: { user: ServerUser }) {
    return (
      <img
        src={user?.picture ?? 'no image'}
        alt={user?.given_name ?? 'no name'}
        className="h-10 w-10 rounded-full border-2 border-white/50 object-contain ml-5 hidden sm:block"
      />
    )
  }

export default User