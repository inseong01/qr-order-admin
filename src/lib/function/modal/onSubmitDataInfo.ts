import { Method } from '../../store/useFetchSlice';

export function onSubmitDataInfo({ method }: { method: Method }) {
  if (method === 'update') {
    alert('결제를 시작합니다.');
    // 고객 결제 요청
    // 고객 반응
    // 결제 완료
    // 해당 테이블 초기화
  } else if (method === 'select') {
    alert('QR코드 확인');
  }
}
