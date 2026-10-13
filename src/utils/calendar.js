export const ICONS = { vaccine: "💉", vet: "🩺", treatment: "💊", grooming: "✂️" };

export function toLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function daysFromToday(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((toLocalDate(dateString) - today) / (1000 * 60 * 60 * 24));
}

export function relativeLabel(days) {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  return days < 0 ? `${Math.abs(days)} days ago` : `In ${days} days`;
}

export function formatDate(dateString) {
  return toLocalDate(dateString).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function buildItems(pets, petId) {
  const allItems = Object.entries(pets).flatMap(([id, pet]) => {
    const vaccineItems = pet.health.vaccines.map((vaccine) => ({
      key: `vaccine-${id}-${vaccine.id}`,
      petId: id,
      petName: pet.name,
      type: "vaccine",
      title: `${vaccine.name} vaccine due`,
      date: vaccine.nextDue,
      time: null,
    }));

    const eventItems = pet.events.map((event) => ({
      ...event,
      key: `event-${id}-${event.id}`,
      petId: id,
      petName: pet.name,
    }));

    return [...vaccineItems, ...eventItems];
  });

  return allItems
    .filter((item) => !petId || item.petId === petId)
    .sort((a, b) => toLocalDate(a.date) - toLocalDate(b.date));
}