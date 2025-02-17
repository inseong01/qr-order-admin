import supabase from '../supabaseConfig.js';

export default async function getTableList() {
  let response;
  response = await supabase.from('qr-order-table-list').select('*').order('tableNum', { ascending: true });
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }
  return response.data;
}
