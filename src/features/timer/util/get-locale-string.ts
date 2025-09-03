export function getLocaleString() {
  const now = new Date();
  const newTime = now.toLocaleTimeString();
  const newDate = now.toLocaleDateString();

  return { newTime, newDate };
}
