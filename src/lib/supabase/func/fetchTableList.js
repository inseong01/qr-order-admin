import supabase from "../supabaseConfig";

export default async function fetchTableList(method, dataArr) {
  let response;

  switch (method) {
    case 'select': {
      response = await supabase.from('qr-order-table-list').select('*').order('tableNum', { ascending: true });
      break;
    }
    case 'create': {
      const idx = dataArr.length - 1
      response = await supabase.from('qr-order-table-list').insert(dataArr[idx]).select();
      break;
    }
    case 'update': {
      response = await supabase.from('qr-order-table-list').upsert(dataArr, { ignoreDuplicates: false }).select();
      break;
    }
    case 'delete': {
      response = await supabase.from('qr-order-table-list').delete().in('id', dataArr).select();
      break;
    }
    default: {
      console.error(`"${method.toUpperCase()}": Method is not defined`)
      return { status: 1 }
    }
  }

  if (response.error) {
    console.error(response.error.message ?? `${method.toUpperCase()} error`)
  }

  return response
}