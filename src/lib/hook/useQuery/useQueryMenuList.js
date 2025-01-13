import getMenuList from "../../supabase/func/getMenuList";
import { useBoundStore } from "../../store/useBoundStore";

import { useQuery } from "@tanstack/react-query";

export default function useQueryMenuList() {
  // store
  const selectedCategory = useBoundStore((state) => state.category);
  // useQuery
  const menuList = useQuery({
    queryKey: ['menuList', selectedCategory.id],
    queryFn: () => getMenuList(selectedCategory),
  });

  return menuList
}