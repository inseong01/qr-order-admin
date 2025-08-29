import { atom } from 'jotai';

// 분류 추가 폼 입력 값 관리
export const categoryInputAtom = atom('');

// 분류 편집 폼 상태 관리
export const selectedCategoriesAtom = atom<Record<string, any>>({}); // 선택된 분류의 ID, title 저장

// 분류 삭제 폼 상태 관리
export const selectedCategoryIdsAtom = atom<string[]>([]); // 선택된 분류 ID저장

// 분류 상태 초기화
export const resetCategoriesAtom = atom(null, (_, set) => {
  set(categoryInputAtom, '');
  set(selectedCategoriesAtom, {});
  set(selectedCategoryIdsAtom, []);
});

// 카테고리 제출 오류 상태
export const categoryErrorAtom = atom('');

// 카테고리 제출 오류 메시지 설정
export const setCategoryErrorAtom = atom(null, (_, set, message: string) => {
  set(categoryErrorAtom, message);
});
