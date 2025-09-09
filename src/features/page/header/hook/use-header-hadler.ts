import { useAtomValue, useSetAtom } from 'jotai';
import { headerTabAtom, setHeaderTabAtom } from '../store/atom';

export function useHeaderHandler() {
  const headerTabIdx = useAtomValue(headerTabAtom);
  const setHeaderTabIdx = useSetAtom(setHeaderTabAtom);

  function tabClick(tab: number) {
    if (headerTabIdx === tab) return;
    setHeaderTabIdx(tab);
  }

  return { tabClick };
}
