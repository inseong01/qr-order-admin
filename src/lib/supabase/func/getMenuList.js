import supabase from "../supabaseConfig.js";

export default async function getMenuList(type, { key, title }) {
  if (type !== 'menu') return [];
  if (title === '전체메뉴' || !title) {
    let response = await supabase.from('qr-order-menu').select('*');
    return response.data;
  } else {
    let response = await supabase.from('qr-order-menu').select('*').eq('sort', title);
    return response.data;
  }
}