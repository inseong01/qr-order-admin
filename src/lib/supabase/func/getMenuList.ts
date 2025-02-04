import supabase from '../supabaseConfig.js';

export default async function getMenuList({ title, id }: { title: string; id: number }) {
  let response;
  if (title === '전체메뉴' || title === '') {
    response = await supabase.from('qr-order-menu').select('*').order('price', { ascending: false });
    if (response.error) {
      console.error(response.error.message);
      throw new Error(response.error.message);
    }
    return response.data;
  } else {
    response = await supabase.from('qr-order-menu').select('*').eq('sortId', id);
    if (response.error) {
      console.error(response.error.message);
      throw new Error(response.error.message);
    }
  }
  return response.data;
}
