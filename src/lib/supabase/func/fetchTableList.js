import supabase from "../supabaseConfig";

export default async function fetchTableList(method, dataArr) {
  switch (method) {
    case 'select': {
      let response = await supabase.from('qr-order-table-list').select('*');
      if (response.error) {
        console.error(response.error.message);
        throw new Error(response.error.message)
      }
      return response.data;
    }
    case 'create':
    case 'update': {
      // data: arrary type
      let response = await supabase.from('qr-order-table-list').upsert(dataArr, { ignoreDuplicates: false }).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    }
    case 'delete': {
      let response = await supabase.from('qr-order-table-list').delete().in('id', dataArr).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    }
    default: {
      throw new Error(`"${method}": Method is not defined!`);
    }
  }
}