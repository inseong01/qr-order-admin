import supabase from '@/lib/supabase';

export async function verifyJWT() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error.message);
    supabase.auth.signOut();
    return null;
  }

  return data.session;
}
