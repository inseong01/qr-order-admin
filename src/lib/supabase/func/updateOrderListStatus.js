import supabase from "../supabaseConfig";

export default async function updateOrderListStatus(list, selectedItemId) {
  let response;
  let status = '';
  console.log(selectedItemId, list.id)
  if (selectedItemId !== list.id) {
    status = 'complete';
  } else {
    status = 'delete';
  }

  switch (status) {
    case 'delete': {
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', list.d)
      return response;
    }
    case 'complete': {
      response = await supabase.from('qr-order-allOrderList').update({ isDone: true, updated_at: new Date() }).eq('id', list.i).select();
      return response;
    }
    default: {
      throw new Error(`Status: ${status} is wrong...`)
    }
  }
}