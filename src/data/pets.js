export const pets = {
  beluga: {
    name: "Beluga",
    image: "/images/beluga.png",
    species: "Cat",
    age: "2 years old",
    weight: "3.4 kg",
    allergy: "Chicken",
    vet: "Dr. Reyes",
    microchip: "9850 …4412",
    birthday: "12 Mar 2024",
    notes: "Indoor only. Nervous in the carrier.",
    health: {
      vaccines: [
        { id: 1, name: "Rabies", given: "2025-10-20", nextDue: "2026-10-20" },
        { id: 2, name: "FVRCP", given: "2025-03-05", nextDue: "2026-03-05" },
      ],
    },
    events: [
      { id: 1, type: "vet", title: "Annual checkup", date: "2026-10-22", time: "10:00" },
    ],
  },
  doggo: {
    name: "Doggo",
    image: "/images/doggo.jpg",
    species: "Dog",
    age: "4 years old",
    weight: "12 kg",
    allergy: "Chocolates",
    vet: "Dr. Reyes",
    microchip: "9850 …7731",
    birthday: "3 Jun 2022",
    notes: "Loves long walks.",
    health: {
      vaccines: [
        { id: 1, name: "Rabies", given: "2026-01-15", nextDue: "2027-01-15" },
        { id: 2, name: "DHPP", given: "2025-09-01", nextDue: "2026-09-01" },
      ],
    },
    events: [
      { id: 1, type: "treatment", title: "Flea treatment", date: "2026-10-12", time: null },
      { id: 2, type: "grooming", title: "Grooming", date: "2026-11-05", time: "14:30" },
    ],
  },
};