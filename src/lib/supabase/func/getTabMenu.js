import supabase from "../supabaseConfig";

export default async function getTabMenu() {
  let response = await supabase.from('qr-order-tab').select('*');
  if (response.error) throw new Error(response.error.message);
  return response.data;
}