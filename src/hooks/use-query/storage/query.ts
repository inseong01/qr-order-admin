import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { deleteImageByFileName, uploadImage } from '@/lib/supabase/storage/store';
import { showToastAtom } from '@/features/alert/toast/store/atom';

import { MENU_LIST_QUERY_KEY } from '../query-key';
import { FEATURE_MESSAGES } from '@/constants/message/feature';

/**
 * 이미지를 업로드하는 쿼리
 */
export function useMutationUploadImage() {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ file, filename }: { file: File; filename: string }) => uploadImage({ file, filename }),
    onSuccess() {
      // 이미지 업로드 후 메뉴 목록을 다시 불러와서 최신 이미지 URL을 반영
      queryClient.invalidateQueries({ queryKey: MENU_LIST_QUERY_KEY });
    },
    onError(error) {
      console.error(error.message);
      showToast(FEATURE_MESSAGES.image.upload);
    },
  });

  return mutation;
}

/**
 * 이미지를 삭제하는 쿼리
 */
export function useMutationDeleteImage(showAlert: boolean) {
  const queryClient = useQueryClient();
  const showToast = useSetAtom(showToastAtom);

  const mutation = useMutation({
    mutationFn: ({ filenames }: { filenames: string[] }) => deleteImageByFileName({ filenames }),
    onSuccess() {
      if (!showAlert) return;

      queryClient.invalidateQueries({ queryKey: MENU_LIST_QUERY_KEY });
    },
    onError(error) {
      console.error(error.message);

      if (!showAlert) return;

      showToast(FEATURE_MESSAGES.image.processing);
    },
  });

  return mutation;
}
