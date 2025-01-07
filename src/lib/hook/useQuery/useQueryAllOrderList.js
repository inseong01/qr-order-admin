import fetchOrderList from "../../supabase/func/fetchOrderList";

import { useQuery } from "@tanstack/react-query";

export default function useQueryAllOrderList() {
  const allOrderList = useQuery({
    queryKey: ['allOrderList'],
    queryFn: () => fetchOrderList('select'),
  });

  return allOrderList
}