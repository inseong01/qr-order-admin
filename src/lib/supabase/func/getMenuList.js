import supabase from "../supabaseConfig.js";

export default async function getMenuList({ title }) {
  let response;
  if (title === '전체메뉴' || title === '') {
    response = await supabase.from('qr-order-menu').select('*');
    if (response.error) {
      console.error(response.error.message);
      throw new Error(response.error.message);
    }
    return response.data;
  } else {
    response = await supabase.from('qr-order-menu').select('*').eq('sort', title);
    if (response.error) {
      console.error(response.error.message);
      throw new Error(response.error.message);
    }
  }
  return response.data;
}