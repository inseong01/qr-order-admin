
import { useAtomValue } from 'jotai';
import { windowStateAtom } from '@/store/atom/window-atom';

export function useTableTab() {
  const { isMobile, viewportMode } = useAtomValue(windowStateAtom);

  // 모바일 환경에서 가로 모드일 때만 렌더링을 허용
  const enableMount = !isMobile || viewportMode === 'landscape';

  return { enableMount };
}
