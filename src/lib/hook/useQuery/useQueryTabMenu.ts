import getTabCategory from "../../supabase/func/getTabCategory";

import { useQuery } from "@tanstack/react-query";

export default function useQueryTabMenu() {
  const tabMenu = useQuery({
    queryKey: ['tabMenu'],
    queryFn: () => getTabCategory('tab'),
    staleTime: Infinity
  });

  return tabMenu
}