import getMenuList from "../../supabase/func/getMenuList";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useQueryMenuList() {
  // useSelector
  const selectedCategory = useSelector((state) => state.categoryState);
  // useQuery
  const menuList = useQuery({
    queryKey: ['menuList', selectedCategory.id],
    queryFn: () => getMenuList(selectedCategory),
  });

  return menuList
}