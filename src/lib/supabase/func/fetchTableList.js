import supabase from "../supabaseConfig";

export default async function fetchTableList(method) {
  switch (method) {
    case 'select': {
      let response = await supabase.from('qr-order-table-list').select('*');
      return response.data;
    }
    default: {
      throw new Error(`${method}: Method is not defined!`);
    }
  }
}