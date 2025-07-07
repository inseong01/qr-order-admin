import supabase from '..';

/**
 * 주문 테이블의 변경사항을 구독하는 함수
 * @param handleInserts - insert 이벤트 발생 시 실행할 함수
 * @param handleUpdates - update 이벤트 발생 시 실행할 함수
 * @param handleDeletes - delete 이벤트 발생 시 실행할 함수
 * @returns
 */
export const subscribeToOrder = (handleInserts: (payload: any) => void, handleUpdates: (payload: any) => void, handleDeletes: (payload: any) => void) => {
  const subscription = supabase
    .channel('custom-order-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'order' }, payload => {
      console.log('Change received!', payload);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'order' }, handleInserts)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'order' }, handleUpdates)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'order' }, handleDeletes)
    .subscribe();

  return subscription;
};

/**
 * 요청 테이블의 변경사항을 구독하는 함수
 * @param handleInserts - insert 이벤트 발생 시 실행할 함수
 * @param handleUpdates - update 이벤트 발생 시 실행할 함수
 * @param handleDeletes - delete 이벤트 발생 시 실행할 함수
 * @returns
 */
export const subscribeToRequest = (handleInserts: (payload: any) => void, handleUpdates: (payload: any) => void, handleDeletes: (payload: any) => void) => {
  const subscription = supabase
    .channel('custom-request-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'request' }, payload => {
      console.log('Change received!', payload);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'request' }, handleInserts)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'request' }, handleUpdates)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'request' }, handleDeletes)
    .subscribe();

  return subscription;
};

/**
 * 테이블 테이블의 변경사항을 구독하는 함수
 * @param handleInserts - insert 이벤트 발생 시 실행할 함수
 * @param handleUpdates - update 이벤트 발생 시 실행할 함수
 * @param handleDeletes - delete 이벤트 발생 시 실행할 함수
 * @returns
 */
export const subscribeToTable = (handleInserts: (payload: any) => void, handleUpdates: (payload: any) => void, handleDeletes: (payload: any) => void) => {
  const subscription = supabase
    .channel('custom-table-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'table' }, payload => {
      console.log('Change received!', payload);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'table' }, handleInserts)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'table' }, handleUpdates)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'table' }, handleDeletes)
    .subscribe();

  return subscription;
};

/**
 * 메뉴 테이블의 변경사항을 구독하는 함수
 * @param handleInserts - insert 이벤트 발생 시 실행할 함수
 * @param handleUpdates - update 이벤트 발생 시 실행할 함수
 * @param handleDeletes - delete 이벤트 발생 시 실행할 함수
 * @returns
 */
export const subscribeToMenu = (handleInserts: (payload: any) => void, handleUpdates: (payload: any) => void, handleDeletes: (payload: any) => void) => {
  const subscription = supabase
    .channel('custom-menu-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'menu' }, payload => {
      console.log('Change received!', payload);
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'menu' }, handleInserts)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'menu' }, handleUpdates)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'menu' }, handleDeletes)
    .subscribe();

  return subscription;
};
