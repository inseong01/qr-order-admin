import supabase from '../supabaseConfig';

export default async function getRequestList() {
  let response = await supabase
    .from('qr-order-request-list')
    .select('*')
    .eq('isRead', false)
    .order('created_at', { ascending: true });

  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}
