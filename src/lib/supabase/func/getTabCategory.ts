import supabase from '../supabaseConfig';

type TableType = 'menu' | 'order' | 'request' | 'tab' | 'table';

export default async function getTabCategory(type: TableType) {
  let response = await supabase
    .from(`qr-order-category-${type}`)
    .select('*')
    .order('id', { ascending: true });
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }
  return response.data;
}
