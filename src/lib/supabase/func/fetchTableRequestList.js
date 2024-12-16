import supabase from "../supabaseConfig";

// "update"
// {
//   "error": null,
//   "data": [
//     {
//       "id": "16df3041-63db-4489-8223-0a7e9a9cb95c",
//       "created_at": "2024-12-13T01:36:39+00:00",
//       "requestList": "물",
//       "tableId": "20c7dddb-d26e-43a4-8aca-f5f71863dc79",
//       "tableName": "테이블 1",
//       "isRead": true
//     }
//   ],
//   "count": null,
//   "status": 200,
//   "statusText": ""
// }

export default async function fetchTableRequestList(method, id) {
  // 에러 발생 시 supabase 자체 에러 콘솔 출력됨
  switch (method) {
    case 'select': {
      const response = await supabase.from('qr-order-request-list').select('*');
      if (response.error) {
        console.error(response.error.message);
        return [];
      }
      return response.data;
    }
    case 'update': {
      const response = await supabase.from('qr-order-request-list').update({ 'isRead': true }).eq('id', id).select();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    }
    default: {
      throw new Error(`"${method} : Method is not defined!"`);
    }
  }
}