import { CardObj } from './generate-card';

type ElapsedState = 'good' | 'bad' | 'error';
type TimeUnit = '초' | '분' | '시간' | '일';

interface ElapsedResult {
  state: ElapsedState;
  type: TimeUnit;
  elapsed: number;
}

/**
 * 경과 시간 계산
 * @param header 카드 헤더 데이터
 */
export function getElapsed(header: CardObj['header']): ElapsedResult {
  if (!header.startAt) {
    return { state: 'error', type: '초', elapsed: -1 };
  }

  const now = Date.now();
  const startAt = new Date(header.startAt).getTime();
  const endAt = header.updatedAt ? new Date(header.updatedAt).getTime() : now;

  const elapsedMs = endAt - startAt;
  const seconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return { state: 'good', type: '초', elapsed: seconds };
  }
  if (minutes < 60) {
    return { state: minutes > 15 ? 'bad' : 'good', type: '분', elapsed: minutes };
  }
  if (hours < 24) {
    return { state: 'bad', type: '시간', elapsed: hours };
  }
  return { state: 'bad', type: '일', elapsed: days };
}
