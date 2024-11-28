import supabase from "../supabaseConfig";

export default async function getAllOrderList(type, { key }) {
  if (type !== 'order') return [];
  const isDone = key === 1 ? false : true; // 1 = 접수, 2 = 완료
  let response = await supabase.from('qr-order-allOrderList').select('*').eq('isDone', isDone);
  return response.data;
}