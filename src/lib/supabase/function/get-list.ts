import supabase from '../supabase-config';

export async function getMenuList() {
  let response = await supabase.from('qr-order-menu').select('*').order('price', { ascending: false });

  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function getOrderList() {
  let response;
  response = await supabase.from('qr-order-allOrderList').select('*').order('created_at', { ascending: true });
  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function getRequestList() {
  let response = await supabase
    .from('qr-order-request-list')
    .select('*')
    .eq('isRead', false)
    .order('created_at', { ascending: true });

  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function getTableList() {
  let response;
  response = await supabase.from('qr-order-table-list').select('*').order('tableNum', { ascending: true });

  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}

type TableType = 'menu' | 'order' | 'request' | 'tab' | 'table';

export async function getTabCategory(type: TableType) {
  let response = await supabase.from(`qr-order-category-${type}`).select('*').order('id', { ascending: true });

  if (response.error) {
    console.error(response.error.message);
    throw new Error(response.error.message);
  }

  return response.data;
}
