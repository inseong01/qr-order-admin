import supabase from "../supabaseConfig";

export default async function fetchTableList(method, dataArr) {
  switch (method) {
    case 'select': {
      let response = await supabase.from('qr-order-table-list').select('*');
      return response.data;
    }
    case 'create':
    case 'update': {
      // data: arrary type
      console.log('insert', dataArr)
      let response = await supabase.from('qr-order-table-list').upsert(dataArr, { ignoreDuplicates: false }).select();
      return response.data;
    }
    case 'delete': {
      console.log('delete', dataArr)
      let response = await supabase.from('qr-order-table-list').delete().in('id', dataArr).select();
      return response.data;
    }
    default: {
      throw new Error(`"${method}": Method is not defined!`);
    }
  }
}