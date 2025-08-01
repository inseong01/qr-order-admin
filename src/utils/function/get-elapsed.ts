import { CardObj } from './generate-card';

export function getElapsed(header: CardObj['header']) {
  if (!header.startAt) return { type: '초', elapsed: -1 };

  const now = Date.now();
  const isDoneOrder = Boolean(header.updatedAt);
  const startAt = isDoneOrder ? new Date(header.updatedAt).getTime() : new Date(header.startAt).getTime();
  const elapsedMs = now - startAt;

  const seconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return { state: 'good', type: '초', elapsed: seconds };
  } else if (minutes < 60) {
    const state = minutes > 15 ? 'bad' : 'good';
    return { state, type: '분', elapsed: minutes };
  } else if (hours <= 24) {
    return { state: 'bad', type: '시간', elapsed: hours };
  } else {
    return { state: 'bad', type: '일', elapsed: days };
  }
}
