import fetchTableList from "../../supabase/func/fetchTableList";

import { useQuery } from "@tanstack/react-query";

export default function useQueryTableList() {
  const tableList = useQuery({
    queryKey: ['tableList'],
    queryFn: () => fetchTableList('select'),
    throwOnError: true
  });

  return tableList;
}