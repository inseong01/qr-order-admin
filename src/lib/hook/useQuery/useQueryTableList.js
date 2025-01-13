import fetchTableList from "../../supabase/func/fetchTableList";
import { useBoundStore } from "../../store/useBoundStore";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function useQueryTableList() {
  // useSelector
  // const submitStatus = useSelector((state) => state.submitState.status);
  // store
  const submitStatus = useBoundStore((state) => state.submit.status);

  // useQuery
  const tableList = useQuery({
    queryKey: ['tableList', { status: submitStatus }],
    queryFn: () => fetchTableList('select'),
    enabled: (query) => {
      if (query.queryKey[1].status === 'initial') return true;
      if (query.queryKey[1].status === 'fulfilled') return true;
      return false;
    },
  });

  return tableList;
}