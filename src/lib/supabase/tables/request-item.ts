import supabase from '..';

// request_item table with relations type
export type FirstRequestItem = {
  id: string;
  quantity: number;
  created_at: string;
  request_category: {
    id: string;
    title: string;
  };
  request: {
    id: string;
    is_read: boolean;
    created_at: string;
    table: {
      id: string;
      number: number;
    };
  } | null;
};

/**
 * 첫번째 요청과 관련된 목록을 가져오는 함수
 * @returns 첫번째 요청 목록
 */
export async function getRequestItemList(request_id: string): Promise<FirstRequestItem[]> {
  const { data, error } = await supabase
    .from('request_item')
    .select(
      `
    id,
    quantity,
    created_at,
    request_category(id, title),
    request(
      id,
      is_read,
      created_at,
      table(id, number)
    )
  `
    )
    .eq('request_id', request_id)
    .order('created_at', { ascending: false });

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
