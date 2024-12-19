import supabase from "../supabaseConfig";

export default async function getTabCategory(type) {
  let response = await supabase.from(`qr-order-category-${type}`).select('*').order('id', { ascending: true });
  if (response.error) throw new Error(response.error.message);
  return response.data;
}