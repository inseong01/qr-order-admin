import fetchTableRequestList from "../../supabase/func/fetchTableRequestList";

import { useQuery } from "@tanstack/react-query";

export default function useQueryRequestList() {
  const requestList = useQuery({
    queryKey: ['requestList'],
    queryFn: () => fetchTableRequestList('select'),
  });

  return requestList
}