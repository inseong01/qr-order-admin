import getTabCategory from "../../supabase/func/getTabCategory";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useQueryCategoryList() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  // useQuery
  const categoryList = useQuery({
    queryKey: ['categoryList', { tab }],
    queryFn: () => getTabCategory(tab),
    refetchOnWindowFocus: false,
  });

  return categoryList
}