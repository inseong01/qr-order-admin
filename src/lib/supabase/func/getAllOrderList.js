import supabase from "../supabaseConfig";

export default async function getAllOrderList(type) {
  if (type !== 'order') throw new Error(`type Error type: ${type}`);
  let response = await supabase.from('qr-order-allOrderList').select('*');
  return response.data;
}