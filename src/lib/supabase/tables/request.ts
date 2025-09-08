import supabase from '..';

/**
 * 요청 정보를 수정하는 함수
 * @param id - 수정할 요청 id
 * @returns
 */
export const updateRequest = async (id: string) => {
  const { error, data } = await supabase
    .from('request')
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  // 조건에 맞는 행이 없거나 RLS 정책에 의해 접근이 거부된 경우
  if (!data.length) {
    console.error('Update failed: No rows matched the condition.');
    throw new Error('Unable to update the request.');
  }

  return;
};
