import supabase from '../supabaseConfig.js';

export default async function getOrderList() {
  let response;
  response = await supabase
    .from('qr-order-allOrderList')
    .select('*')
    .order('created_at', { ascending: true });
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }
  return response.data;
}
