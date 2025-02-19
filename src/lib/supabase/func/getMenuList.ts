import supabase from '../supabaseConfig.js';

export default async function getMenuList() {
  let response = await supabase.from('qr-order-menu').select('*').order('price', { ascending: false });

  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}
