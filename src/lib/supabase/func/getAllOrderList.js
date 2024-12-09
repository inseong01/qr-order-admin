import supabase from "../supabaseConfig";

export default async function getAllOrderList(type) {
  if (type !== 'order') throw new Error(`type Error type: ${type}`);
  let response = await supabase.from('qr-order-allOrderList').select('*');
  // if (type !== 'order' || typeof isDone !== 'boolean') throw new Error(`type Error type: ${type}, isDone: ${isDone}`);
  // let response = await supabase.from('qr-order-allOrderList').select('*').eq('isDone', isDone);
  return response.data;
}