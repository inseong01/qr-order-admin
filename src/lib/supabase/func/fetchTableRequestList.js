import supabase from "../supabaseConfig";

// {
//   "schema": "public",
//   "table": "qr-order-request-list",
//   "commit_timestamp": "2024-12-12T09:10:34.427Z",
//   "eventType": "INSERT",
//   "new": {
//     "created_at": "2024-12-12T09:10:18+00:00",
//     "id": "9fd55caf-1905-4bcc-b111-d978fb9fbe57",
//     "isRead": false,
//     "requestList": "물",
//     "tableId": "20c7dddb-d26e-43a4-8aca-f5f71863dc79",
//     "tableName": "테이블 1"
//   },
//   "old": {},
//   "errors": null
// }

export default async function fetchTableRequestList(method, id) {
  // 에러 발생 시 supabase 자체 에러 콘솔 출력됨
  switch (method) {
    case 'select': {
      const response = await supabase.from('qr-order-request-list').select('*');
      return response.data
    }
    case 'update': {
      const response = await supabase.from('qr-order-request-list').update({ 'isRead': true }).eq('id', id).select();
      return response.data
    }
    default: {
      throw new Error(`"${method} : Method is not defined!"`)
    }
  }
}