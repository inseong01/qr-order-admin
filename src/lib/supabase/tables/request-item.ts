import supabase from '..';

// request_item table with relations type
export type RequestItem = {
  id: string;
  quantity: number;
  request_category: {
    id: string;
    title: string;
  };
  request: {
    id: string;
    is_read: boolean;
    created_at: string | null;
    updated_at: string | null;
    table: {
      id: string;
      number: number;
    };
  } | null;
};

/**
 * 처리되지 않은 좌석 요청 상세 목록을 가져오는 함수
 */
export async function getRequestItemList(): Promise<RequestItem[]> {
  const { data, error } = await supabase
    .from('request_item')
    .select(
      `
    id,
    quantity,
    request_category(id, title),
    request(
      id,
      is_read,
      created_at,
      updated_at,
      table(id, number)
    )
  `
    )
    .eq('request.is_read', false)
    .order('created_at', { referencedTable: 'request', ascending: false });

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
