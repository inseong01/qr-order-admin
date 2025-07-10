import { useSetAtom } from 'jotai';

import { confirmModalAtom } from '../store/atom';

type ShowConfirmModalParams = {
  title: string;
  subTitle?: string;
  caution?: string;
  onConfirm: () => void;
};

/** 확인 모달 상태 설정 커스텀훅 */
export const useConfirmModal = () => {
  const setConfirmModal = useSetAtom(confirmModalAtom);

  const showConfirmModal = ({ title, subTitle, caution, onConfirm }: ShowConfirmModalParams) => {
    setConfirmModal({
      isOpen: true,
      title,
      subTitle,
      caution,
      onConfirm,
    });
  };

  return { showConfirmModal };
};
