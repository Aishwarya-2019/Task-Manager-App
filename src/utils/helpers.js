export function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function formatDateForDisplay(dateStr) {
  if (!dateStr) return 'No due date';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}
