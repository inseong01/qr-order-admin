import { TabCategoryList } from '../../../types/common';

import { useQueryClient } from '@tanstack/react-query';

export default function useQueryTabMenu() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['tabMenu']) as TabCategoryList[] | undefined;
  return data;
}
