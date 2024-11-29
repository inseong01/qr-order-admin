import supabase from "../supabaseConfig";

export default async function getTabMenu() {
  let response = await supabase.from('qr-order-tab').select('*');
  return response.data;
}