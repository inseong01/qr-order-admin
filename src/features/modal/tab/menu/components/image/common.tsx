import { ImageLoadedStateType } from '../../store/atom';

export function ImageStatus({ state }: { state: ImageLoadedStateType }) {
  if (state === 'pending') return <p>이미지 불러오는 중...</p>;
  if (state === 'rejected') return <p>이미지를 불러오지 못했습니다.</p>;
  return null;
}

export function AttachmentStatus({ attached }: { attached: boolean }) {
  return <span>{attached ? '첨부되었습니다.' : '사진을 첨부해주세요'}</span>;
}
