import supabase from "../supabaseConfig";

export default async function getTabCategory(type) {

  let response = await supabase.from(`qr-order-category-${type}`).select('*');
  return response.data;
}