import { getAuthSession } from './auth-supabase-api';

export async function verifyAuthJWT() {
  const { data, error } = await getAuthSession();

  if (error) {
    console.error(error.message);
    throw error;
  }

  return data;
}
