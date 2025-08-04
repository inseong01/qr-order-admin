function generateNumberId() {
  return Math.random().toFixed(10).substring(2, 12);
}

export { generateNumberId };
