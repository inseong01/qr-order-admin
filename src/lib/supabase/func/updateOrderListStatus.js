import supabase from "../supabaseConfig";

export default async function updateOrderListStatus(list, selectedListId) {
  let response;
  let status = '';

  if (selectedListId !== list.id) {
    status = 'complete';
  } else {
    status = 'delete';
  }

  switch (status) {
    case 'delete': {
      response = await supabase.from('qr-order-allOrderList').delete().eq('id', list.id)
      return response;
    }
    case 'complete': {
      response = await supabase.from('qr-order-allOrderList').update({ isDone: true, updated_at: new Date() }).eq('id', list.id).select();
      return response;
    }
    default: {
      throw new Error(`Status: ${status} is wrong...`)
    }
  }
}